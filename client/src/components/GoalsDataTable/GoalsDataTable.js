import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, DataTable, Heading, ResponsiveContext, Tag, Text } from "grommet";
import {
  Analytics,
  InProgress,
  Checkmark,
  Clock,
  Dashboard,
  FormSchedule,
  More,
  Notes,
  Tag as TagIcon,
  Task,
} from "grommet-icons";
import {
  smallPad,
  smallIcon,
  sizePad,
  showTableOverflow,
} from "../../styles/utils";
import Modal from "../Modal/Modal";
import { getUserInstruments } from "../../features/instrument/instrumentActions";
import { getUserSessions } from "../../features/session/sessionActions";
import moment from "moment";

function GoalsDataTable({ data, placeHolder }) {
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    heading: "",
    subtitle: "",
    content: "",
    footer: "",
    status: "",
  });
  const { userInstruments } = useSelector((state) => state.instrument);
  const { userSessions } = useSelector((state) => state.session);
  const size = useContext(ResponsiveContext);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      property: "name",
      header: "Name",
      primary: true,
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Box
              onClick={(e) => handleNameClick(e, datum)}
              hoverIndicator={true}
            >
              <Text size={sizePad[size]}>{datum.name}</Text>
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
      header: "Created On",
      render: (datum) => {
        if (typeof datum === "object") {
          return (
            <Text size={smallPad[size]}>{formatDate(datum.createdAt)}</Text>
          );
        }
      },
    },
    {
      property: "dateCompleted",
      header: "Status",
      render: (datum) => {
        if (typeof datum === "object") {
          return formatStatusCell(datum.dateCompleted);
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
  function formatStatusCell(status) {
    if (status === null) {
      return (
        <Box direction="row" gap={smallPad[size]} align="center">
          {size !== "small" && <InProgress size={smallIcon[size]} />}
          <Text size={smallPad[size]}>In Progress</Text>
        </Box>
      );
    } else {
      return (
        <Box direction="row" gap={smallPad[size]} align="center">
          {size !== "small" && (
            <Checkmark size={smallIcon[size]} color="status-ok" />
          )}
          <Text size={smallPad[size]}>Completed</Text>
        </Box>
      );
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
            <Text weight="bold">Target Tempo</Text>
            <Text>{datum.targetTempo} BPM</Text>
          </Box>
          <Box direction="column" justify="center" align="center">
            <Clock size={smallIcon[size]} />
            <Text weight="bold">Goal Length</Text>
            <Text>{datum.targetDuration}</Text>
          </Box>
        </Box>
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
            <Analytics size={smallIcon[size]} />
            <Text weight="bold">Time Practiced</Text>
            <Text>{datum.totalDuration || "None"}</Text>
          </Box>
          <Box direction="column" justify="center" align="center">
            <Task size={smallIcon[size]} />
            <Text weight="bold">Sessions</Text>
            <Text>
              {
                userSessions.filter((session) => session.goalId === datum.id)
                  .length
              }
            </Text>
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
        <Text>Created on {formatDate(datum.createdAt)}</Text>
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
    // TODO: Navigate to the goal page
    console.log("clicked", datum);
  }
  function handleInformationClick(e, datum) {
    e.stopPropagation();
    setModalInfo({
      heading: `${datum.name}`,
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
    dispatch(getUserSessions());
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
        <Heading level={2} className="goals-table-heading">
          All Goals
        </Heading>
        <Box pad={smallPad[size]} direction="row" className={showTableOverflow}>
          <DataTable
            aria-describedby="goals-table-heading"
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

export default GoalsDataTable;
