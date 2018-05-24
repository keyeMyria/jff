import React from 'react';
import {tabWrap} from '../';

@tabWrap('OverView')
export default class extends React.PureComponent {

    render() {
        return (
            <div>
                <div>this is OverView Page</div>
            </div>
        );
    }
}