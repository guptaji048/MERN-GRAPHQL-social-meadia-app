import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, GridRow, GridColumn, Transition } from "semantic-ui-react";

import PostCard from "./PostCard";

function Home() {
  const { loading, data } = useQuery(getPostsQuery);
  return (
    <Grid columns={2}>
      <GridRow style={{ marginLeft: 12 }}>
        <h2>Recent posts</h2>
      </GridRow>
      <GridRow>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map(item => (
                <GridColumn key={item.id} style={{ marginBottom: 20 }}>
                  <PostCard post={item} />
                </GridColumn>
              ))}
          </Transition.Group>
        )}
      </GridRow>
    </Grid>
  );
}

const getPostsQuery = gql`
  {
    getPosts {
      id
      title
      photo_url
      username
      createdAt
      likeCount
      likes {
        username
      }
    }
  }
`;

export default Home;
