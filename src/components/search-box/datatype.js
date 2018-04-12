/* Data types only used in the component */

const util = require( '../../core/util.js' );

class SearchItem {

    constructor( arg ) {

        this.name = '';
        this.content = '';

        let type = typeof arg;

        // Todo: check null
        if ( type === 'string'
                || type === 'number'
                || type === 'boolean' ) {

            this.content = arg.toString();
        }
        else if ( util.isObject( arg ) === true ) {

            let clone = Object.assign( { 

                name: '',
                content: ''

            }, arg );

            this.name = clone.name;
            this.content = clone.content;
        }
    }
}

module.exports = {

    SearchItem
};