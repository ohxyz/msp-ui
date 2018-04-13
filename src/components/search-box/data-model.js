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
            this.content = clone.content.toString();
        }
    }
}


function makeSearchItems( items ) {

    if ( Array.isArray( items ) === false ) {

        return [];
    }

    let searchItems = items.map( item => new SearchItem( item ) );

    return searchItems;
}

/* @example
 *  
 * @param {Array of JSON like object } eg.
 *         
 *     [ { first: 'name',  next: 'address',  last: 'number'  }
 *       { first: 'name2', next: 'address2', last: 'number2' } ]
 *
 * @param {Array of String } eg. 
 *         
 *     [ 'first', 'last' ]
 * 
 * @returns {Array of SeachItem } eg.
 *
 *     [ { name: 'first', content: 'name' },
 *       { name: 'last',  content: 'number'},
 *       { name: 'first', content: 'name2' },
 *       { name: 'last', content: 'number2'} ]
 */

function makeSearchItemsByFields( items, fields ) {

    if ( Array.isArray( fields ) !== true
            || fields.length === '' ) {

        return makeSearchItems( items );
    }

    let searchItems = [];

    items.map( item => {

        fields.map( fieldName => { 

            if ( item.hasOwnProperty( fieldName ) === false ) {

                return ;
            }

            let searchItem = new SearchItem( { 

                name: fieldName,
                content: item[ fieldName ]

            } );

            searchItems.push( searchItem );

        } );

    } );

    return searchItems;
}

module.exports = {

    SearchItem,
    makeSearchItems,
    makeSearchItemsByFields,
};