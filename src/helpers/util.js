/* Utilities 
 *
 * CommonJS styles
 */

/* Check if it is an object like { a: 1, b: 2 }, not function, null, array, etc 
 *
 * @link https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
 */
function isObject( a ) {

    return ( !!a ) && ( a.constructor === Object );
};


function generateRandomString() {

    return Math.random().toString( 36 ).slice( 2 );
}


function setDefault( defaultValue, otherValue ) {
    
    if ( defaultValue === undefined ) {
        
        return otherValue;
    }
    
    return defaultValue;
}


function isDescendant( childElem, parentElem ) {
    
    let node = childElem.parentNode;
    
    while ( node !== null && node.parentNode !== undefined ) {
        
        if ( node === parentElem ) {

            return true;
        }
        
        node = node.parentNode;
    }
    
    return false;
}


function isNotEmptyArray( arg ) {

    return Array.isArray( arg ) && arg.length > 0;
}

module.exports = {

    isDescendant,
    isObject,
    generateRandomString,
    setDefault,
    isNotEmptyArray,
};