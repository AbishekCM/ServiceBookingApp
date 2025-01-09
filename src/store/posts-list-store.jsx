/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  editPost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPosts = currentPostList;
  if (action.type === "DELETE_POST") {
    newPosts = currentPostList.filter(
      (post) => post.postId !== action.payload.postId
    );
    console.log(newPosts);
  } else if (action.type === "ADD_POST") {
    const newPost = {
      postId: action.payload.postId,
      userName: action.payload.userName,
      postTitle: action.payload.postTitle,
      postBody: action.payload.postBody,
      postTags: action.payload.postTags,
      postReactions: action.payload.postReactions,
      createdAt: action.payload.createdAt,
    };

    newPosts = [newPost, ...currentPostList];
  } else if (action.type === "EDIT_POST") {
    const foundIndex = currentPostList.findIndex(
      (post) => post.postId === action.payload.updates.id
    );

    const foundPost = currentPostList[foundIndex];

    currentPostList[foundIndex] = {
      postId: foundPost.postId,
      postReactions: foundPost.postReactions,
      userName: foundPost.userName,
      createdAt: foundPost.createdAt,

      postTitle: action.payload.updates.title,
      postBody: action.payload.updates.body,
      postTags: action.payload.updates.tags,
    };
  }

  return newPosts;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userName, postTitle, postBody, postTags) => {
    const addPostAction = {
      type: "ADD_POST",
      payload: {
        postId: uuidv4(),
        userName,
        postTitle,
        postBody,
        postTags,
        postReactions: 0,
        createdAt: new Date().toLocaleString(),
      },
    };
    dispatchPostList(addPostAction);
  };

  const deletePost = useCallback(
    (postId) => {
      const deletePostAction = {
        type: "DELETE_POST",
        payload: {
          postId,
        },
      };

      dispatchPostList(deletePostAction);
    },
    [dispatchPostList]
  );

  const editPost = useCallback(
    (updates) => {
      const editPostAction = {
        type: "EDIT_POST",
        payload: {
          updates,
        },
      };

      dispatchPostList(editPostAction);
    },
    [dispatchPostList]
  );

  /* const testArray=[1,3,2,4,5];
  const sortedArray=useMemo(()=>{
    
    return testArray.sort((a,b)=>(a-b))
  },[testArray])
  console.log(sortedArray); */
  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        editPost: editPost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    postId: "1",
    postTitle: "Going to Helsinki",
    postBody: "vacation from work",
    postReactions: 2,
    userName: "user-08",
    postTags: ["vacation", "finland", "helsinki"],
    createdAt: "1/7/2025, 1:35:06 AM",
  },

  {
    postId: "2",
    postTitle: "Learning React",
    postBody: "from youtube, sample projects",
    postReactions: 3,
    userName: "user-09",
    postTags: ["react", "learning", "tutorial"],
    createdAt: "1/7/2025, 1:40:06 AM",
  },
];

export default PostListProvider;
