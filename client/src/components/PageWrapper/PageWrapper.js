import React, { useContext } from "react";
import { Box, ResponsiveContext } from "grommet";
import AppHeader from "../AppHeader/AppHeader";

const pad = {
  xsmall: "medium",
  small: "medium",
  medium: "large",
  large: "xlarge",
  xlarge: "xlarge",
};

function PageWrapper({ children }) {
  const size = useContext(ResponsiveContext);

  return (
    <Box>
      <AppHeader />
      <Box pad={pad[size]}>{children}</Box>
    </Box>
  );
}

export default PageWrapper;
