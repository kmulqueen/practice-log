import React, { useContext } from "react";
import { Box, Text, ResponsiveContext } from "grommet";

function Identifier({ title, subtitle, icon }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction="row"
      gap="medium"
      align="center"
      pad={{ horizontal: "medium", top: "medium" }}
    >
      <Box pad={{ vertical: "medium" }}>{icon}</Box>
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          {title}
        </Text>
        <Text>{subtitle}</Text>
      </Box>
    </Box>
  );
}

export default Identifier;
