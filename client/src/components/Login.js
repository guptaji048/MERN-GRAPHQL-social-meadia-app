import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "../App.css";
import { AuthContext } from "../authentication/auth";

function Login(props) {
  const context = useContext(AuthContext);

  const [value, setvalue] = useState({
    username: "",
    password: ""
  });
  const { username, password } = value;
  const [errors, seterrors] = useState("");

  const handleChange = event => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  const [logUser, { loading }] = useMutation(loginUser, {
    update(proxy, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value
  });

  const onSubmit = event => {
    event.preventDefault();
    logUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={username}
          error={errors.username ? true : false}
          type="text"
          onChange={handleChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={password}
          onChange={handleChange}
        />

        <Button type="submit" color="yellow">
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const loginUser = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Login;
