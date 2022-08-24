import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Button, Heading, ResponsiveContext, TextInput } from "grommet";
import { Edit, FormCheckmark, FormClose } from "grommet-icons";
import { sizePad, smallIcon, smallPad } from "../../styles/utils";

function ViewGoalPage() {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const size = useContext(ResponsiveContext);
  const { currentGoal, status } = useSelector((state) => state.goal);
  const nav = useNavigate();
  const dispatch = useDispatch();

  function handleEditClick(e) {
    e.stopPropagation();
    setEdit(true);
  }

  function handleEditConfirm(e) {
    e.stopPropagation();
    // const payload = {
    //   id: currentGoal.id,
    //   name: editValue,
    // };
    // dispatch(updateInstrument(payload));
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
      (currentGoal.id === null || currentGoal.id === undefined)
    ) {
      nav("/goals");
    }
  }, [currentGoal]);

  return (
    <PageWrapper>
      {!edit ? (
        <Box direction="row" align="center" gap={sizePad[size]}>
          <Heading level={1} size="small">
            {currentGoal.name}
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
            placeholder={currentGoal.name}
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

      <Heading level={1} size="small">
        Sessions
      </Heading>
      <Heading level={1} size="small">
        Stats/Graphs
      </Heading>
    </PageWrapper>
  );
}

export default ViewGoalPage;
