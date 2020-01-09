import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { panelActions } from '../duck';
import { blogActions } from '../../Blog/duck';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';
import queryString from 'query-string';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AddEditPost = ({ location }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingState, setEditingState] = useState({
    postId: undefined,
    editing: false
  });
  const classes = useStyles();

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const editedPost  = useSelector((state) => state.blog.post);
  const { post, loading, error } = useSelector((state) => state.panel);
  const { postId, editing } = editingState;
  const { fetchSinglePost } = blogActions;
  const { addPost, editPost } = panelActions;

  useEffect(() => {
    if (_.isEmpty(location.search)) {
      return;
    }
    const paramsString = queryString.parse(location.search);
    const { editing, postId } = paramsString;
    setEditingState(prevState => ({
      ...prevState,
      postId,
      editing
    }))
    getPost(postId);
  }, [location.search])

  useEffect(() => {
    if (editedPost) {
      setTitle(editedPost.title);
      setContent(editedPost.content);
    }
  }, [editedPost]);

  const titleHandler = ({ target }) => {
    setTitle(_.get(target, 'value'));
  }

  const contentHandler = ({ target }) => {
    setContent(_.get(target, 'value'));
  }

  const addPostHandler = () => {
    const post = {
      title,
      content,
      token
    }
    dispatch(addPost(post));
  }

  const updatePostHandler = () => {
    const post = {
      title,
      content,
      token,
      postId
    }
    dispatch(editPost(post))
  }

  const getPost = postId => {
    dispatch(fetchSinglePost(postId));
  }

  return (
    <div className={classes.container}>
      <div>
        <TextField
          id="standard-full-width"
          label="Post Title"
          style={{ margin: 8 }}
          placeholder="Title"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={titleHandler}
          value={title}
        />
        <TextField
          label="Post Content"
          id="standard-full-width"
          placeholder="Content"
          multiline={true}
          rows={5}
          rowsMax={10}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          onChange={contentHandler}
          value={content}
        />
        {
          editing
            ? <Button
                variant="contained"
                color="primary"
                style={{ margin: 8 }}
                onClick={updatePostHandler}
                >
                Update Post
            </Button>
            : <Button
                variant="contained"
                color="primary"
                style={{ margin: 8 }}
                onClick={addPostHandler}>
                Add Post
          </Button>
        }
        {
          loading &&
          <Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
          />
        }
      </div>
    </div>
  );
}

export default AddEditPost;