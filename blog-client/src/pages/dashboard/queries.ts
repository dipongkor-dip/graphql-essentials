import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      bio
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_MY_POSTS = gql`
  query MyPosts {
    myPosts {
      id
      title
      content
      createdAt
      published
    }
  }
`;

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      published
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
      userError
      post {
        id
        title
      }
    }
  }
`;

export const PUBLISH_POST = gql`
  mutation PublishPost($id: ID!) {
    publishPost(id: $id) {
      userError
      post {
        id
        published
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $post: PostInput!) {
    updatePost(id: $id, post: $post) {
      userError
      post {
        id
        title
        content
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      userError
      post {
        id
      }
    }
  }
`;
