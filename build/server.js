const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const fallback = require('connect-history-api-fallback');
const {config, common} = require('./webpack.config.js');

if (config.mode === common.ENV_DEV) {
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