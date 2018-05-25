import React from 'react';
import {Link} from 'react-router-dom';
import {tabWrap} from "../index";

@tabWrap('多编辑页')
export default class extends React.PureComponent {

    render() {

        return (
            <div>
                <div>this is pageA</div>
                <div>
                    <Link to={'/jff/pageA/step1'}>step1</Link>
                </div>
                <div>
                    <Link to={'/jff/pageA/step2'}>step2</Link>
                </div>
            </div>
        );
    }
}