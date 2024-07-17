const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('adminadmin', 'root', '280123', {
    host: 'localhost',
    dialect: 'mariadb'
});

async function databaseConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = databaseConnect;
