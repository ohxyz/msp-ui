import React from 'react';
import ReactDOM from 'react-dom';
import EntityList from '../../../../src/components/entity-list/entity-list.js';
import EntityStrip from '../../../../src/components/entity-list/entity-strip.js';
import { EntityProfile } from '../../../../src/model/entity-profile.js';

require( '../../../../less/components/entity-list.less' );

const entitysOrgs = [

    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady' },
];

let e = new EntityProfile( { firstName: 'John', lastName: 'Town', group: 'Dept A', topGroup: 'Victoria' } );


ReactDOM.render(

    <EntityStrip entity={ e } />,
    document.getElementById( 'entity-strip' )
);

