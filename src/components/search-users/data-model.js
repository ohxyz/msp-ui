/* Store and process users data from SAP
 *
 */

class UserStorage {

    constructor( sapRaw ) {

        this.sapData = sapRaw;
        this.users = [];
        this.orgs = [];
    }

}

module.exports = {

    UserStorage,
};