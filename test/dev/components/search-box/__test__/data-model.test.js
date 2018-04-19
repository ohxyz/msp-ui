const datatype = require( '../../../../../src/components/search-box/data-model.js' );


describe( 'SearchItem object', () => {

    let SearchItem = datatype.SearchItem;

    test( 'can accept an empty argument', () => {

        expect( new SearchItem() ).toEqual( { name: '', content: '', value: null } );
    } );

    test( 'can accept a string argument.', () => { 

        let item = new SearchItem( 'Mike' );
        expect( item ).toEqual( { name: '', content: 'Mike', value: null } );

    } );

    test( 'can accept an empty string argument.', () => { 

        let item = new SearchItem( '' );
        expect( item ).toEqual( { name: '', content: '', value: null } );
    } );


    test( 'can accept an boolean argument.', () => { 

        let item = new SearchItem( true );
        expect( item ).toEqual( { name: '', content: 'true', value: null } );
        
    } );

    test( 'can accept a SeachItem object as an argument', () => { 

        let searchItem = new SearchItem( {

            name: '',
            content: true,
            value: {

                a: 1,
                b: '2'
            }
        } );

        let item = new SearchItem( searchItem );
        expect( item ).toEqual( { name: '', content: 'true', value: { a: 1, b: '2' } } );
        
    } );

} );

describe( 'makeSearchItemsByItems function', () => {

    let makeSearchItemsByItems = datatype.makeSearchItemsByItems;

    test( 'can accept an empty argument', () => {

        let items = [ 1, 'a', false, { name: 'x', content: 'y' }, { 'a': 'x', 'content': 2 } ];
        let itemsMade = makeSearchItemsByItems( items );

        expect( itemsMade ).toEqual( [

            { name: '', content: '1', value: null },
            { name: '', content: 'a', value: null },
            { name: '', content: 'false', value: null  },
            { name: 'x', content: 'y', value: null  },
            { name: '', content: '2', value: null  }

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

           { name: 'first', content: 'name', value: null },
           { name: 'last',  content: 'number', value: null },
           { name: 'first', content: 'name2', value: null },
           { name: 'last', content: 'number2', value: null } 

        ] );
    });

    test( 'return [] when fields do not contain a property in objects in items', () => {

        let itemsMade = fn( items, [ 'empty' ] );
        expect( itemsMade ).toEqual( [] );
    });

} );




