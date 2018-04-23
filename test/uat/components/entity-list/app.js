import React from 'react';
import ReactDOM from 'react-dom';
import { EntityStrip } from '../../../../src/components/entity-list/entity-strip.js';
import { EntityList } from '../../../../src/components/entity-list/entity-list.js';
import { EntityProfile } from '../../../../src/model/entity-profile.js';

require( '../../../../less/components/entity-list.less' );

const faker = require( 'faker' );
const NUM = 20;
let entities = [];

for ( let i = 0; i < NUM; i ++ ) {

    let entity = {

        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        group: faker.company.companyName(),
        topGroup: faker.commerce.department(),
    }

    entities.push( entity );
}

ReactDOM.render(

    <EntityList 
        entities={ entities } 
        onRenderCount={ count => `In total, ${count} users found.` }
    />,
    document.getElementById( 'entity-list' )
);