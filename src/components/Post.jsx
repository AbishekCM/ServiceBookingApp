/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { RiDeleteBinFill } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import { PostList } from "../store/posts-list-store";
import PopupForm from "./ReservationForm";
import ReviewPopup from "./ReviewPopup";

function Post({ post }) {
  const { deletePost, postList } = useContext(PostList);

  const [postReactions, setPostReactions] = useState(post.postReactions);
  const navigate = useNavigate();
  const [stars, setStars] = useState(1);

  function handleClickReaction() {
    setPostReactions(postReactions + 1);
  }

  function handleEditPost(post) {
    navigate("/edit-post", {
      state: { post: post },
    });
  }

  useEffect(() => { 
    starsAverage(); 
  }, [post.reviews.length]);
  
  function starsAverage(){
    let sum=0;
    post.reviews.map((reviews, index) => (
      console.log(reviews.stars),
      sum+=Number(reviews.stars)
    ))
    setStars(Math.ceil(sum/post.reviews.length));
  }

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <span>Service Provider:</span>
        <span style={{ fontWeight: "500", color: "blue" }}>
          '{post.userName}'
        </span>
        <h3 className="card-title">{post.serviceTitle}</h3>
        <p className="card-text">&quot;{post.serviceDescription}&quot;</p>
        <hr />
        <label htmlFor="pricing">Hourly Rate: {post.pricing}€/h</label>
        <br />
        <label htmlFor="pricing">
          Provider Availability: {post.userAvailability}
        </label>
        <br />
        Service Tags#:
        {post.serviceTags.map((tag, index) => (
          <span
            key={index}
            className="badge text-bg-primary hashtag"
          >{`+${tag}+`}</span>
        ))}
        <hr />
        <h5>Reviews-{stars}<ImStarFull />
          </h5>
        {post.reviews.map((reviews, index) => (
          <div key={index}>
            <hr />
            <label htmlFor="username">User: {reviews.user}</label>
            <br />
            <label>Review: "{reviews.description}"</label>
            <p>
              Rating: {reviews.stars}
              <ImStarFull />
            </p>
            <hr />
          </div>
        ))}
        <hr />
        <button
          onClick={() => {
            handleClickReaction();
          }}
          type="button"
          className=" btn btn-warning"
        >
          <AiOutlineLike />
          <span className="badge text-bg-secondary">{postReactions}</span>
        </button>
        <p>Posted At: {post.createdAt}</p>
        <span className="icos" style={{ color: "green" }}>
          <MdEditSquare size={30} onClick={() => {}} />
        </span>
        <span className="icos">
          <RiDeleteBinFill size={30} onClick={() => deletePost(post.postId)} />
        </span>
        <br />
        <br />
        <PopupForm post={post}></PopupForm>
        <br />
        <ReviewPopup post={post}></ReviewPopup>
      </div>
    </div>
  );
}

export default Post;
