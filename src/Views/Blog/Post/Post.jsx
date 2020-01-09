import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { blogActions } from '../duck';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const Post = props => {
  const [postId, setPostId] = useState(undefined);
  const dispatch = useDispatch();
  const post  = useSelector((state) => state.blog.post);

  useEffect(() => {
    const { match } = props;
    const id = _.get(match, 'params.id');
    setPostId(id);
    dispatch(blogActions.fetchSinglePost(postId));
  }, [postId])

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