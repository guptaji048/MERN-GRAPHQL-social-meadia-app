import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "../App.css";
import { AuthContext } from "../authentication/auth";

function Register(props) {
  const context = useContext(AuthContext);
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: ""
  });
  const { username, email, password, confirmPass } = value;
  const [errors, seterrors] = useState("");

  const handleChange = event => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(registerUser, {
    update(proxy, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value
  });

  const onSubmit = event => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPass"
          type="password"
          error={errors.confirmPass ? true : false}
          value={confirmPass}
          onChange={handleChange}
        />
        <Button type="submit" color="yellow">
          Register
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

const registerUser = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPass: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPass: $confirmPass
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Register;
