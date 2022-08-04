import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
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
  return (
    <PageWrapper>
      <Box pad={pad[size]} direction="row" justify="center">
        <Form
          onChange={(nextValue) => setValue(nextValue)}
          value={value}
          onSubmit={({ value }) => {
            dispatch(loginUser(value));
          }}
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
