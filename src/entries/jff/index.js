import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import route from './routes/index';
import history from './routes/history';

ReactDOM.render((
    <Router history={history}>
        <Switch>
            {route.children.map(item => <Route key={item.path} path={item.path} component={item.component}
                                               exact={item.exact || false}/>)}
            <Redirect to={route.redirect}/>
        </Switch>
    </Router>
), document.getElementById('app'));
