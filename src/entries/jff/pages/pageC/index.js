import React from 'react';
import {tabWrap} from "../index";

@tabWrap(({match, location, history}) => 'PAGEC')
export default class extends React.PureComponent {

    render() {
        return (
            <div>
                <div>this is pageC</div>
            </div>
        );
    }
}