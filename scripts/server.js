const webpack = require('webpack');
const {config, common} = require('./webpack.config.js');
if (config.mode === common.ENV_DEV) {
    const express = require('express');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const fallback = require('connect-history-api-fallback');

    const app = express();
    // app.use('public', express.static('dist'));
    app.use(fallback({
        // index: '/app.html',
        rewrites: [
            {from: /^\/jff(\/|$)/, to: '/jff/index.html'},
            {from: /^\/test(\/|$)/, to: '/test/index.html'}
        ]
    }));
    const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(WebpackHotMiddleware(compiler));
    if (common.proxy) {
        const proxyConf = require('./proxy.config.js');
        const proxy = require('http-proxy-middleware');
        Object.entries(proxyConf).forEach(item => app.use(proxy(item[0], item[1])));
    }
    if (common.mock) {
        const mockConf = require('./mock.config.js');
        const Mock = require('mockjs');
        mockConf.forEach(item => app[item.method](item.path, (req, res) => res.send(Mock.mock(item.response(req, res)))));
    }
    let server = app.listen(common.PORT, () => {
        // let host = server.address().address;
        // let port = server.address().port;
        // console.log('app listening at http://%s:%s', host, port);
    });
} else {
    webpack(config, (error, stats) => {
        // show build info to console
        console.log(stats.toString({chunks: false, color: true}));
        // save build info to file
        // fs.writeFile(path.join(common.distPath, '__build_info.log'), stats.toString({color: false}));
    });
}