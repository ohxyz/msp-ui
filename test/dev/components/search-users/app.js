import React from 'react';
import ReactDOM from 'react-dom';
import { SearchUsers } from '../../../../src/components/search-users/search-users.js';
import { dummySapObject } from '../core/__test__/dummy-sap.js';
import { BusinessPartnerStorage } from '../../../../src/components/core/business-partner-storage.js';

import '../../../../less/components/search-users.less';

let bps = new BusinessPartnerStorage( dummySapObject );

ReactDOM.render(

    <SearchUsers storage={ bps } />,
    document.getElementById( 'search-users' )
);