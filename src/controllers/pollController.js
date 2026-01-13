const PollModel = require('../models/PollModel');
const VoteModel = require('../models/VoteModel');

module.exports = {
    create: async (req, res) => {
        const { title, start_date, end_date, options } = req.body;
        if (!options || options.length < 3) {
            return res.status(400).json({ error: "É obrigatório ter pelo menos 3 opções." });
        }
        try {
            const pollId = await PollModel.createPoll(title, start_date, end_date);

            await PollModel.createOptions(pollId, options);
            res.status(201).json({ message: "Enquete criada", pollId })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno ao criar enquete" });
        }
    },
    getAll: async (req, res) => {
        try {
            const polls = await PollModel.findAll();
            res.json(polls);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar enquetes" });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const poll = await PollModel.findById(id);
            if (!poll) return res.status(404).json({ error: "Enquete não encontrada" });


            const options = await VoteModel.getResults(id);

            res.json({ poll, options });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao buscar detalhes da enquete" });
        }
    },
    vote: async (req, res) => {
        const { id } = req.params;
        const { option_id } = req.body;
        const userId = 1; //TODO

        try {
            const poll = await PollModel.findById(id);
            const now = new Date();
            if (now < new Date(poll.start_date) || now > new Date(poll.end_date)) {
                return res.status(400).send("Enquete fechada para votação");
            }

            const voted = await VoteModel.hasUserVoted(userId, id);
            if (voted) {
                return res.status(409).send("Você já votou nessa enquete");
            }

            await VoteModel.createVote(userId, id, option_id);

            res.status(200).json({ message: "Voto registrado!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao votar" });
        }
    }


}