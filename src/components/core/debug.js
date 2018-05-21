const HierarchyNode = require( './hierarchy-node.js' ).HierarchyNode;
const dummySapObject = require( './__mocks__/sap.stub.json' );
const HierarchyStorage = require( './hierarchy-storage.js' ).HierarchyStorage;

let storage = new HierarchyStorage( dummySapObject );

storage.process();

console.log( storage );

console.log( 'End' );
