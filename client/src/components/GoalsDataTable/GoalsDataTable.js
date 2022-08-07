import React, { useContext, useState } from "react";
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
  const size = useContext(ResponsiveContext);
  const nav = useNavigate();

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
  function formatStatusText(date) {
    if (date === null) {
      return "In Progress";
    } else {
      return `Completed on ${formatDate(date)}`;
    }
  }
  function formatModalContent(datum) {
    return (
      <Box direction="column" gap={smallPad[size]}>
        <Text>Created on {formatDate(datum.createdAt)}</Text>
        <Text>Target tempo: {datum.targetTempo} BPM</Text>
        <Text>Target time investment: {datum.targetDuration}</Text>
        <Text>Total time invested: {datum.totalDuration || "None"}</Text>
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
    // TODO: Navigate to the goal page
    console.log("clicked", datum);
  }
  function handleInformationClick(e, datum) {
    e.stopPropagation();
    setModalInfo({
      heading: `${datum.name}`,
      subtitle: `${formatStatusText(datum.dateCompleted)}`,
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
