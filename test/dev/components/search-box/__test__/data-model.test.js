const datatype = require( '../../../../../src/components/search-box/data-model.js' );


describe( 'SearchItem object', () => {

    let SearchItem = datatype.SearchItem;

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

describe( 'makeSearchItems function', () => {

    let makeSearchItems = datatype.makeSearchItems;

    test( 'can accept an empty argument', () => {

        let items = [ 1, 'a', false, { name: 'x', content: 'y' }, { 'a': 'x', 'content': 2 } ];
        let itemsMade = makeSearchItems( items );

        expect( itemsMade ).toEqual( [

            { name: '', content: '1' },
            { name: '', content: 'a' },
            { name: '', content: 'false' },
            { name: 'x', content: 'y' },
            { name: '', content: '2' }

        ] );
    } );

} );

describe( 'makeSearchItemsByFields object', () => {

    let fn = datatype.makeSearchItemsByFields;
    let items = [

        { first: 'name',  next: 'address',  last: 'number'  },
        { first: 'name2', next: 'address2', last: 'number2' } 
    ];

    test( 'can work with proper arguments', () => {

        let itemsMade = fn( items, [ 'first', 'last' ] );

        expect( itemsMade ).toEqual( [

           { name: 'first', content: 'name' },
           { name: 'last',  content: 'number'},
           { name: 'first', content: 'name2' },
           { name: 'last', content: 'number2'} 

        ] );
    });

    test( 'return [] when fields do not contain a property in objects in items', () => {

        let itemsMade = fn( items, [ 'empty' ] );
        expect( itemsMade ).toEqual( [] );
    });

} );



