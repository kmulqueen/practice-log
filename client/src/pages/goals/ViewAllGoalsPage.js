import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Add } from "grommet-icons";
import { Box, Button, Heading } from "grommet";
import { useNavigate } from "react-router-dom";

function ViewAllGoalsPage() {
  const nav = useNavigate();
  function handleCreateClick(e) {
    e.stopPropagation();
    nav("/goals/create");
  }
  return (
    <PageWrapper>
      <Box direction="row" gap="medium">
        <Heading level={1} size="small">
          My Goals
        </Heading>
        <Button
          label="Create Goal"
          primary
          icon={<Add />}
          onClick={(e) => handleCreateClick(e)}
        />
      </Box>
    </PageWrapper>
  );
}

export default ViewAllGoalsPage;
