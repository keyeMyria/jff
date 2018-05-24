import React from 'react';

export default class MapView extends React.Component {
    mapId = this.props.id;
    className = this.props.className;
    onMapLoad = this.props.onMapLoad;

    componentWillMount() {
        if (!window.BMap) {
            let script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = "//api.map.baidu.com/api?v=3.0&ak=QHynSQY5ydNPdQUmhrtqvqbylKxovu9O&callback=init";
            document.body.appendChild(script);
        }
    }

    componentDidMount() {
        let times = 18;
        this.load = setInterval(() => {
            times--;
            if (window.BMap || times < 0) {
                if (window.BMap) this.onMapLoad(window.BMap);
                clearInterval(this.load);
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.load) {
            clearInterval(this.load);
            this.load = null;
        }
    }

    render() {
        return <div id={this.mapId} className={this.className ? this.className : ''}/>;
    }
}