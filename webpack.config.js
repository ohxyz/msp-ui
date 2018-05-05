var path = require( 'path' );

module.exports = env => {

    let environ = env.environ;
    let componentName = env.component;
    let appName = env.app;
    let outputPath = path.join( __dirname, 'test/dev' );
    let entryPath = './src/app.js';

    if ( environ === 'prod' ) {

        outputPath = path.join( __dirname , 'dist' );
    }

    let outputPathFragment = '';
    let fileName = '';

    if ( environ === 'uat' || environ === 'dev' ) { 

        // Todo: check componentName's actual type, eg. '', undefined or null
        if ( componentName ) {

            componentFolder = path.join( __dirname, 'test', environ, 'components', componentName );

            entryPath = path.join( componentFolder, 'app.js' );
            outputPath = componentFolder;
        }
        else if ( appName ) {

            appFolder = path.join( __dirname, 'test', environ, 'apps', appName );

            entryPath = path.join( appFolder, 'app.js' );
            outputPath = appFolder;
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