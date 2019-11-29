import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const Post = props => {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography component="h2" variant="h5">
          Featured post
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Nov 12
        </Typography>
        <Typography variant="subtitle1" paragraph>
          This is a wider card with supporting text below as a natural lead-in to additional content.',
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default Post;