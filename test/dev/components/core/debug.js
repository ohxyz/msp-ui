const BusinessPartnerStorage = require( '../../../../src/components/core/business-partner-storage.js' ).BusinessPartnerStorage;
const dummySapObject = require( './__test__/dummy-sap.js' ).dummySapObject;

let bps = new BusinessPartnerStorage( dummySapObject );


bps.process();

