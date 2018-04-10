var path = require( 'path' );

module.exports = env => {

    console.log( '********', env );

    let environ = env.env;
    let outputPath = path.join( __dirname, 'dist' );
    let entryPath = './src/app.js';

    if ( environ === 'prod' ) {

        outputPath = path.join( __dirname , dist );
    }


    let outputPathFragment = '';
    let fileName = '';

    if ( env.component && environ === 'dev' ) {

        componentFolder = path.join( __dirname, 'test', 'dev', 'components', env.component );
        fileName = env.component + '.js';

        entryPath = path.join( componentFolder, env.component + '.js' );
        outputPath = componentFolder;
    }

    console.log( '[Entry path]', entryPath );
    console.log( '[Output path]', outputPath );

    return {

        entry: entryPath,

        output: {

            path: outputPath,

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


};