import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import stores from './stores';
import Main from './pages/main';

ReactDOM.render((
    <Provider {...stores}>
        <Main/>
    </Provider>
), document.getElementById('app'));