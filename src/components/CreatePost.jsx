import { useContext, useRef } from "react";
import { PostList } from "../store/posts-list-store";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userNameElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const postTagsElement = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const userName = userNameElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const postTags = postTagsElement.current.value.split(",");

    addPost(userName, postTitle, postBody, postTags);

    userNameElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    postTagsElement.current.value = "";

    navigate("/");
  }
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: "30px", color: "blue" }}>
        Create Your Post...
      </h1>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label form-labels">
          User Name
        </label>
        <input
          ref={userNameElement}
          type="text"
          className="form-control"
          id="userName"
          placeholder="Enter your User Name..."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label form-labels">
          Post Title
        </label>
        <input
          ref={postTitleElement}
          type="text"
          className="form-control"
          id="title"
          placeholder="Whats Up!..."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label form-labels">
          Description
        </label>
        <textarea
          ref={postBodyElement}
          type="text"
          className="form-control"
          id="body"
          placeholder="Describe your post..."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label form-labels">
          Tags
        </label>
        <input
          ref={postTagsElement}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Enter tags..."
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
