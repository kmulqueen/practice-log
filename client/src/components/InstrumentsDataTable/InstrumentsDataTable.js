import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, DataTable, Heading, ResponsiveContext, Text } from "grommet";
import { More } from "grommet-icons";
import {
  smallPad,
  smallIcon,
  sizePad,
  showTableOverflow,
} from "../../styles/utils";
import { setInstrument } from "../../features/instrument/instrumentActions";
import Modal from "../Modal/Modal";
import moment from "moment";

function InstrumentsDataTable({ data, placeHolder }) {
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

  function formatModalContent(datum) {
    return (
      <Box direction="column" gap={smallPad[size]}>
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
    dispatch(setInstrument(datum));
    nav(`/instruments/view`);
  }
  function handleInformationClick(e, datum) {
    e.stopPropagation();
    setModalInfo({
      heading: `${datum.name}`,
      subtitle: "",
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
        <Heading level={2} className="instruments-table-heading">
          All Instruments
        </Heading>
        <Box pad={smallPad[size]} direction="row" className={showTableOverflow}>
          <DataTable
            aria-describedby="instruments-table-heading"
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

export default InstrumentsDataTable;
