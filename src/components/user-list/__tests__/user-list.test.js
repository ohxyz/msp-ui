import React from 'react';
import { UserList } from '../user-list.js';
import TestRenderer from 'react-test-renderer';

it( 'should render with defaults', () => {

    let user1 = { 

        fullName: 'Full Name',
        topOrgName: 'Top Orgnisation Name',
        orgName: 'Orgnisation Name'
    };

    let user2 = { 

        fullName: 'Full Name 2',
        topOrgName: 'Top Orgnisation Name 2',
        orgName: 'Orgnisation Name 2'
    };

    let users = [ user1, user2 ];
    
    const tree = TestRenderer
        .create( <UserList users={ users }/> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );

describe( 'UserList Instance', () => {

    let users = [

        { 'org': 'abcde Transport' },
        { 'org': 'abcd Education', name: 'abcd' },
        { 'org': 'abce Health', name: 'abce health people' },
        { 'name': 'Mr abcdg ' },
        { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
    ];

    let testRenderer = TestRenderer.create( <UserList id="user-list-2" users={ users } /> );
    let testRoot = testRenderer.root;
    let testInstance = testRoot.instance;

    test( 'sortUsersByFields method can sort users by name', () => {

        let testInstance = new UserList( { id: 'user-list' } );
        let results = testInstance.sortUsersByFields( users, [ 'name' ] );

        expect( results[ 1 ].name ).toBe( 'abcd' );
        expect( results[ 2 ].name ).toBe( 'abcd lady' );
    } );

    test( 'removeUser method can remove a user', () => { 

        let userToRemove = users[ 1 ];
        let usersLeft = testInstance.removeUser( userToRemove );

        expect( users.length ).toBe( 5 );
        expect( usersLeft.length ).toBe( 4 );
    } );

} );