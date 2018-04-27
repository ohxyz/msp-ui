const React = require( 'react' );
const util = require( '../core/util.js' );
const SearchBox = require( '../search-box/search-box.js' ).SearchBox;
const UserList = require( '../user-list/user-list.js' ).UserList;

class SearchUsers extends React.Component {

    constructor( props ) {

        super( props );

        this.onSearchBoxItemSelect = this.onSearchBoxItemSelect.bind( this );

        this.state = {

            storage: null,
            usersFound: [],
        };
    }

    static getDerivedStateFromProps( nextProps, prevState ) {

        let bps = nextProps.storage;

        if ( bps === undefined ) {

            throw new Error( '[MSP] SearchUsers component must have a BusinessPartnerStorage instance as property.' );
        }

        bps.process();

        return {

            storage: bps
        }
    }

    onSearchBoxItemSelect( item, searchBox ) {

        let account = item.__origin__;
        let users = this.state.storage.getUsersByHierarchyId( account.hierarchyId );

        if ( account.type === 'person' ) {

            users = [ account ];
        }

        this.setState( { 

            usersFound: users

        } );
    }

    renderSearchBox() {

        return (

            <SearchBox 
                items={ this.state.storage.accounts }
                fields={ [ 'fullName' ] }
                strikes={ 3 }
                onSelect={ this.onSearchBoxItemSelect }
                onIconClick={ self => self.clearSearch() }
            />
        );
    }

    renderUserList() {

        return (

            <UserList users={ this.state.usersFound } />
        );
    }

    render() {

        return (

            <div id="search-users-section">
                { this.renderSearchBox() }
                { this.renderUserList() }
            </div>
        )
    }
}

module.exports = {

    SearchUsers
};