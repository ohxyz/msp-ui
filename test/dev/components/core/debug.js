const HierarchyStorage = require( '../../../../src/components/core/hierarchy-storage.js' ).HierarchyStorage;

let dummySapObject = require( '../../dummies/sap.json' );
let storage = new HierarchyStorage( dummySapObject );

storage.process();

