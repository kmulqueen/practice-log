import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Button, Heading, ResponsiveContext } from "grommet";
import { Edit } from "grommet-icons";
import { sizePad, smallIcon, smallPad } from "../../styles/utils";

function ViewInstrumentPage() {
  const size = useContext(ResponsiveContext);
  const { currentInstrument, status } = useSelector(
    (state) => state.instrument
  );
  const nav = useNavigate();

  useEffect(() => {
    if (
      (status === "retrieved" || status === "") &&
      (currentInstrument.id === null || currentInstrument.id === undefined)
    ) {
      nav("/");
    }
  }, [currentInstrument]);

  return (
    <PageWrapper>
      <Box direction="row" align="center" gap={sizePad[size]}>
        <Heading level={1} size="small">
          {currentInstrument.name}
        </Heading>
        <Button
          label="Edit"
          icon={<Edit size={smallIcon[size]} />}
          size={smallPad[size]}
        />
      </Box>
    </PageWrapper>
  );
}

export default ViewInstrumentPage;
