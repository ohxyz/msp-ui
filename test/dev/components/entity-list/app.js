import React from 'react';
import ReactDOM from 'react-dom';

import { EntityStrip } from '../../../../src/components/entity-list/entity-strip.js';
import { EntityList } from '../../../../src/components/entity-list/entity-list.js';
import { EntityProfile } from '../../../../src/model/entity-profile.js';

require( '../../../../less/components/entity-list.less' );

const faker = require( 'faker' );
const NUM = 10;

let entity = new EntityProfile( { firstName: 'John', lastName: 'Town', group: 'Dept A', topGroup: 'Victoria' } );
let entities = [];

for ( let i = 0; i < NUM; i ++ ) {

    let entity = {

        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        group: faker.company.companyName(),
        topGroup: faker.commerce.department(),
    }

    console.log( '*', entity );

    entities.push( entity );

}


ReactDOM.render(

    <EntityStrip entity={ entity } />,
    document.getElementById( 'entity-strip' )
);

ReactDOM.render(

    <EntityList entities={ entities } />,
    document.getElementById( 'entity-list' )
);