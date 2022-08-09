import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
  ResponsiveContext,
} from "grommet";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Modal from "../../components/Modal/Modal";
import { largePad, formStyle, sizePad } from "../../styles/utils";
import {
  createInstrument,
  getUserInstruments,
  resetInstrumentSubmissionStatus,
} from "../../features/instrument/instrumentActions";
import { useNavigate } from "react-router-dom";

function CreateInstrumentPage() {
  const [value, setValue] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    heading: "",
    subtitle: "",
    content: "",
    status: "",
    footer: "",
  });

  const instrument = useSelector((state) => state.instrument);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const size = useContext(ResponsiveContext);

  function handleCancelClick(e) {
    e.stopPropagation();
    nav("/instruments/view");
  }
  function handleSubmit(value) {
    if (typeof instrument.userInstruments === "object") {
      // Check if instrument already exists in user's instruments
      const instrumentExists = instrument.userInstruments.filter(
        (inst) => inst.name === value
      )[0];
      if (instrumentExists) {
        setModalInfo({
          heading: "Already Exists.",
          subtitle: "Instrument already exists.",
          content:
            "The instrument you tried to create already exists in your instrument list. Please enter a new instrument.",
          status: "critical",
          footer: "",
        });
        setShowModal(true);
        return;
      } else {
        dispatch(createInstrument(value));
      }
    } else {
      dispatch(createInstrument(value));
    }
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
    if (instrument.status === "created") {
      nav("/instruments/view");
    }
    if (instrument.status !== "") {
      dispatch(resetInstrumentSubmissionStatus());
    }
  }

  useEffect(() => {
    dispatch(getUserInstruments());
  }, [dispatch]);
  useEffect(() => {
    switch (instrument.status) {
      case "pending":
        setLoading(true);
        break;
      case "created":
        setModalInfo({
          heading: "instrument Created!",
          subtitle: "Your instrument was created successfully!",
          content: <Text>You can now track goals for this instrument.</Text>,
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
              There was an error while trying to create your new instrument.
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
  }, [instrument]);
  return (
    <PageWrapper>
      <Heading level={1} size="small">
        Create New Instrument
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
      <Box pad={largePad[size]} direction="row" justify="center">
        <Form
          onChange={(nextValue) => setValue(nextValue)}
          value={value}
          onSubmit={({ value }) => handleSubmit(value)}
          style={formStyle}
        >
          <FormField name="name" htmlFor="name" label="Instrument Name">
            <TextInput name="name" />
          </FormField>

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

export default CreateInstrumentPage;
