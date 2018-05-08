import React from 'react';
import { UserList } from '../user-list.js';
import renderer from 'react-test-renderer';

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
    
    const tree = renderer
        .create( <UserList users={ users }/> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );