const db = require('../config/db');

const VoteModel = {
    hasUserVoted: async (userId, pollId) => {
        const sql = 'SELECT id FROM votes WHERE user_id = ? AND poll_id = ?';
        const [rows] = await db.query(sql, [userId, pollId]);
        return rows.length > 0;
    },

    createVote: async (userId, pollId, optionId) => {
        const sql = 'INSERT INTO votes (user_id, poll_id,option_id) VALUES (?,?,?)'
        await db.query(sql, [userId, pollId, optionId]);
    },
    getResults: async (pollId) => {
        const sql = `
            SELECT o.id, o.option_text, COUNT(v.id) as total_votes
            FROM options o
            LEFT JOIN votes v ON o.id = v.option_id
            WHERE o.poll_id = ?
            GROUP BY o.id
        `;
        const [rows] = await db.query(sql, [pollId]);
        return rows;
    }
};

module.exports = VoteModel;