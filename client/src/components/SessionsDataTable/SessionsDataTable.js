import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, DataTable, Heading, ResponsiveContext, Tag, Text } from "grommet";
import { InProgress, Checkmark, More } from "grommet-icons";
import {
  smallPad,
  smallIcon,
  sizePad,
  showTableOverflow,
} from "../../styles/utils";
import Modal from "../Modal/Modal";
import { getUserInstruments } from "../../features/instrument/instrumentActions";
import moment from "moment";

function SessionsDataTable({ data, placeHolder }) {
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    heading: "",
    subtitle: "",
    content: "",
    footer: "",
    status: "",
  });
  const { userInstruments } = useSelector((state) => state.instrument);
  const size = useContext(ResponsiveContext);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      property: "Exercise",
      header: "Name",
      primary: true,
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Box
              onClick={(e) => handleNameClick(e, datum)}
              hoverIndicator={true}
            >
              <Text size={sizePad[size]}>{datum.exercise}</Text>
            </Box>
          );
        }
      },
      pin: ["xsmall", "small"].includes(size),
    },
    {
      property: "instrumentId",
      header: "Instrument",
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Box>
              <Text size={sizePad[size]}>
                {formatInstrumentName(datum.instrumentId)}
              </Text>
            </Box>
          );
        }
      },
    },
    {
      property: "createdAt",
      header: "Date",
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Text size={smallPad[size]}>{formatDate(datum.createdAt)}</Text>
          );
        }
      },
    },
    {
      property: "duration",
      header: "Duration",
      render: (datum) => {
        if (typeof datum === "object") {
          return datum.duration;
        }
      },
    },
    {
      property: "tempo",
      header: "Tempo",
      render: (datum) => {
        if (typeof datum === "object") {
          return datum.tempo;
        }
      },
    },
    {
      property: "",
      header: "Information",
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Box
              onClick={(e) => handleInformationClick(e, datum)}
              direction="row"
            >
              <More size={smallIcon[size]} />
            </Box>
          );
        }
      },
    },
  ];

  function formatDate(date) {
    return moment(date).format("MMM Do, YYYY");
  }
  function formatInstrumentName(instrumentId) {
    if (typeof userInstruments === "object") {
      const instrumentName = userInstruments.filter(
        (instrument) => instrument.id === instrumentId
      )[0].name;
      if (instrumentName) {
        return instrumentName;
      } else {
        return "N/A";
      }
    } else {
      return "";
    }
  }

  function formatModalContent(datum) {
    return (
      <Box direction="column" gap={smallPad[size]}>
        <Text>Created on {formatDate(datum.createdAt)}</Text>
        <Text>Instrument: {formatInstrumentName(datum.instrumentId)}</Text>
        <Text>Tempo: {datum.tempo} BPM</Text>
        <Text>Time practiced: {datum.duration}</Text>
        <Box direction="column" gap={smallPad[size]}>
          <Text>Tags:</Text>
          <Box direction="row" gap={smallPad[size]}>
            {datum.tags.map((tag) => (
              <Tag
                key={tag}
                value={tag}
                style={{ width: "max-content" }}
                size="small"
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  function formatPlaceHolder() {
    if (placeHolder !== null) {
      return (
        <Box pad={"small"}>
          <Text color="status-critical">{placeHolder}</Text>
        </Box>
      );
    }
  }
  function handleNameClick(e, datum) {
    e.stopPropagation();
    // TODO: Navigate to the session page
    console.log("clicked", datum);
  }
  function handleInformationClick(e, datum) {
    e.stopPropagation();
    setModalInfo({
      heading: `${datum.exercise}`,
      subtitle: `${formatDate(datum.createdAt)}`,
      content: formatModalContent(datum),
      footer: "",
      status: "information",
    });
    setShowInformationModal(true);
  }
  function handleModalClose(e) {
    e.stopPropagation();
    setShowInformationModal(false);
  }

  useEffect(() => {
    dispatch(getUserInstruments());
  }, [dispatch]);
  return (
    <>
      {showInformationModal && (
        <Modal
          heading={modalInfo.heading}
          subtitle={modalInfo.subtitle}
          content={modalInfo.content}
          footer={modalInfo.footer}
          status={modalInfo.status}
          onClose={(e) => handleModalClose(e)}
        />
      )}
      <Box direction="column" gap={smallPad[size]}>
        <Heading level={2} className="sessions-table-heading">
          All Practice Sessions
        </Heading>
        <Box pad={smallPad[size]} direction="row" className={showTableOverflow}>
          <DataTable
            aria-describedby="sessions-table-heading"
            data={data}
            columns={columns}
            fill
            pin
            paginate={{
              border: "top",
              direction: "row",
              fill: "horizontal",
              flex: false,
              justify: !["xsmall", "small"].includes(size) ? "end" : "center",
              pad: { top: "xsmall" },
            }}
            step={10}
            sortable
            sort={{ direction: "asc", property: "name" }}
            placeholder={formatPlaceHolder()}
          />
        </Box>
      </Box>
    </>
  );
}

export default SessionsDataTable;
