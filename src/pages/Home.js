import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

const Home = ({ getPosts, data: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  let recentPostsMarkup = !loading ? (
    posts.map(post => <Post key={post.postId} post={post} />)
  ) : (
    <PostSkeleton />
  );

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentPostsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(Home);
