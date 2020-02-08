import React from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

const LikeButton = ({
  user: { authenticated, likes },
  likePost,
  unlikePost,
  postId
}) => {
  const likedPost = () => {
    if (likes && likes.find(like => like.postId === postId)) return true;
    else return false;
  };

  const likePosts = () => {
    likePost(postId);
  };
  const unlikePosts = () => {
    unlikePost(postId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={unlikePosts}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likePosts}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
