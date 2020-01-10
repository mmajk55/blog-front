import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { blogActions } from '../duck';
import { Editor } from '@tinymce/tinymce-react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import './Post.scss';


const Post = props => {
  const [postId, setPostId] = useState(undefined);
  const [commentContent, setCommentContent] = useState(undefined);
  const [displayError, setDisplayError] = useState({
    open: false,
    Transition: Fade,
  });
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.blog.post);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const { match } = props;
    const id = _.get(match, 'params.id');
    setPostId(id);
    dispatch(blogActions.fetchSinglePost(postId));

    return () => {
      setDisplayError({
        open: false,
        Transition: Fade
      })
    };
  }, [postId])

  const handleClose = () => {
    setDisplayError({
      ...displayError,
      open: false,
    });
  };

  const handleEditorChange = ({ target }) => {
    setCommentContent(target.getContent());
  }

  const addCommentHandler = () => {
    if (!token) {
      setError('You must be logged in to add comment');
      setDisplayError({
        open: true,
        Transition: Fade
      })
    }
    if (!commentContent) {
      setError('You must write something');
      setDisplayError({
        open: true,
        Transition: Fade
      })
    }
    const data = {
      token,
      postId,
      commentContent
    }
    dispatch(blogActions.addComment(data));
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
        <Typography variant="subtitle1" paragraph>
          Author:
          {!_.isEmpty(post) &&
            post.creator.name + ' ' + post.creator.lastName
          }
        </Typography>
        <div className="comments">
          <Typography component="h2" variant="h5">
            Comments:
            {
              !_.isEmpty(post) &&
                _.map(post.comments, ({ commentContent, author }) => (
                  <div className="comment">
                    <div dangerouslySetInnerHTML={{ __html: commentContent }} className="comment-content" />
                    <span className="author">Author: {author.name} {author.lastName}</span>
                  </div>
                ))
            }
          </Typography>
          <div className="add-comment">
            <Typography component="h2" variant="subtitle2">
              Add comment:
            </Typography>
            <Editor
              initialValue="<p>Add comment</p>"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright alignjustify |'
              }}
              onChange={handleEditorChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 8 }}
              onClick={addCommentHandler}
            >
              Add comment
            </Button>
          </div>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={displayError.open}
        onClose={handleClose}
        variant="error"
        TransitionComponent={displayError.Transition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{error}</span>}
      />
    </React.Fragment>
  )
}

export default Post;