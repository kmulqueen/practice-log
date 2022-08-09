import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Heading } from "grommet";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/user/userActions";

function AppHeader() {
  const user = useSelector((state) => state.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  function handleClick(e) {
    e.stopPropagation();
    if (user.id !== null) {
      dispatch(logoutUser());
    }
    nav("/login");
  }

  function handleHeadingClick(e) {
    e.stopPropagation();
    nav("/");
  }

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
      <Heading level="3" margin="none" onClick={(e) => handleHeadingClick(e)}>
        Practice Log
      </Heading>
      {user.id ? (
        <Button primary label="Logout" onClick={(e) => handleClick(e)} />
      ) : (
        <Button primary label="Login" onClick={(e) => handleClick(e)} />
      )}
    </Box>
  );
}

export default AppHeader;
