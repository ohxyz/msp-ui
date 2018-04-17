import React from 'react';
import ReactDOM from 'react-dom';
import EntityList from '../../../../src/components/entity-list/entity-list.js';
import EntityStrip from '../../../../src/components/entity-list/entity-strip.js';

require( '../../../../less/components/entity-list.less' );

const entitysOrgs = [

    { 'org': 'abcd Education', name: 'abcd' },
    { 'org': 'abce Health', name: 'abce health people' },
    { 'org': 'abcde Transport' },
    { 'name': 'Mr abcdg ' },
    { 'name': 'abcd lady', 'org': 'abce LADY GROUP' }
];

ReactDOM.render(

    <entityStrip entity={ { 'org': 'abcd Education', name: 'abcd' } } />,
    document.getElementById( 'entity-strip' )
);

