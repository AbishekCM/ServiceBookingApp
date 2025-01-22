/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { ImStarFull } from "react-icons/im";
import { PostList } from "../store/posts-list-store";

function ReviewPopup({ post }) {
  const { addReviews, postList, setPostList } = useContext(PostList);
  const [showPopup, setShowPopup] = useState(false);

  const customerNameElement = useRef();
  const customerEmailElement = useRef();

  const reviewDescElement = useRef();
  const [stars, setStars] = useState(1);

  const starsChanged = (e) => {
    setStars(e.target.value);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const customerName = customerNameElement.current.value;
    const customerEmail = customerEmailElement.current.value;
    const reviewDesc = reviewDescElement.current.value;

    const review = {
      user: customerName,
      email: customerEmail,
      description: reviewDesc,
      stars: stars,
    };

    addReviews(review, post.postId);

    setShowPopup(false); // Close the popup after submission
  };

  return (
    <div>
      <button onClick={openPopup}>Review/Rate</button>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>Service Review Form</h2>
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="bookedService">
                <b>Service Choosen: </b>
                {post.serviceTitle}
              </label>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="userName">User Name:</label>
                <br />
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  required
                  ref={customerNameElement}
                  placeholder="enter your userName..."
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  ref={customerEmailElement}
                  placeholder="enter your email..."
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="reservationDay">Review Description: </label>
                <br />
                <textarea
                  name="reviewDesc"
                  id="reviewDesc"
                  rows={3}
                  cols={23}
                  placeholder="write your review..."
                  ref={reviewDescElement}
                ></textarea>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="email">
                  Rating: {stars} <ImStarFull />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={starsChanged}
                    style={{ width: "100%" }}
                  />
                </label>
              </div>

              <div style={{ marginTop: "20px" }}>
                <button type="submit">Confirm</button>
                <button
                  type="button"
                  onClick={closePopup}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for overlay and popup
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "500px",
  textAlign: "center",
};

export default ReviewPopup;
