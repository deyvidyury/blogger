import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_Show';
import PostsEdit from './components/posts_edit';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
          <Route path="/posts/edit/:id" component={PostsEdit} />
    			<Route path="/posts/new" component={PostsNew} />
    			<Route path="/post/:id" component={PostsShow} />
	    		<Route path="/" component={PostsIndex} />
    		</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
