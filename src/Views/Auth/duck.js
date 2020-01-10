import { createAction, createReducer } from "redux-act";
import { persistReducer } from "redux-persist";
import { put, takeEvery, call } from "redux-saga/effects";
import { redirectTo } from "../../utils/index";
import storage from "redux-persist/lib/storage";
import authService from "../../services/authService";
import _ from "lodash";

const login = createAction("Login request");
const loginSuccess = createAction("Login success");
const loginFailure = createAction("Login failure");
const logout = createAction("Logout request");
const logoutSuccess = createAction("Logout success");

const register = createAction("Register request");
const registerSuccess = createAction("Register success");
const registerFailure = createAction("Register failure");

export const authorizationActions = {
  login,
  logout,
  register,
};

const initialState = {
  token: undefined,
  userName: undefined,
  errorMsg: undefined,
  loading: undefined
};

const authorizationPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "expiryDate"]
};

export const authorizationReducer = persistReducer(
  authorizationPersistConfig,
  createReducer(
    {
      [login]: state => ({
        ...state,
        loading: true
      }),
      [loginSuccess]: (state, { token, expiryDate, userName }) => ({
        ...state,
        token,
        expiryDate,
        userName,
        errorMsg: null,
        loading: false
      }),
      [loginFailure]: (state, payload) => ({
        ...state,
        errorMsg: payload,
        loading: false
      }),
      [logoutSuccess]: () => initialState,
      [login]: state => ({
        ...state,
        loading: true
      }),
      [registerSuccess]: (state) => ({
        ...state,
        errorMsg: null,
        loading: false
      }),
      [registerFailure]: (state, payload) => ({
        ...state,
        errorMsg: payload,
        loading: false
      }),
    },
    initialState
  )
);

export function* onLogin({ payload }) {
  try {
    const { data } = yield call(authService.loginUser, payload);

    yield put(loginSuccess(data));
    yield call(redirectTo, '/panel');
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    yield put(loginFailure(errorType));
  }
}

export function* onLogout() {
  yield put(logoutSuccess());
}

export function* onRegister({ payload }) {
  try {
    const { data } = yield call(authService.registerUser, payload);
    
    yield put(registerSuccess(data));
    yield call(redirectTo, '/login');
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    yield put(registerFailure(errorType));
  }
}

export const authorizationSagas = [
  takeEvery(login, onLogin),
  takeEvery(logout, onLogout),
  takeEvery(register, onRegister)
];
