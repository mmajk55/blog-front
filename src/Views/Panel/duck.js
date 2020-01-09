import { createAction, createReducer } from "redux-act";
import { put, takeEvery, call } from "redux-saga/effects";
import { redirectTo } from "../../utils/index";
import panelService from "../../services/panelService";
import _ from "lodash";

const fetchAdminPosts = createAction("Fetch posts");
const fetchAdminPostsSuccess = createAction("Fetch posts success");
const fetchAdminPostsFailure = createAction("Fetch posts failure");

const addPost = createAction("Add post");
const addPostSuccess = createAction("Add post success");
const addPostFailure = createAction("Add post failure");

const editPost = createAction("Edit posts");
const editPostSuccess = createAction("Edit posts success");
const editPostFailure = createAction("Edit posts failure");

const deletePost = createAction("Fetch post");
const deletePostSuccess = createAction("Fetch post success");
const deletePostFailure = createAction("Fetch post failure");

export const panelActions = {
  fetchAdminPosts,
  fetchAdminPostsSuccess,
  fetchAdminPostsFailure,
  addPost,
  addPostSuccess,
  addPostFailure,
  editPost,
  editPostSuccess,
  editPostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure
};

const initialState = {
  posts: undefined,
  post: undefined,
  loading: false,
  error: undefined
};

export const panelReducer = createReducer(
  {
    [fetchAdminPosts]: state => ({
      ...state,
      loading: true
    }),
    [fetchAdminPostsSuccess]: (state, { posts }) => ({
      ...state,
      posts,
      loading: false
    }),
    [fetchAdminPostsFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    }),
    [addPost]: state => ({
      ...state,
      loading: true
    }),
    [addPostSuccess]: (state, post) => ({
      ...state,
      posts: [post, ...state.posts],
      loading: false
    }),
    [addPostFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    }),
    [editPost]: state => ({
      ...state,
      loading: true
    }),
    [editPostSuccess]: (state, post) => ({
      ...state,
      posts: [...state.posts, post],
      loading: false
    }),
    [editPostFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    }),
    [deletePost]: state => ({
      ...state,
      loading: true
    }),
    [deletePostSuccess]: (state, { postId }) => ({
      ...state,
      posts: _.filter(state.posts, post => post.id !== postId),
      loading: false
    }),
    [deletePostFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    })
  },
  initialState
);

export function* onFetchAdminPosts({ payload }) {
  try {
    const { data } = yield call(panelService.fetchAdminPosts, payload)

    yield put(fetchAdminPostsSuccess(data));
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    yield put(fetchAdminPostsFailure(errorType));
  }
}

export function* onAddPost({ payload }) {
  try {
    const { data } = yield call(panelService.addPost, payload);

    yield put(addPostSuccess(data));
    yield call(redirectTo, '/panel');
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");

    yield put(addPostFailure(errorType));
  }
}

export function* onEditPost({ payload }) {
  try {
    const { data } = yield call(panelService.editPost, payload);

    yield put(editPostSuccess(data));
    yield call(redirectTo, '/panel');
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");

    yield put(addPostFailure(errorType));
  }
}

export function* onDeletePost({ payload }) {
  try {
    yield call(panelService.deletePost, payload); 

    yield put(deletePostSuccess(payload));
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    
    yield put(deletePostFailure(errorType));
  }
}

export const panelSagas = [
  takeEvery(fetchAdminPosts, onFetchAdminPosts),
  takeEvery(addPost, onAddPost),
  takeEvery(editPost, onEditPost),
  takeEvery(deletePost, onDeletePost)
];
