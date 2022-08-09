import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import InstrumentsDataTable from "../../components/InstrumentsDataTable/InstrumentsDataTable";
import { Add } from "grommet-icons";
import { Box, Button, Heading, ResponsiveContext } from "grommet";
import { useNavigate } from "react-router-dom";
import { getUserInstruments } from "../../features/instrument/instrumentActions";
import { smallIcon } from "../../styles/utils";

function ViewAllInstrumentsPage() {
  const [placeHolder, setPlaceHolder] = useState(null);
  const nav = useNavigate();
  const size = useContext(ResponsiveContext);

  const dispatch = useDispatch();
  const { userInstruments, status: userInstrumentsStatus } = useSelector(
    (state) => state.instrument
  );

  function handleCreateClick(e) {
    e.stopPropagation();
    nav("/instruments/create");
  }

  useEffect(() => {
    dispatch(getUserInstruments());
  }, [dispatch]);

  useEffect(() => {
    setPlaceHolder(null);
    if (userInstrumentsStatus === "pending") {
      setPlaceHolder("Loading...");
    } else if (
      typeof userInstruments !== "object" &&
      userInstrumentsStatus === "retrieved"
    ) {
      setPlaceHolder(
        "Error retrieving user's instruments. Please refresh the page and try again."
      );
    }
  }, [userInstruments, userInstrumentsStatus]);
  return (
    <PageWrapper>
      <Box direction="row" gap="medium">
        <Heading level={1} size="small">
          My Instruments
        </Heading>
        <Button
          label="Create Instrument"
          primary
          icon={<Add size={smallIcon[size]} />}
          onClick={(e) => handleCreateClick(e)}
          size={smallIcon[size]}
        />
      </Box>
      <InstrumentsDataTable data={userInstruments} placeHolder={placeHolder} />
    </PageWrapper>
  );
}

export default ViewAllInstrumentsPage;
