import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorizationActions } from '../duck';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Login = () => {
  const [loginState, setLoginState] = useState({
    email: undefined,
    password: undefined
  });
  const [displayError, setDisplayError] = useState({
    open: false,
    Transition: Fade,
  });
  const [error, setError] = useState(undefined);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const { errorMsg, loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMsg) {
      setError(errorMsg);
      setDisplayError({
        open: true,
        Transition: Fade
      })
    }
    return () => {
      setDisplayError({
        open: false,
        Transition: Fade
      })
    };
  }, [errorMsg, loginStatus]);

  const loginHandler = () => {
    const { email, password } = loginState;
    dispatch(authorizationActions.login({ email, password }));
  }

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setLoginState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleClose = () => {
    setDisplayError({
      ...displayError,
      open: false,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => inputHandler(event, 'email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => inputHandler(event, 'password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
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
    </Container>
  );
}

export default Login;