import { combineReducers } from 'redux';
import { authorizationReducer } from './Views/Auth/duck';
import { blogReducer } from './Views/Blog/duck';
import { panelReducer } from './Views/Panel/duck';

const appReducer = combineReducers({
    auth: authorizationReducer,
    blog: blogReducer,
    panel: panelReducer
});

export default (state, action) => appReducer(state, action);
