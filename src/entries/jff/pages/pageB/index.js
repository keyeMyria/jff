import React from 'react';
import {tabWrap} from '../';

@tabWrap('PageB')
export default class extends React.PureComponent {

    render() {
        return (
            <div>
                <div>this is pageB</div>
            </div>
        );
    }
}