const studentmodel = require('../models/user_models');

const getallstudents = async (req, res) => {
    try {
        const students = await studentmodel.getallstudents();
        res.json({ success: true, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getstudentByid = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentmodel.getstudentbyid(id);
        if (student) {
            res.json({ success: true, data: student }); 
        } else {
            res.status(404).json({ success: false, message: 'student not found' }); 
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message }); 
    }
};

module.exports = { 
    getallstudents,
    getstudentByid 
};