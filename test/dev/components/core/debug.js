const HierarchyStorage = require( '../../../../src/components/core/hierarchy-storage.js' ).HierarchyStorage;
const dummySapObject = require( '../../dummies/sap.js' ).dummySapObject;

let storage = new HierarchyStorage( dummySapObject );

storage.process();

