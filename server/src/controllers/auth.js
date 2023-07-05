const knex = require('knex');
const config = require('../../configs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {numberToDB} = require('../algorythm/number');
const errorHandler = require('../utils/errorHandler');

//const getUser = require('../data/users');
//const users = new Users;



module.exports = {

    loginUser: async(req, res) => {
        const db = knex(config.development.database);
        let existsUser = false;
        let user;
        await db('users')
            .where('nickname', req.body.nickname)
            .then((users) => {
                if (!(users.length === 0)){
                    existsUser = true;
                    user = users[0];
                }
            })
        if (!existsUser) {
            res.status(404).json({message: 'Такого пользователя не существует'});
        }
        else{
            const passwordResult = bcrypt.compareSync(req.body.password, user.password);
            if (passwordResult){
                //генерация токена, пароли совпали, пользователь есть
                const token = jwt.sign({
                    id: user.id,
                    nickname: user.nickname,
                    phone: user.phone,
                    role: user.role,
                    name: user.name,
                    surname: user.surname,
                    address: user.address,
                    darktheme: user.darktheme
                }, config.jwtkey, {expiresIn: 60 * 60});
                res.status(200).json({token: token});
            }
            else {
                res.status(401).json({message: 'Пароль введен неверно!'});
            }
            //res.status(409).json(user);
        }
    },

    regUser: async (req, res) => {
        console.log(req.body);
        const db = knex(config.development.database);
        //let candidate = await getUser("nickname", req.body.nickname);
        let existsUser = false;
        //сonsole.log(candidate);
        await db('users')
            .select('nickname')
            .where('nickname', req.body.nickname)
            .then((users) => {
                if (!(users.length === 0)){
                    existsUser = true;
                }
            })
        //сonsole.log(candidate);
        if (existsUser) {
            //пользователь существует
            res.status(409).json({message: 'Такой логин уже используется.'});
        }
        else{
            const number = numberToDB(req.body.phone);
            if (number === '0'){
                res.status(400).json({message: 'Номер слишком длинный или слишком короткий'});
            }
            await db('users')
                .select('phone')
                .where('phone', number)
                .then((users) => {
                    if (!(users.length === 0)){
                        existsUser = true;
                    }
                })
            if (existsUser) {
                //пользователь существует
                res.status(409).json({message: 'Такой номер уже используется.'});
            }
            else{
                const salt = bcrypt.genSaltSync(10);
                const password = req.body.password;
                try {
                    await db 
                    .insert([{
                        nickname: req.body.nickname,
                        password: bcrypt.hashSync(password, salt),
                        phone: number,
                        role: req.body.role,
                        name: req.body.name,
                        surname: req.body.surname,
                        address: req.body.address,
                        darktheme: req.body.darktheme,
                    }],
                    ['id']
                    )
                    .into('users')
                    .then((newUserId) => {
                        console.log('User register', newUserId);
                    });
                    res.status(201).json({message: '+'});
                }
                catch(e) {
                    errorHandler(res, e);
                }
            }
        }
    }
}