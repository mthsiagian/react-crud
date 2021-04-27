import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducer';

const Store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default Store