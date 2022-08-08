import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import GoalsDataTable from "../../components/GoalsDataTable/GoalsDataTable";
import { Add } from "grommet-icons";
import { Box, Button, Heading, ResponsiveContext } from "grommet";
import { useNavigate } from "react-router-dom";
import { getUserGoals } from "../../features/goal/goalActions";
import { smallIcon } from "../../styles/utils";

function ViewAllGoalsPage() {
  const [placeHolder, setPlaceHolder] = useState(null);
  const nav = useNavigate();
  const size = useContext(ResponsiveContext);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userGoals, status: userGoalsStatus } = useSelector(
    (state) => state.goal
  );

  function handleCreateClick(e) {
    e.stopPropagation();
    nav("/goals/create");
  }

  useEffect(() => {
    dispatch(getUserGoals(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    setPlaceHolder(null);
    if (userGoalsStatus === "pending") {
      setPlaceHolder("Loading...");
    } else if (
      typeof userGoals !== "object" &&
      userGoalsStatus === "retrieved"
    ) {
      setPlaceHolder(
        "Error retrieving user's goals. Please refresh the page and try again."
      );
    }
  }, [userGoals, userGoalsStatus]);
  return (
    <PageWrapper>
      <Box direction="row" gap="medium">
        <Heading level={1} size="small">
          My Goals
        </Heading>
        <Button
          label="Create Goal"
          primary
          icon={<Add size={smallIcon[size]} />}
          onClick={(e) => handleCreateClick(e)}
          size={smallIcon[size]}
        />
      </Box>
      <GoalsDataTable data={userGoals} placeHolder={placeHolder} />
    </PageWrapper>
  );
}

export default ViewAllGoalsPage;
