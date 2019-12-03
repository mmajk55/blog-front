import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
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

const AddPost = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [postId, setPostId] = useState(undefined);

  useEffect(() => {
    if (_.isEmpty(props.location.search)) {
      return;
    }
    const paramsString = queryString.parse(props.location.search);
    const { editing, postId } = paramsString;
    setEditing(editing); 
    setPostId(postId);
    getPost(postId);
  }, [props.location.search])

  const classes = useStyles();

  const titleHandler = ({ target }) => {
    setTitle(_.get(target, 'value'));
  }

  const contentHandler = ({ target }) => {
    setContent(_.get(target, 'value'));
  }

  const addPost = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/blog/post', 
        { title, content },
        { headers: {
          Authorization: 'Bearer ' + props.token
        }}
      );
      setLoading(false);
      setContent('');
      setTitle('');
      props.history.push('/panel/dashboard');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const updatePost = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/blog/update-post/${postId}`, { title, content });
      setLoading(false);
      props.history.push('/panel/dashboard');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  const getPost = async postId => {
    setLoading(true);
    try {
      const { data: { post } } = await axios.get(`http://localhost:8000/blog/post/${postId}`);
      const title = _.get(post, 'title');
      const content = _.get(post, 'content');
      setLoading(false);
      setContent(content);
      setTitle(title);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
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
                onClick={updatePost}>
                Update Post
            </Button>
            : <Button
                variant="contained"
                color="primary"
                style={{ margin: 8 }}
                onClick={addPost}>
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

export default AddPost;