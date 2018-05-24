import React from 'react';
import {Link} from 'react-router-dom';

export default class NotFound extends React.Component {
    render() {
        return (
            <main className="">
                <h3>Page not found. Are you lost ?</h3>
                <Link to="/app">APP</Link>
                <Link to="/oa">OA</Link>
                <Link to="/workbench">WORKBENCH</Link>
            </main>
        );
    }
}