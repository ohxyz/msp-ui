const SapNode = require( '../../../../../src/components/core/sap-node.js' ).SapNode;
const dummySapObject = require( './dummy-sap.js' ).dummySapObject;

describe( 'SapNode', () => {

    let nodes = dummySapObject.d.results;
    let sapNodes = nodes.map( node => new SapNode( node ) );

    test( 'has no users in index 3', () => { 

        let node = sapNodes[ 3 ];
        expect( node.users.length ).toBe( 0 );

    } );

    test( 'has one org in index 5', () => { 

        let node = sapNodes[ 5 ];
        expect( node.orgs.length ).toBe( 1 );

    } );

} );