const { User } = require('../models');
const { Op } = require('sequelize');
const { removeDeletedAtFromJson } = require('./util');

class UserController {
    //API Functions

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
            const response = removeDeletedAtFromJson(user); 
            return res.status(200).json(response);

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

           const response = removeDeletedAtFromJson(existingUser); 
           return res.status(200).json(response);

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
    
    //Update user
    static async updateUser(req, res){
        try{
           
            const { id } = req.params;
            const { firtsName, lastName, email, password } = req.body;

            if(!id){
                return res.status(400).json({ error: 'User ID is required.'});
            }

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found.'});
            }

            const updateData = {};

            if(firtsName !== undefined){
                updateData.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            }

            if(lastName !== undefined){
                updateData.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
            }

            if(email !== undefined){
                const lowerCaseEmail = email.toLowerCase();
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(lowerCaseEmail)){
                    return res.status(400).json({error: `'${lowerCaseEmail}' invalid e-mail format.`});
                }

                const existingUser = await User.findOne({where: {email: lowerCaseEmail}});
                if (existingUser){
                    return res.status(400).json({error: `'${lowerCaseEmail}' already exists.`});
                }

                updateData.email = email.toLowerCase();
            }

            if(password !== undefined){
                updateData.password = password;
            }

            await user.update(updateData);

            const userWithoutPassword = user.toJSON();
            delete userWithoutPassword.password;

            res.status(200).json(userWithoutPassword);
        } catch(e){
            return res.status(500).json({error: e.message});
        }
    }

    //delete user
    static async deleteUser(req, res){
        try{
            const { id } = req.params;

            if(!id){
                return res.status(400).json({ error: 'User ID is required.'});
            }

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found.'});
            }

            user.destroy();

            return res.status(200).json({message: 'User deleted successfully'});

        }catch(e){
            return res.status(500).json({error: e.message});
        }
    }

    //View functions

    //login
    static async viewLogin(req, res){
        try{
            const { email, password } = req.body;

            const existingUser = await User.findOne({where: {email: email.toLowerCase()}});
            if (!existingUser){
                return res.status(401).render('login', {
                    formType: 'login',
                    errorMessage: 'Email or password is incorrect'
                });
            }

            const UserPassword = existingUser.password;
            if(UserPassword != password){
                return res.status(401).render('login', {
                    formType: 'login',
                    errorMessage: 'Email or password is incorrect'
                });
            }

            return res.status(200).render('home', {
                formType: 'home',
                errorMessage: null
            });

        }catch(e){
            return res.status(500).json({error: 'Internal server error'});
        }
    }

    static async viewRegister(req, res){
        try{
            const { firstName, lastName, email, password, birthDate } = req.body;

            console.log(firstName, lastName, email, password, birthDate);
            
            if(!firstName || !lastName || !email || !password || !birthDate){
                return res.render('login', { formType: 'register', errorMessage: 'All fields are required.' });
            }
            
            const lowerCaseEmail = email.toLowerCase();
            const existingUser = await User.findOne({where: {email: lowerCaseEmail}});
            if (existingUser){
                return res.render('login', { formType: 'register', errorMessage: `'${lowerCaseEmail}' already exists.` });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(lowerCaseEmail)){
                return res.render('login', { formType: 'register', errorMessage: `'${lowerCaseEmail}' invalid e-mail format.` });
            }
            
            const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if(!birthdateRegex.test(birthDate)){
                return res.render('login', { formType: 'register', errorMessage: `Invalid birthdate format. Use YYYY-MM-DD` });
            }

            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

            const user = await User.create({ firstName: capitalizedFirstName, lastName:capitalizedLastName, email: lowerCaseEmail, password, birthDate});
            const response = removeDeletedAtFromJson(user); 
            return res.redirect('/login');

        }catch(e){
            return res.render('login', { formType: 'register', errorMessage: e.message });
        }
    }
}

module.exports = UserController;