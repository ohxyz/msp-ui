/* Data types only used in the component */

const util = require( '../core/util.js' );

class SearchItem {

    constructor( arg ) {

        this.name = '';
        this.content = '';
        this.value = null;

        let type = typeof arg;

        // Todo: check null
        if ( type === 'string'
                || type === 'number'
                || type === 'boolean' ) {

            this.content = arg.toString();
        }
        else if ( util.isObject( arg ) === true || arg instanceof SearchItem === true ) {

            // shallow copy
            let copy = Object.assign( { 

                name: '',
                content: '',
                value: null,

            }, arg );

            this.name = copy.name;
            this.content = copy.content.toString();
            this.value = copy.value;
        }
    }
}


function makeSearchItemsByItems( items ) {

    if ( Array.isArray( items ) === false ) {

        return [];
    }

    let searchItems = items.map( item => {

        return new SearchItem( item );
    } );

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


function makeSearchItems( items, fields ) {

    if ( Array.isArray( fields ) === true && fields.length > 0 ) {

        return makeSearchItemsByFields( items, fields );
    }

    return makeSearchItemsByItems( items );

}

module.exports = {

    SearchItem,
    makeSearchItems,
    makeSearchItemsByItems,
    makeSearchItemsByFields,
};