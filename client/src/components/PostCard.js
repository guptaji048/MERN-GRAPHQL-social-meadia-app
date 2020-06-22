import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../authentication/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export default function PostCard(props) {
  const { user } = useContext(AuthContext);

  return (
    <Card centered className="postcard" style={{ width: 400 }} fluid>
      <Image src={props.post.photo_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.post.username}</Card.Header>
        <Card.Meta>{moment(props.post.createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{props.post.title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={props.post} />
        {user && user.username === props.post.username && (
          <DeleteButton postId={props.post.id} />
        )}
      </Card.Content>
    </Card>
  );
}
