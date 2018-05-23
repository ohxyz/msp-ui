import React from 'react';
import ReactDOM from 'react-dom';
import { SearchUsers } from '../../../../src/components/search-users/search-users.js';
import { HierarchyStorage } from '../../../../src/components/core/hierarchy-storage.js';
import '../../../../less/components/search-users.less';

let dummySapObject = require( '../../dummies/sap.json');
let storage = new HierarchyStorage( dummySapObject );


ReactDOM.render(
    
    <SearchUsers 
        id="search-users"
        storage={ storage } 
    />,
    document.getElementById( 'search-users' )
);