import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Modal from "../../components/Modal/Modal";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  TextArea,
  TextInput,
  ResponsiveContext,
  Select,
  Spinner,
  Text,
} from "grommet";
import { FormAdd } from "grommet-icons";
import { largePad, sizePad, formStyle } from "../../styles/utils";
import {
  createSession,
  resetSessionSubmissionStatus,
} from "../../features/session/sessionActions";
import { getUserInstruments } from "../../features/instrument/instrumentActions";
import { getUserGoals } from "../../features/goal/goalActions";
import {
  getUserTags,
  createTag,
  resetTagSubmissionStatus,
} from "../../features/tag/tagActions";

// Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
const getEscapedText = (text) => text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

// Create the regular expression with escaped special characters.
const formatSearchExpression = (text) => new RegExp(getEscapedText(text), "i");

function CreateSessionPage() {
  const { userGoals } = useSelector((state) => state.goal);
  const instrument = useSelector((state) => state.instrument);
  const tag = useSelector((state) => state.tag);
  const session = useSelector((state) => state.session);
  const size = useContext(ResponsiveContext);

  const userTags = tag.userTags.map((tag) => tag.name) || [];
  const [filteredTagOptions, setFilteredTagOptions] = useState(userTags);
  const [filteredGoalOptions, setFilteredGoalOptions] = useState([]);
  const [instrumentOptions, setInstrumentOptions] = useState(
    instrument.userInstruments
  );
  const [tagSearch, setTagSearch] = useState("");
  const [value, setValue] = useState({
    exercise: "",
    tempo: 60,
    goal: "",
    instrument: "",
    durationTime: 0,
    durationFormat: "",
    tags: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    heading: "",
    subtitle: "",
    content: "",
    status: "",
    footer: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  function onSearch(text) {
    setTagSearch(text);
    const exp = formatSearchExpression(text);
    const filteredOptions = userTags.filter((option) => exp.test(option));
    if (!filteredOptions.length) {
      setFilteredTagOptions([
        <Box
          // onClick will only work if the box is clicked, which will not take up the full width of the select option. See handleSelect for fix
          onClick={(e) => handleCreateTagClick(e, text)}
          direction="row"
          gap="small"
          width="100%"
        >
          <FormAdd />
          <Text>Create tag</Text>
        </Box>,
      ]);
    } else {
      setFilteredTagOptions(filteredOptions);
    }
  }

  function handleCreateTagClick(e, tag) {
    e.stopPropagation();
    dispatch(createTag(tag));
  }

  // Fix for undefined values being passed into tags as a result of the create tag button not being able to fill up it's full width.
  function handleSelect(value) {
    value.forEach((val) => {
      if (val === undefined) {
        dispatch(createTag(tagSearch));
        return;
      }
    });
  }

  function handleSubmit(value) {
    const {
      exercise,
      instrument: instrumentValue,
      goal: goalValue,
      tempo,
      durationTime,
      durationFormat,
      tags,
      description,
    } = value;
    // Validate values
    if (!instrumentValue.length) {
      setShowModal(true);
      setModalInfo({
        heading: "Missing field!",
        subtitle: "Field: Instrument",
        content: (
          <Text>
            Please select an instrument that this practice session is associated
            with.
          </Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    }
    if (!goalValue.length) {
      setShowModal(true);
      setModalInfo({
        heading: "Missing field!",
        subtitle: "Field: Goal",
        content: (
          <Text>
            Please select a goal that this practice session is associated with.
          </Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    }
    if (!exercise.length) {
      setShowModal(true);
      setModalInfo({
        heading: "Missing field!",
        subtitle: "Field: Session Name",
        content: <Text>Please enter a value for session name.</Text>,
        status: "critical",
        footer: "",
      });
      return;
    }
    if (tempo <= 0) {
      setShowModal(true);
      setModalInfo({
        heading: "Invalid field!",
        subtitle: "Field: Tempo",
        content: (
          <Text>Please enter a number greater than 0 for the tempo.</Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    }
    if (durationTime <= 0) {
      setShowModal(true);
      setModalInfo({
        heading: "Invalid field!",
        subtitle: "Field: Duration",
        content: (
          <Text>Please enter a number greater than 0 for the duration.</Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    }
    if (!durationFormat.length) {
      setShowModal(true);
      setModalInfo({
        heading: "Missing field!",
        subtitle: "Field: Duration Format",
        content: <Text>Please enter a value for duration format.</Text>,
        status: "critical",
        footer: "",
      });
      return;
    }

    // Format durations
    const duration = `${durationTime} ${durationFormat}`;

    // Get Instrument ID
    let instrumentId = null;
    const userInstrument = instrument.userInstruments.filter(
      (inst) => inst.name === instrumentValue
    )[0];

    // Get Goal ID
    let goalId = null;
    const userGoal = userGoals.filter((goal) => goal.name === goalValue)[0];
    if (userInstrument && userGoal) {
      instrumentId = userInstrument.id;
      goalId = userGoal.id;
      const payload = {
        instrumentId,
        goalId,
        exercise,
        tempo,
        duration,
        tags,
        description,
      };

      dispatch(createSession(payload));
    } else if (!userInstrument) {
      setShowModal(true);
      setModalInfo({
        heading: "Invalid Instrument",
        subtitle: "Field: Instrument",
        content: (
          <Text>
            The instrument you selected does not have an id. Please make sure it
            exists in your instrument list.
          </Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    } else if (!userGoal) {
      setShowModal(true);
      setModalInfo({
        heading: "Invalid Goal",
        subtitle: "Field: Goal",
        content: (
          <Text>
            The goal you selected does not have an id. Please make sure it
            exists in your goals.
          </Text>
        ),
        status: "critical",
        footer: "",
      });
      return;
    }
  }

  function handleCancelClick(e) {
    e.stopPropagation();
    nav("/sessions");
  }

  function handleModalClose(e) {
    e.stopPropagation();
    setShowModal(false);
    setModalInfo({
      heading: "",
      subtitle: "",
      content: "",
      status: "",
      footer: "",
    });
    if (session.status === "created") {
      nav("/sessions");
    }
    if (session.status !== "") {
      dispatch(resetSessionSubmissionStatus());
    }
    if (tag.status !== "") {
      dispatch(resetTagSubmissionStatus());
    }
  }

  useEffect(() => {
    switch (session.status) {
      case "pending":
        setLoading(true);
        break;
      case "created":
        setModalInfo({
          heading: "Session Logged!",
          subtitle: "Your practice session was successfully logged!",
          content: <Text>Keep up the good work!</Text>,
          footer: "",
          status: "ok",
        });
        setLoading(false);
        setShowModal(true);
        break;
      case "error":
        setModalInfo({
          heading: "Error!",
          subtitle: "An unknown error occurred.",
          content: (
            <Text>
              There was an error while trying to log your practice session.
              Please ensure all fields are filled out properly. Ensure that if
              you refresh the page you are still logged in, and that you have an
              internet connection.
            </Text>
          ),
          footer: "",
          status: "critical",
        });
        setLoading(false);
        setShowModal(true);
        break;
      default:
        setLoading(false);
        break;
    }
  }, [session]);

  useEffect(() => {
    if (tagSearch === "" && tag.status === "retrieved") {
      const tagNames = tag.userTags.map((tag) => tag.name);
      setFilteredTagOptions(tagNames);
    } else if (tagSearch !== "" && tag.status === "created") {
      setValue((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tagSearch],
      }));
      setFilteredTagOptions(userTags);
      setTagSearch("");
      dispatch(resetTagSubmissionStatus());
    } else if (tagSearch !== "" && tag.status === "error") {
      setShowModal(true);
      setModalInfo({
        heading: "Error creating tag!",
        subtitle: "Field: Add Tags",
        content: (
          <Text>
            An error occurred while trying to create this tag. You may have
            already created this tag before.
          </Text>
        ),
        status: "critical",
        footer: "",
      });
    }
  }, [tag, tagSearch, dispatch]);

  useEffect(() => {
    if (value.instrument !== "") {
      // Get goals for specific instrument
      let goals = [];
      const userInstrument = instrument.userInstruments.filter(
        (inst) => inst.name === value.instrument
      )[0];
      let instrumentId = null;
      if (userInstrument) {
        instrumentId = userInstrument.id;
        goals = userGoals.filter((goal) => goal.instrumentId === instrumentId);
        if (goals.length) {
          goals = goals.map((goal) => goal.name);
          setFilteredGoalOptions(goals);
        } else {
          setShowModal(true);
          setModalInfo({
            heading: "Error creating session!",
            subtitle: "Field: Goal",
            content: (
              <Text>
                An error occurred while trying to create this session. You do
                not have any goals associated with that instrument. Please
                create a goal for that instrument before logging any practice
                sessions.
              </Text>
            ),
            status: "critical",
            footer: "",
          });
        }
      } else {
        setShowModal(true);
        setModalInfo({
          heading: "Error creating session!",
          subtitle: "Field: Instrument",
          content: (
            <Text>
              An error occurred while trying to create this session. The
              instrument you selected was not found in your instruments. Please
              make sure it exists in your instruments list.
            </Text>
          ),
          status: "critical",
          footer: "",
        });
      }
    }
  }, [value]);

  useEffect(() => {
    if (instrument.userInstruments.length) {
      const instrumentNames = instrument.userInstruments.map(
        (inst) => inst.name
      );
      setInstrumentOptions(instrumentNames);
    } else {
      setInstrumentOptions([]);
    }
  }, [instrument]);

  useEffect(() => {
    dispatch(getUserInstruments());
    dispatch(getUserTags());
    dispatch(getUserGoals());
  }, [dispatch]);

  return (
    <PageWrapper>
      <Heading level={1} size="small">
        Log Practice Session
      </Heading>
      {showModal && (
        <Modal
          heading={modalInfo.heading}
          subtitle={modalInfo.subtitle}
          content={modalInfo.content}
          status={modalInfo.status}
          footer={modalInfo.footer}
          onClose={(e) => handleModalClose(e)}
        />
      )}
      {loading && <Spinner />}
      <Box pad={largePad[size]} direction="row" justify="center">
        <Form
          onChange={(nextValue) => setValue(nextValue)}
          value={value}
          onSubmit={({ value }) => handleSubmit(value)}
          style={formStyle}
        >
          <FormField name="instrument" htmlFor="instrument" label="Instrument">
            <Select
              name="instrument"
              options={instrumentOptions}
              placeholder="Select instrument"
            />
          </FormField>
          <FormField name="goal" htmlFor="goal" label="Goal">
            <Select
              name="goal"
              options={filteredGoalOptions}
              placeholder="Select goal"
            />
          </FormField>
          <FormField name="exercise" htmlFor="exercise" label="Session Name">
            <TextInput name="exercise" />
          </FormField>
          <FormField name="tempo" htmlFor="tempo" label="Tempo">
            <TextInput name="tempo" type="number" value={value.tempo} />
          </FormField>
          <Box direction="row" justify="between">
            <FormField
              name="durationTime"
              htmlFor="durationTime"
              label="Duration"
            >
              <TextInput
                name="durationTime"
                type="number"
                value={value.durationTime}
              />
            </FormField>
            <FormField
              name="durationFormat"
              htmlFor="durationFormat"
              label="Duration Format"
            >
              <Select
                name="durationFormat"
                placeholder="days/hours/minutes/etc."
                options={[
                  "minutes",
                  "hours",
                  "days",
                  "weeks",
                  "months",
                  "years",
                ]}
              />
            </FormField>
          </Box>
          <FormField
            htmlFor="description"
            name="description"
            label="Description"
          >
            <TextArea
              name="description"
              placeholder="Add description/notes to session"
              value={value.description}
            />
          </FormField>
          <Box direction="row">
            <FormField htmlFor="tags" name="tags" label="Add Tags">
              <Select
                name="tags"
                placeholder="Add Tags"
                searchPlaceholder="Search existing tags"
                options={filteredTagOptions}
                value={value.tags}
                onChange={({ value: nextValue }) => handleSelect(nextValue)}
                onSearch={(text) => onSearch(text)}
                multiple
                closeOnChange={false}
              />
            </FormField>
          </Box>
          <Box direction="row" gap="medium" pad={{ vertical: sizePad[size] }}>
            <Button type="submit" primary label="Submit" />
            <Button
              type="button"
              secondary
              label="Cancel"
              onClick={(e) => handleCancelClick(e)}
            />
          </Box>
        </Form>
      </Box>
    </PageWrapper>
  );
}

export default CreateSessionPage;
