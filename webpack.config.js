var path = require( 'path' );

module.exports = {

    entry: './src/app.js',

    output: {

        path: path.join( __dirname , 'dist' ),

        filename: 'bundle.js'
    },

    module: {
        
        rules: [ 

            {
                test: /\.js[x]{0,1}$/,

                exclude: /(node_modules|bower_components)/,

                use: {

                    loader: 'babel-loader',

                    options: {

                        presets: [ 'react', 'env' ]
                    }
                }
            }, 

            { 
                test: /\.less$/,

                use: [ 

                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            } 
        ]
    }
};