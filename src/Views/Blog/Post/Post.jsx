import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const Post = props => {
  const [post, setPost] = useState(undefined);
  const [postId, setPostId] = useState(undefined);

  useEffect(() => {
    const { match } = props;
    const id = _.get(match, 'params.id');
    setPostId(id);
    getPost();
  }, [postId])

  const getPost = async () => {
    try {
      if (!_.isEmpty(postId)) {
        const { data: { post } } = await axios.get(`http://localhost:8000/blog/post/${postId}`);
        setPost(post);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h5">
          {!_.isEmpty(post) &&
            post.title
          }
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {!_.isEmpty(post) &&
            new Intl.DateTimeFormat('en-EN', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(post.date))
          }
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {!_.isEmpty(post) &&
            post.content
          }
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default Post;