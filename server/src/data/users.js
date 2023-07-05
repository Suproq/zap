const knex = require('knex');
const config = require('../../configs');
//const Users = () => knex('users');
const db = knex(config.development.database);

async function getUser(key, value) {
        await db('users')
            .where(key, value)
            .then((users) => {
                console.log(users);
                console.log('Все');
                return 123;
            })
    }

/*class Users {
    //db = 
    db = knex(config.development.database);
    getUser = async(key, value) => {
        await this.db('users')
            .where(key, value)
            .then((users) => {
                console.log(users);
                console.log('Все');
                return 123;
            })
    }
}*/


module.exports = getUser;