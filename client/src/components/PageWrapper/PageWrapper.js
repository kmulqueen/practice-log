import React, { useContext } from "react";
import { Box, ResponsiveContext } from "grommet";
import AppHeader from "../AppHeader/AppHeader";
import { largePad } from "../../styles/utils";

function PageWrapper({ children }) {
  const size = useContext(ResponsiveContext);

  return (
    <Box>
      <AppHeader />
      <Box pad={largePad[size]}>{children}</Box>
    </Box>
  );
}

export default PageWrapper;
