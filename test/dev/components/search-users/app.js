import React from 'react';
import ReactDOM from 'react-dom';
import { SearchUsers } from '../../../../src/components/search-users/search-users.js';
import { dummySapObject } from '../core/__test__/dummy-sap.js';
import { HierarchyStorage } from '../../../../src/components/core/hierarchy-storage.js';

import '../../../../less/components/search-users.less';

let storage = new HierarchyStorage( dummySapObject );

console.log( storage );

ReactDOM.render(
    
    <SearchUsers is="search-users" storage={ storage } />,
    document.getElementById( 'search-users' )
);