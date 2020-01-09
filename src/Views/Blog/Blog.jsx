import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { authorizationActions } from '../Auth/duck'
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';
import Post from './Post/Post';
import Signup from '../Auth/Signup/Signup';
import Login from '../Auth/Login/Login';
import './Blog.scss';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));


const Blog = ({ history }) => {
  const classes = useStyles();
  const { token, expiryDate } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(authorizationActions.logout())
    history.push('/')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {token && <Link to='/panel/dashboard'>
            <Button size="small">Panel</Button>
          </Link>}
          <Link
            to='/'
            noWrap
            className={classes.toolbarTitle}
          >
            <Typography
              component="h2"
              variant="h5"
              color="textPrimary"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              Blog
            </Typography>
          </Link>
          {
            !token
              ? <React.Fragment>
                <Link to='/signup'>
                  <Button color="secondary" size="small">
                    Sign up
                  </Button>
                </Link>
                <Link to='/login'>
                  <Button color="secondary" size="small">
                    Login
                  </Button>
                </Link>
              </React.Fragment>
              : <Button onClick={logoutHandler}>Logout</Button>
          }
        </Toolbar>
        <main className='blog'>
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            <Switch>
              <Route path='/post/:id' component={Post} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/' component={FeaturedPosts} />
            </Switch>
          </Grid>
        </main>
      </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Container>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Blog;