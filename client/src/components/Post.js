import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

export default function Post(props) {
  const [value, setvalue] = useState({
    title: "",
    photo_url: ""
  });
  const { title, photo_url } = value;
  const [errors, seterrors] = useState("");
  const [load, setload] = useState(false);

  const handleChange = event => {
    setvalue({ ...value, [event.target.name]: event.target.value });
  };
  const uploadImage = async event => {
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "zujoProj");
    formData.append("file", files);
    setload(true);

    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/guptaji048/image/upload",
      formData
    );
    let result = await res.data.secure_url;
    setvalue({ ...value, photo_url: result });
    setload(false);
  };

  const [addPost, { loading }] = useMutation(addPostMutation, {
    update(proxy, result) {
      /*context.login(result.data.register);*/
      props.history.push("/");
      console.log(result.data.createPost);
    },
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: value
  });

  const onSubmit = event => {
    event.preventDefault();
    if (!load) {
      addPost();
    }
  };
  return (
    <div className="form-container">
      <Form noValidate className={loading ? "loading" : ""}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            label="Image"
            name="photo"
            type="file"
            onChange={uploadImage}
            error={errors.photo_url ? true : false}
          />
    
          <Form.Input
            label="Title"
            type="text"
            name="title"
            placeholder="Title of image"
            value={title}
            onChange={handleChange}
            error={errors.title ? true : false}
          />

          <Button type="submit" color="yellow" onClick={onSubmit}>
            Post
          </Button>
        </Form.Field>
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

const addPostMutation = gql`
  mutation createPost($title: String!, $photo_url: String!) {
    createPost(loginInput: { title: $title, photo_url: $photo_url }) {
      id
      username
      title
      createdAt
      photo_url
    }
  }
`;
