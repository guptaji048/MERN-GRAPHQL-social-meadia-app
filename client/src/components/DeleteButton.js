import React, { useState, Fragment } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Icon, Button, Confirm } from "semantic-ui-react";

function DeleteButton(props) {
  const [confirmOpen, setconfirmOpen] = useState(false);
  const [deletePost] = useMutation(deletePostMutation, {
    update(proxy) {
      setconfirmOpen(false);
      const data = proxy.readQuery({
        query: getPostsQuery
      });
      data.getPosts = data.getPosts.filter(p => p.id !== props.postId);
      proxy.writeQuery({ query: getPostsQuery, data });
    },
    variables: {
      postId: props.postId
    }
  });
  return (
    <Fragment>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setconfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setconfirmOpen(false)}
        onConfirm={deletePost}
      />
    </Fragment>
  );
}

const deletePostMutation = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const getPostsQuery = gql`
  {
    getPosts {
      id
    }
  }
`;
export default DeleteButton;
