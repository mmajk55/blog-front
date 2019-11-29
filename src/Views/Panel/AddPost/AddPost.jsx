import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  const classes = useStyles();

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
        />
        <TextField
          label="Post Content"
          id="standard-full-width"
          placeholder="Content"
          multiline={true}
          rows={2}
          rowsMax={4}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" style={{ margin: 8 }}>
          Add Post
        </Button>
      </div>
    </div>
  );
}

export default AddPost;