import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducers/index';
import { loadState, saveState } from './localStorage';

// const initialState = {},
const middleware = [thunk];
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
