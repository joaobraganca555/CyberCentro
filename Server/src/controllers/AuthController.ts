var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../utils/Config');

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const registerHandler = async (req, res) => {
    const errors = [];
    
    const { name, email, password, password2 } = req.body;

	//Verify required imputs
	if (!name || !email || !password || !password2) errors.push({ msg: 'Please enter all fields' });

	//Verify confimation password
	if (password != password2) errors.push({ msg: 'Passwords do not match' });

	//Verify password
	if (password.length < 8) errors.push({ msg: 'Password must be at least 8 characters' });

	if (errors.length > 0) return res.status(404).json({ errors, name, email, password, password2 });

	const userExists = await AppDataSource.manager.findOneBy(User, { email: email});
	const hashedPassword = await bcrypt.hash(password, 12);

	if (userExists) {
		errors.push({ msg: 'That email already exists' });
		return res.status(401).json({ errors, name, email, password, password2 });
	} else {
		const user = new User;
        user.email = email;
        user.password = hashedPassword;
        user.username = name;

		await AppDataSource.manager.save(user);

		return res.json({ success: true });
	}
}

const loginHandler = async (req, res, next) => {
    const errors = [];
    const { email, password } = req.body;

    const user = await AppDataSource.manager.findOneBy(User, { email: email });

    if (!user) {
        errors.push({ msg: 'User not found' });
    } else {
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            errors.push({ msg: 'Password mismatch' });
            return res.json({ errors, email, password });
        } else {
            console.log("Encontrado!");
            
            const token = jwt.sign({ id: user.userID, name: user.username}, config.secret, { expiresIn: '1d'});
           
            return res.status(200).send({ auth: true, token: token, name: user.username, id: user.userID });
        }
    }

}

module.exports = { loginHandler, registerHandler };
