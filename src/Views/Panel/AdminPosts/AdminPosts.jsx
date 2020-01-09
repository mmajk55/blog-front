import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { panelActions } from '../duck';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../../Components/Title/Title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import _ from 'lodash';
import './AdminPosts.scss';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  fixedHeight: {
    height: 240,
  },
});

const AdminPosts = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { posts, loading, error } = useSelector((state) => state.panel);
  const { fetchAdminPosts, deletePost } = panelActions;

  useEffect(() => {
    dispatch(fetchAdminPosts(token))
  }, [])
  
  const deletePostHandler = (postId) => {
    dispatch(deletePost({ postId, token }))
  }

  return (
    <Grid container spacing={3}>
      {
        posts && !loading
          ? _.map(posts, ({ title, date, id }) => (
            <Grid item xs={12} md={6} lg={6} key={id} className='post'>
              <Paper className={fixedHeightPaper}>
                <Title>Post</Title>
                <Typography component="p" variant="h4">
                  {!_.isEmpty(title) &&
                    title 
                  }
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                  {!_.isEmpty(date) &&
                     new Intl.DateTimeFormat('en-EN', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit'
                    }).format(new Date(date)) 
                  }
                </Typography>
                <div className="post-actions">
                  <Link to={`/panel/add-post?editing=true&postId=${id}`}>
                    Edit
                  </Link>
                  <Link to='#' onClick={() => deletePostHandler(id)}>
                    Delete
                  </Link>
                </div>
              </Paper>
            </Grid>
          ))
          : <Grid item xs={12}>
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </Grid>
      }
    </Grid>
  );
}

export default AdminPosts;