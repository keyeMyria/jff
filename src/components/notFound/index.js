import React from 'react';
import {Link} from 'react-router-dom';

export default class NotFound extends React.Component {
    render() {
        return (
            <main className="">
                <h3>Page not found. Are you lost ?</h3>
                <div>
                    <Link to="/jff">记返费</Link>
                </div>
                <div>
                    <Link to="/test">TEST</Link>
                </div>
            </main>
        );
    }
}