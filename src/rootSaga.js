import { all } from 'redux-saga/effects';
import { authorizationSagas } from './Views/Auth/duck';
import { blogSagas } from './Views/Blog/duck';
import { panelSagas } from './Views/Panel/duck';

export default function* rootSaga() {
  yield all([
    ...authorizationSagas,
    ...blogSagas,
    ...panelSagas
  ]);
}
