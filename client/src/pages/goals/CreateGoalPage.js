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
  TextInput,
  ResponsiveContext,
  Select,
  Spinner,
  Text,
} from "grommet";
import { FormAdd } from "grommet-icons";
import { largePad, sizePad, formStyle } from "../../styles/utils";
import {
  createGoal,
  resetGoalSubmissionStatus,
} from "../../features/goal/goalActions";

// Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
const getEscapedText = (text) => text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

// Create the regular expression with escaped special characters.
const formatSearchExpression = (text) => new RegExp(getEscapedText(text), "i");

// TODO: Replace with user's tags
const defaultOptions = ["Tag 1", "Tag 2", "Tag 3"];

function CreateGoalPage() {
  const size = useContext(ResponsiveContext);
  const [filteredTagOptions, setFilteredTagOptions] = useState(defaultOptions);
  const [tagSearch, setTagSearch] = useState("");
  const [value, setValue] = useState({
    name: "",
    tempo: 60,
    durationTime: 0,
    durationFormat: "",
    tags: "",
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
  const user = useSelector((state) => state.user);
  const goal = useSelector((state) => state.goal);
  const nav = useNavigate();

  function onSearch(text) {
    setTagSearch(text);
    const exp = formatSearchExpression(text);
    const filteredOptions = defaultOptions.filter((option) => exp.test(option));
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
    defaultOptions.push(tag);
    setValue((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, tag],
    }));
    setFilteredTagOptions(defaultOptions);
    setTagSearch("");
  }

  // Fix for undefined values being passed into tags as a result of the create tag button not being able to fill up it's full width.
  function handleSelect(value) {
    value.forEach((val) => {
      if (val === undefined) {
        defaultOptions.push(tagSearch);
        setValue((prevState) => ({
          ...prevState,
          tags: [...prevState.tags, tagSearch],
        }));
        setFilteredTagOptions(defaultOptions);
        setTagSearch("");
      }
    });
  }

  function handleSubmit(value) {
    const { name, tempo, durationTime, durationFormat, tags } = value;
    // Validate values
    if (!name.length) {
      setShowModal(true);
      setModalInfo({
        heading: "Missing field!",
        subtitle: "Field: Goal Name",
        content: <Text>Please enter a value for goal name.</Text>,
        status: "critical",
        footer: "",
      });
      return;
    }
    if (tempo <= 0) {
      setShowModal(true);
      setModalInfo({
        heading: "Invalid field!",
        subtitle: "Field: Target Tempo",
        content: (
          <Text>
            Please enter a number greater than 0 for the target tempo.
          </Text>
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
        subtitle: "Field: Goal Duration",
        content: (
          <Text>
            Please enter a number greater than 0 for the goal duration.
          </Text>
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

    let filteredTags = [];
    if (tags.length) {
      filteredTags = tags.filter((tag) => tag !== undefined);
    }
    // Format durations
    const targetDuration = `${durationTime} ${durationFormat}`;

    const payload = {
      userId: user.id,
      name,
      targetTempo: tempo,
      targetDuration,
      tags: filteredTags,
    };

    dispatch(createGoal(payload));
  }

  function handleCancelClick(e) {
    e.stopPropagation();
    nav("/goals/view");
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
    if (goal.status === "created") {
      nav("/goals/view");
    }
    dispatch(resetGoalSubmissionStatus());
  }

  useEffect(() => {
    switch (goal.status) {
      case "pending":
        setLoading(true);
        break;
      case "created":
        setModalInfo({
          heading: "Goal Created!",
          subtitle: "Your goal was created successfully!",
          content: (
            <Text>
              Good luck on your new goal! You can start logging sessions towards
              that goal by either finding this goal on your "Goals" page and
              adding a new session, or by creating a new session on the
              "Sessions" page and selecting the goal name.
            </Text>
          ),
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
              There was an error while trying to create your new goal. Please
              ensure all fields are filled out properly. Ensure that if you
              refresh the page you are still logged in, and that you have an
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
  }, [goal]);

  return (
    <PageWrapper>
      <Heading level={1} size="small">
        Create New Goal
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
          <FormField name="name" htmlFor="name" label="Goal Name">
            <TextInput name="name" />
          </FormField>
          <FormField name="tempo" htmlFor="tempo" label="Target Tempo">
            <TextInput name="tempo" type="number" value={value.tempo} />
          </FormField>
          <Box direction="row" justify="between">
            <FormField
              name="durationTime"
              htmlFor="durationTime"
              label="Goal Duration"
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

export default CreateGoalPage;
