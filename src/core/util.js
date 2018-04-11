/* Utilities */


/* Check if it is an object like { a: 1, b: 2 }, not function, null, array, etc 
 *
 * @link https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
 */
function isObject( a ) {

    return ( !!a ) && ( a.constructor === Object );
};

module.exports {

    isObject,
};