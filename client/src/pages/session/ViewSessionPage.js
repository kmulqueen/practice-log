import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Button, Heading, TextInput, ResponsiveContext } from "grommet";
import { Edit, FormClose, FormCheckmark } from "grommet-icons";
import { sizePad, smallIcon, smallPad } from "../../styles/utils";

function ViewSessionPage() {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const size = useContext(ResponsiveContext);
  const { currentSession, status } = useSelector((state) => state.session);
  const nav = useNavigate();

  function handleEditClick(e) {
    e.stopPropagation();
    setEdit(true);
  }

  function handleEditConfirm(e) {
    e.stopPropagation();
    console.log("confirm edit clicked");
    setEdit(false);
  }

  function handleEditCancel(e) {
    e.stopPropagation();
    setEdit(false);
    setEditValue("");
  }

  useEffect(() => {
    if (
      (status === "retrieved" || status === "") &&
      (currentSession.id === null || currentSession.id === undefined)
    ) {
      nav("/sessions");
    }
  }, [currentSession]);

  return (
    <PageWrapper>
      {!edit ? (
        <Box direction="row" align="center" gap={sizePad[size]}>
          <Heading level={1} size="small">
            {currentSession.exercise}
          </Heading>
          <Button
            label="Edit"
            icon={<Edit size={smallIcon[size]} />}
            size={smallPad[size]}
            onClick={(e) => handleEditClick(e)}
            secondary
          />
        </Box>
      ) : (
        <Box direction="row" align="center">
          <TextInput
            placeholder={currentSession.exercise}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus={true}
            focusIndicator={true}
          />
          <Box direction="row">
            <Button
              icon={<FormClose color="status-critical" />}
              tip="Cancel"
              onClick={(e) => handleEditCancel(e)}
            />
            <Button
              icon={<FormCheckmark color="status-ok" />}
              tip="Confirm"
              onClick={(e) => handleEditConfirm(e)}
            />
          </Box>
        </Box>
      )}
    </PageWrapper>
  );
}

export default ViewSessionPage;
