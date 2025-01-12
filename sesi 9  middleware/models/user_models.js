const db = require('../config/config_db');
const { getstudentByid } = require('../controllers/user_controllers');

const getallstudents = async (id) => {
    const [rows] = await db.query('SELECT * FROM siswa WHERE id = ?', [id]);
    return rows[0];
};

module.exports = {
    getallstudents,
    getstudentByid
};