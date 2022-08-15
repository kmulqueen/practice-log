import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import SessionsDataTable from "../../components/SessionsDataTable/SessionsDataTable";
import { Add } from "grommet-icons";
import { Box, Button, Heading, ResponsiveContext } from "grommet";
import { useNavigate } from "react-router-dom";
import { smallIcon } from "../../styles/utils";
import { getUserSessions } from "../../features/session/sessionActions";

function ViewAllSessionsPage() {
  const [placeHolder, setPlaceHolder] = useState(null);
  const nav = useNavigate();
  const size = useContext(ResponsiveContext);

  const dispatch = useDispatch();
  const { userSessions, status: userSessionsStatus } = useSelector(
    (state) => state.session
  );

  function handleCreateClick(e) {
    e.stopPropagation();
    nav("/session/create");
  }

  useEffect(() => {
    dispatch(getUserSessions());
  }, [dispatch]);

  useEffect(() => {
    setPlaceHolder(null);
    if (userSessionsStatus === "pending") {
      setPlaceHolder("Loading...");
    } else if (
      typeof userSessions !== "object" &&
      userSessionsStatus === "retrieved"
    ) {
      setPlaceHolder(
        "Error retrieving user's practice sessions. Please refresh the page and try again."
      );
    }
  }, [userSessions, userSessionsStatus]);
  return (
    <PageWrapper>
      <Box direction="row" gap="medium">
        <Heading level={1} size="small">
          My Practice Sessions
        </Heading>
        <Button
          label="Create Session"
          primary
          icon={<Add size={smallIcon[size]} />}
          onClick={(e) => handleCreateClick(e)}
          size={smallIcon[size]}
        />
      </Box>
      <SessionsDataTable data={userSessions} placeHolder={placeHolder} />
    </PageWrapper>
  );
}

export default ViewAllSessionsPage;
