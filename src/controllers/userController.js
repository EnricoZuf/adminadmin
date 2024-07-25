const { User } = require('../models');
const { Op } = require('sequelize');

class UserController {
    //Create user
    static async createUser(req, res){
        try{
            const { firstName, lastName, email, password, birthDate } = req.body;
            
            if(!firstName || !lastName || !email || !password || !birthDate){
                return res.status(400).json({error: 'All fields are required.'});
            }
            
            const lowerCaseEmail = email.toLowerCase();
            const existingUser = await User.findOne({where: {email: lowerCaseEmail}});
            if (existingUser){
                return res.status(400).json({error: `'${lowerCaseEmail}' already exists.`});
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(lowerCaseEmail)){
                return res.status(400).json({error: `'${lowerCaseEmail}' invalid e-mail format.`});
            }
            
            const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!birthdateRegex.test(birthDate)){
                return res.status(400).json({error: `invalid bithdate format. Use YYYY-MM-DD`});
            }

            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

            const user = await User.create({ firstName: capitalizedFirstName, lastName:capitalizedLastName, email: lowerCaseEmail, password, birthDate});
            res.status(201).json(user);

        }catch(e){
            res.status(500).json({ error: e.message});
        }
    }

    //Read user
    static async readUser(req,res){
        try{
            const { email } = req.params;

            if(!email){
                return res.status(400).json({error: 'invalid email'});
            }

            const lowerCaseEmail = email.toLowerCase();
            const existingUser = await User.findOne({
                where: {
                    email: lowerCaseEmail
                },
                attributes: {
                    exclude: ['password'] 
                }
            });
            if(!existingUser){
                return res.status(400).json({error: 'unregistered email'});
            }

           return res.status(200).json(existingUser);

        } catch (e){
            res.status(500).json({error: e.message});
        }
    }

    //read all users
    static async readAllUsers(req,res){
        try{
            
            const users = await User.findAll({
                attributes: {
                    exclude: ['password'] 
                }
            });
            return res.status(200).json(users);

        } catch (e){
            res.status(500).json({error: e.message});
        }
    }

        //Search users
        static async searchUsers(req,res){
            try{
            
                const { query } = req.query;
                
                if (!query) {
                    return res.status(400).json({ error: 'Query parameter is required.' });
                }

                const lowerCaseQuery = query.toLowerCase();
                const users = await User.findAll({
                    where: {
                        [Op.or]: [
                            {
                                email: {
                                    [Op.like]: `%${lowerCaseQuery}%`
                                }
                            },
                            {
                                firstName: {
                                    [Op.like]: `%${lowerCaseQuery}%`
                                }
                            },
                            {
                                lastName: {
                                    [Op.like]: `%${lowerCaseQuery}%`
                                }
                            }
                        ]
                    },
                    attributes: {
                        exclude: ['password'] 
                    }
                })

                if (users.length > 0) {
                    return res.status(200).json(users);
                } else {
                    return res.status(404).json({ error: 'No users found.' });
                }


            } catch (e){
                res.status(500).json({error: e.message});
            }
        }
    
    
}

module.exports = UserController;