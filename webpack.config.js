const path = require('path');

module.exports = {
    entry: './upload/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'stylus-loader'
                },
            ],
        }]
    }
};
