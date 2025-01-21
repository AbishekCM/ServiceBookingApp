/* eslint-disable no-unused-vars */
import { useContext, useRef } from "react";
import { PostList } from "../store/posts-list-store";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const serviceNameElement=useRef();
  const availabilityElement=useRef();
  const serviceRateElement = useRef();
  const userNameElement = useRef();
  const serviceDescriptionElement = useRef();
  const serviceTagsElement = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const userName = userNameElement.current.value;
    const serviceTitle = serviceRateElement.current.value;
    const userAvailability= availabilityElement.current.value;
    const serviceRate=serviceRateElement.current.value;

    const serviceDescription = serviceDescriptionElement.current.value;
    const serviceTags = serviceTagsElement.current.value.split(",");

    console.log(serviceDescription);

    addPost(userName,serviceTitle,userAvailability,serviceDescription,serviceRate,serviceTags);

    /* userNameElement.current.value = "";
    serviceRateElement.current.value = "";
    serviceDescriptionElement.current.value = "";
    serviceTagsElement.current.value = "";
    userAvailability.current.value="";
    serviceNameElement.current.value=""; */

    navigate("/");
  }
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <h1 style={{ marginBottom: "30px", color: "blue" }}>
        Post Your Service...
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
        <label htmlFor="serviceName" className="form-label form-labels">
          Service Name
        </label>
        <input
          ref={serviceNameElement}
          type="text"
          className="form-control"
          id="serviceName"
          placeholder="Enter your service Name..."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="userAvailability" className="form-label form-labels">
          User Availability
        </label>
        <input
          ref={availabilityElement}
          type="date"
          className="form-control"
          id="userAvailability"
          placeholder="Enter your User Name..."
          required
        />
      </div>

      

      <div className="mb-3">
        <label htmlFor="serviceDescription" className="form-label form-labels">
          Service Description
        </label>
        <textarea
          ref={serviceDescriptionElement}
          type="text"
          className="form-control"
          id="serviceDescription"
          placeholder="Describe your service..."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label form-labels">
          Pricing
        </label>
        <input
          ref={serviceRateElement}
          type="number"
          className="form-control"
          id="serviceRate"
          placeholder="Hourly rate in €.."
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label form-labels">
          Tags
        </label>
        <input
          ref={serviceTagsElement}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Enter related tags seperated with ,"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create a Service
      </button>
    </form>
  );
}

export default CreatePost;
