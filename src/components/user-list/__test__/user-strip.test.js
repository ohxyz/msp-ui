import React from 'react';
import { UserStrip } from '../user-strip.js';
import renderer from 'react-test-renderer';

it( 'should render with defaults', () => {

    let user = { 

        fullName: 'Full Name',
        topOrgName: 'Top Orgnisation Name',
        orgName: 'Orgnisation Name'
    };
    
    const tree = renderer
        .create( <UserStrip user={ user }/> )
        .toJSON();

    expect( tree ).toMatchSnapshot();

} );