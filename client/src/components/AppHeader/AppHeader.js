import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Heading, Text } from "grommet";

function AppHeader() {
  const user = useSelector((state) => state.user);

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="xsmall"
      style={{ zIndex: "1" }}
    >
      <Heading level="3" margin="none">
        Practice Log
      </Heading>
      {user.id ? (
        <Text>Hello, {user.username}</Text>
      ) : (
        <Button primary label="Login" />
      )}
    </Box>
  );
}

export default AppHeader;
