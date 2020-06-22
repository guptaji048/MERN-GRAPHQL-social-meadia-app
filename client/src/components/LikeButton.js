import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Icon, Label, Button } from "semantic-ui-react";

function LikeButton(props) {
  const [errors, seterrors] = useState("");
  const [liked, setliked] = useState(false);
  useEffect(() => {
    if (
      props.user &&
      props.post.likes.find(like => like.username === props.user.username)
    ) {
      setliked(true);
    } else setliked(false);
  }, [props.user, props.post.likes]);

  const [likePost] = useMutation(likePostMutation, {
    onError(err) {
      seterrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { postId: props.post.id }
  });

  const likeBtn = props.user ? (
    liked ? (
      <Button color="black">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="black" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="black" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeBtn}
      <Label basic color="black" pointing="left">
        {props.post.likeCount}
      </Label>
    </Button>
  );
}

const likePostMutation = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
