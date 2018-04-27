const HierarchyNode = require( '../../../../../src/components/core/hierarchy-node.js' ).HierarchyNode;
const dummySapObject = require( './dummy-sap.js' ).dummySapObject;

describe( 'HierarchyNode', () => {

    let rawNodes = dummySapObject.d.results;
    let hNodes = rawNodes.map( node => new HierarchyNode( node ) );

    test( 'has no users in index 3', () => { 

        let node = hNodes[ 3 ];
        expect( node.users.length ).toBe( 0 );

    } );

    test( 'has one org in index 5', () => { 

        let node = hNodes[ 5 ];
        expect( node.orgs.length ).toBe( 1 );

    } );

    test( 'can assign orgName to users', () => { 

        let node = hNodes[ 5 ];
        expect( node.users[ 0 ].orgName ).toBe( "FURNESS TRANSPORT P/L" );
    } );

} );