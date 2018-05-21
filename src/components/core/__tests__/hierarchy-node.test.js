const HierarchyNode = require( '../hierarchy-node.js' ).HierarchyNode;
const dummySapObject = require( '../__mocks__/sap.stub.json' );

describe( 'HierarchyNode', () => {

    let rawNodes = dummySapObject.d.results;
    let hNodes = rawNodes.map( node => new HierarchyNode( node ) );

    test( 'has 1 user at index 3', () => { 

        let node = hNodes[ 3 ];
        expect( node.users.length ).toBe( 1 );

    } );

    test( 'has 6 users at index 9', () => { 

        let node = hNodes[ 9 ];
        expect( node.users.length ).toBe( 6 );

    } );

} );