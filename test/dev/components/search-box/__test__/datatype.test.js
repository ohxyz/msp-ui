const datatype = require( '../../../../../src/components/search-box/datatype.js' );

let SearchItem = datatype.SearchItem;

describe( 'SearchItem object', () => {

    test( 'can accept an empty argument', () => {

        expect( new SearchItem() ).toEqual( { name: '', content: '' } );
    } );

    test( 'can accept a string argument.', () => { 

        let item = new SearchItem( 'Mike' );
        expect( item ).toEqual( { name: '', content: 'Mike' } );

    } );

    test( 'can accept an empty string argument.', () => { 

        let item = new SearchItem( '' );
        expect( item ).toEqual( { name: '', content: '' } );
    } );


    test( 'can accept an boolean argument.', () => { 

        let item = new SearchItem( true );
        expect( item ).toEqual( { name: '', content: 'true' } );
        
    } );
} );
