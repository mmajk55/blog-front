import { createAction, createReducer } from "redux-act";
import { put, takeEvery, call } from "redux-saga/effects";
import blogService from "../../services/blogService";
import axios from "axios";
import _ from "lodash";

const fetchPosts = createAction("Fetch posts");
const fetchPostsSuccess = createAction("Fetch Posts success");
const fetchPostsFailure = createAction("Fetch Posts failure");

const fetchSinglePost = createAction("Fetch post");
const fetchSinglePostSuccess = createAction("Fetch Post success");
const fetchSinglePostFailure = createAction("Fetch Post failure");

export const blogActions = {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchSinglePost,
  fetchSinglePostSuccess,
  fetchSinglePostFailure,
};

const initialState = {
  posts: undefined,
  post: undefined,
  loading: false,
  error: undefined
};

export const blogReducer = createReducer(
  {
    [fetchPosts]: state => ({
      ...state,
      loading: true
    }),
    [fetchPostsSuccess]: (state, { posts }) => ({
      ...state,
      posts,
      loading: false
    }),
    [fetchPostsFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    }),
    [fetchSinglePost]: state => ({
      ...state,
      loading: true
    }),
    [fetchSinglePostSuccess]: (state, { post }) => ({
      ...state,
      post,
      loading: false
    }),
    [fetchSinglePostFailure]: (state, payload) => ({
      ...state,
      error: payload,
      loading: false
    }),
  },
  initialState
);

export function* onFetchPosts() {
  try {
    const { data } = yield call(blogService.fetchPosts);

    yield put(fetchPostsSuccess(data));
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    yield put(fetchPostsFailure(errorType));
  }
}

export function* onFetchSinglePost({ payload }) {
  try {
    const postId = payload;
    if (postId) {
      const { data } = yield call(blogService.fetchSinglePost, postId);
      
      yield put(fetchSinglePostSuccess(data));
    }
  } catch (error) {
    const errorType = _.get(error, "response.data.message", "unknown-error");
    yield put(fetchSinglePostFailure(errorType));
  }
}

export const blogSagas = [
  takeEvery(fetchPosts, onFetchPosts),
  takeEvery(fetchSinglePost, onFetchSinglePost)
];
