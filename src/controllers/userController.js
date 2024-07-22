const { User } = require('../models');

class UserController {
    //Create user
    static async createUser(req, res){
        try{
            const { firstName, lastName, email, password, birthDate } = req.body;
            
            if(!firstName || !lastName || !email || !password || !birthDate){
                return res.status(400).json({error: 'All fields are required.'});
            }
                
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;

            if(!emailRegex.test(email)){
                return res.status(400).json({error: `'${email}' invalid e-mail format.`});
            }else if(!birthdateRegex.test(birthDate)){
                return res.status(400).json({error: `invalid bithdate format. Use YYYY-MM-DD`});
            }

            const user = await User.create({ firstName, lastName, email, password, birthDate});
            res.status(201).json(user);

        }catch(e){
            res.status(500).json({ error: e.message});
        }
    }
}

module.exports = UserController;