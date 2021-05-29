const { Pool } = require('pg');
const psqlConfig = require('../../conf.json');


const pool = new Pool(psqlConfig.postgresConf);

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows)
}

const getOneUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(response.rows)
}

const createUser = async(req, res) => {
    const { username, email } = req.body;

    const response = await pool.query('INSERT INTO users(username, email) VALUES($1, $2)', [username, email]);
    res.json({
        message: 'User created',
        body: {
            user: {username, email}
        }
    })
}

const deleteUser = async(req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).json(`User ${id} deleted successfully`)
};

const updateUser = async(req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;


    const response = await pool.query('UPDATE users SET username = $1, email = $2 where id = $3', [username, email, id]);
    res.status(200).json({
        message: `User ${id} updated successfully`,
        body: {
            user: {username, email}
        }
    })
};

module.exports = {
    getUsers,
    getOneUserById,
    createUser,
    deleteUser,
    updateUser
}
