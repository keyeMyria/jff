const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const antdTheme = require('./theme-antd');
const rootPath = path.resolve(__dirname, '..');
const srcPath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');

let entriesPath = path.join(srcPath, 'entries');
const entries = fs.readdirSync(entriesPath)
    .reduce((pre, child) => {
        let childPath = `${entriesPath}/${child}`;
        let info = fs.statSync(childPath);
        if (info.isDirectory() && fs.readdirSync(childPath).includes('index.js') && fs.readdirSync(childPath).includes('index.html')) {
            pre.push({name: child, path: childPath});
        }
        return pre;
    }, []);

console.log('\x1b[36m', 'the entries are', ...entries.map(item => `\n${item.name}: ${item.path}`), '\x1b[0m');

const common = {PORT: 9000, ENV_PRO: 'production', ENV_DEV: 'development', proxy: false, mock: true, distPath};

const {ENV_PRO, ENV_DEV} = common;
const isDev = process.env.NODE_ENV === ENV_DEV;
const mode = isDev ? ENV_DEV : ENV_PRO;

const config = {
    mode,
    node: {
        __filename: true,
        fs: 'empty'
    },
    entry: entries.reduce((pre, cur) => {
        pre[cur.name] = [path.join(cur.path, 'index.js')];
        return pre;
    }, {}),
    resolve: {
        extensions: [
            '.js', '.jsx'
        ], // 此选项不再需要传一个空字符串。
        alias: {
            ENTRIES: path.resolve(srcPath, 'entries'),
            COMPONENTS: path.resolve(srcPath, 'components'),
            UTILS: path.resolve(srcPath, 'utils'),
            EXCEPTION: path.resolve(srcPath, 'exception')
        }
    },
    resolveLoader: {
        modules: ['src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: srcPath,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDev,
                        plugins: [
                            ["import", [
                                {libraryName: "antd-mobile", style: true},
                                {libraryName: "antd", style: true}
                            ]]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                    `less-loader?{"modifyVars":${JSON.stringify(antdTheme)},"javascriptEnabled":true,"sourceMap":true}`
                ]
            },
            {test: /\.(png|svg|jpe?g|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {test: /\.(csv|tsv)$/, use: ['csv-loader']},
            {test: /\.xml$/, use: ['file-loader']}
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Don't use hash in development, we need the persistent for "renderHtml.js"
            filename: isDev ? '[name].css' : '[name].[chunkhash:8].css',
            chunkFilename: isDev ? '[name].chunk.css' : '[name].[chunkhash:8].chunk.css'
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpackConfig.DefinePlugin({
            __APP_ID__: '123'
        })
    ]
};
entries.forEach(item => config.resolve.alias[item.name.toUpperCase()] = path.join(entriesPath, item.name));
if (isDev) {
    entries.forEach(item => config.entry[item.name].push('webpack-hot-middleware/client?reload=true'));
    config.output = {
        filename: '[name].[hash:6].js',
        chunkFilename: '[name].[hash:6].chunk.js',
        publicPath: '/'
    };
    config.devtool='eval-source-map';
    config.module.rules
        .push({
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            exclude: /(node_modules|bower_components|\.spec\.js)/,
            use: [
                {
                    loader: 'eslint-loader',
                    options: {
                        failOnWarning: false,
                        failOnError: true
                    }
                }
            ]
        });
    config.plugins.push(
        new webpackConfig.HotModuleReplacementPlugin(),
        new webpackConfig.NoEmitOnErrorsPlugin(),
        new BrowserSyncPlugin({
            host: '127.0.0.1',
            port: common.PORT,
            proxy: `http://127.0.0.1:${common.PORT}/`,
            logConnections: false,
            startPath: entries[0].name,
            notify: false
        }, {reload: false})
    );
    config.plugins.push(...entries.map(item => new HtmlWebpackPlugin({
        title: item.name,
        filename: `${item.name}/index.html`,
        template: path.join(item.path, 'index.html'),
        chunks: [item.name],
        chunksSortMode: 'none'
    })));
} else {
    config.output = {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.join(distPath, 'static'),
        publicPath: '../static/' // 相对于 html页面
    };
    config.optimization = {
        // runtimeChunk: true,
        runtimeChunk: {name: "manifest"},
        splitChunks: {
            chunks: 'async',
            // name: false,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    };
    config.plugins.push(
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        new CleanWebpackPlugin('dist', {root: rootPath, verbose: false})
    );
    config.plugins.push(...entries.map(item => new HtmlWebpackPlugin({
        title: item.name,
        filename: `../${item.name}/index.html`,
        template: path.join(item.path, 'index.html'),
        chunks: [item.name, 'vendors', 'manifest'],
        chunksSortMode: "none",
        minify: {
            caseSensitive: true,
            collapseWhitespace: true,
            removeComments: true
        }
    })));
}

module.exports.config = config;
module.exports.common = common;