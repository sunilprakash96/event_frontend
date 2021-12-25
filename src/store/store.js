import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/root.reducer';

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware()
  )
);

store.subscribe(() => store.getState())

export default store
