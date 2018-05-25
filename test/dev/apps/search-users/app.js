const SearchUsersApp = require( '../../../../src/apps/search-users/index.js').SearchUsersApp;
const dummySapObject = require( '../../dummies/sap.json' )
const dummySapObject2 = require( '../../dummies/sap2.json' )
const faker = require( 'faker' );

require( '../../../../less/components/search-users.less' );

let elem = document.getElementById( 'search-users-app' );

let app = new SearchUsersApp( {

    id: 'searchUsers',
    sapData: dummySapObject,
    domElement: elem
} );

let button1 = document.getElementById( 'manage-users' );
let button2 = document.getElementById( 'create-users' );
let button3 = document.getElementById( 'reload-users' );
let button4 = document.getElementById( 'add-a-user' );

window.searchUsersApp = app;

app.load();

button1.addEventListener( 'click', () => { 

    app.load();

} );

button2.addEventListener( 'click', () => { 

    app.unload();

} );

button3.addEventListener( 'click', () => { 

    app.reload( dummySapObject2.userHierarchy );

} );

button4.addEventListener( 'click', () => {

    let hid = "CA2B1FE6-D50C-1ED8-8AFC-D71F61F20303";

    let user = {

        hierarchyId: hid,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        emailAddress: faker.internet.email()
    }

    app.addUser( user );
} );

