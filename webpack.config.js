var path = require( 'path' );

module.exports = env => {

    let environ = env.environ;
    let componentName = env.component;
    let outputPath = path.join( __dirname, 'dist' );
    let entryPath = './src/app.js';

    if ( environ === 'prod' ) {

        outputPath = path.join( __dirname , dist );
    }

    let outputPathFragment = '';
    let fileName = '';

    // Todo: check componentName's actual type, eg. '', undefined or null
    if ( componentName ) {

        if ( environ === 'uat' || environ === 'dev' ) {

            componentFolder = path.join( __dirname, 'test', environ, 'components', componentName );
            fileName = componentName + '.js';

            entryPath = path.join( componentFolder, componentName + '.js' );
            outputPath = componentFolder;
        }
    }

    console.log( '[Entry path]  ', entryPath );
    console.log( '[Output path] ', outputPath );

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