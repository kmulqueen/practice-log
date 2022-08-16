import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, DataTable, Heading, ResponsiveContext, Tag, Text } from "grommet";
import {
  Clock,
  Dashboard,
  FormSchedule,
  More,
  Notes,
  Tag as TagIcon,
} from "grommet-icons";
import {
  smallPad,
  smallIcon,
  sizePad,
  showTableOverflow,
} from "../../styles/utils";
import Modal from "../Modal/Modal";
import { getUserInstruments } from "../../features/instrument/instrumentActions";
import { setSession } from "../../features/session/sessionActions";
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
      if (instrumentId !== null && instrumentId !== undefined) {
        let instrumentName = userInstruments.filter(
          (instrument) => instrument.id === instrumentId
        )[0];
        if (instrumentName !== undefined) {
          instrumentName = instrumentName.name;
          return instrumentName;
        } else {
          return "N/A";
        }
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  function formatModalContent(datum) {
    return (
      <Box direction="column" gap={smallPad[size]}>
        <Box
          direction="row"
          gap={smallPad[size]}
          justify="between"
          align="center"
          background="background-back"
          pad={smallPad[size]}
          round
        >
          <Box direction="column" justify="center" align="center">
            <Dashboard size={smallIcon[size]} />
            <Text weight="bold">Tempo</Text>
            <Text>{datum.tempo} BPM</Text>
          </Box>
          <Box direction="column" justify="center" align="center">
            <Clock size={smallIcon[size]} />
            <Text weight="bold">Time Practiced</Text>
            <Text>{datum.duration}</Text>
          </Box>
        </Box>
        <Box
          direction="column"
          background="background-back"
          pad={smallPad[size]}
          round
        >
          <Box direction="row" gap="small" margin={{ bottom: smallPad[size] }}>
            <Notes size={smallIcon[size]} />
            <Text weight="bold">Description</Text>
          </Box>
          <Text>{datum.description}</Text>
        </Box>
        <Box
          direction="column"
          background="background-back"
          pad={smallPad[size]}
          round
        >
          <Box direction="row" gap="small" margin={{ bottom: smallPad[size] }}>
            <TagIcon size={smallIcon[size]} />
            <Text weight="bold">Tags</Text>
          </Box>
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

  function formatModalSubtitle(datum) {
    return (
      <Box direction="row" gap="small">
        <FormSchedule />
        <Text>{formatDate(datum.createdAt)}</Text>
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
    dispatch(setSession(datum.id));
    nav("/session/view");
  }
  function handleInformationClick(e, datum) {
    e.stopPropagation();
    setModalInfo({
      heading: `${datum.exercise}`,
      subtitle: formatModalSubtitle(datum),
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
