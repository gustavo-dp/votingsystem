const db = require('../config/db')

const PollModel = {
    createPoll: async (title, start_date, end_date) => {
        const sql = 'INSERT INTO polls(title,start_date, end_date) VALUES (?,?,?)';
        const [result] = await db.query(sql, [title, start_date, end_date]);
        return result.insertId;
    },
    createOptions: async (pollId, options) => {
        const sql = 'INSERT INTO options (poll_id,option_text) VALUE ?';
        const optionsData = options.map(opt => [pollId, opt]);

        await db.query(sql, [optionsData]);

    },
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM polls');
        return rows;
    },
    findById: async (pollId) => {
        const sql = 'SELECT * FROM polls WHERE id = ?'
        const [rows] = await db.query(sql, [pollId]);
        return rows[0];
    }
}

module.exports = PollModel;