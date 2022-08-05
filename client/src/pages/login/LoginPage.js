import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  TextInput,
  Box,
  Button,
  ResponsiveContext,
} from "grommet";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { loginUser } from "../../features/user/userActions";

const formStyle = {
  width: "50%",
};

const pad = {
  xsmall: "medium",
  small: "medium",
  medium: "large",
  large: "xlarge",
  xlarge: "xlarge",
};

function LoginPage() {
  const size = useContext(ResponsiveContext);
  const [value, setValue] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.id !== null && nav("/");
  }, [user]);

  function handleSubmit(value) {
    dispatch(loginUser(value));
  }

  return (
    <PageWrapper>
      <Box pad={pad[size]} direction="row" justify="center">
        <Form
          onChange={(nextValue) => setValue(nextValue)}
          value={value}
          onSubmit={({ value }) => handleSubmit(value)}
          style={formStyle}
        >
          <FormField name="username" htmlFor="username" label="Username">
            <TextInput name="username" />
          </FormField>
          <FormField name="password" htmlFor="password" label="Password">
            <TextInput name="password" type="password" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
          </Box>
        </Form>
      </Box>
    </PageWrapper>
  );
}

export default LoginPage;
