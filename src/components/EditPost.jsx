import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { PostList } from "../store/posts-list-store";

function EditPost() {
  const location = useLocation();
  const { state } = location || {};
  const { post } = state || {};

  const { editPost } = useContext(PostList);
  const navigateHomePage = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      id: formData.get("postId"),
      title: formData.get("title"),
      body: formData.get("body"),
      tags: formData.get("tags").split(","),
    };

    editPost(newData);
    navigateHomePage("/");
  }

  return (
    <form onSubmit={handleSubmit} action="/" className="create-post">
      <h1>Edit Your Post</h1>

      <div className="mb-3" hidden>
        <label htmlFor="postId" className="form-label">
          PostId
        </label>
        <input
          type="text"
          name="postId"
          className="form-control"
          id="postId"
          placeholder=""
          defaultValue={post.postId}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User Name
        </label>
        <input
          type="text"
          name="userId"
          className="form-control"
          id="userId"
          placeholder=""
          disabled
          value={post.userName}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="title"
          placeholder=""
          defaultValue={post.postTitle}
          required="true"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          name="body"
          rows="4"
          className="form-control"
          id="body"
          placeholder=""
          defaultValue={post.postBody}
          required="true"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          name="tags"
          placeholder=""
          defaultValue={post.postTags}
          required="true"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}

export default EditPost;
