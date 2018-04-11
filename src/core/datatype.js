/* Collection of definition of data types and structures 
 *
 * CommonJS styles eg. require, module.exports
 *
 * US English style eg. organisation
 */
const util = require( './util.js' );

class UserProfile {

    constructor( arg ) {

        this.name = '';
        this.org = '';

        let type = typeof arg;

        if ( type === 'string'
                || type === 'number'
                || type === 'boolean' ) {

            this.name = arg;
        }
        else if ( util.isObject( arg ) === true ) {

            let clone = Object.assign( { 

                name: '',
                org: ''

            }, arg );

            this.name = clone.name;
            this.org = clone.org;
        }
    }
}

module.exports = {

    UserProfile
};