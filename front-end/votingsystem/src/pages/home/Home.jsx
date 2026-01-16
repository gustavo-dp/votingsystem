import React, { useEffect, useState } from 'react'
import api from '../../axios/api'
import PollCard from '../../components/pollCard/PollCard';
import './home.css'
import PollModal from '../../components/pollModal/PollModal';
import BlueButton from '../../components/blueButton/BlueButton';

const Home = () => {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [pollOptions, setPollOptions] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await api.get("/polls");
            setPolls(response.data);
        } catch (error) { console.error("Erro ao buscar polls"); }
    }


    useEffect(() => {
        let intervalId;

        if (selectedPoll) {

            fetchOptions(selectedPoll.id);


            intervalId = setInterval(() => {
                fetchOptions(selectedPoll.id);
            }, 2000);
        }


        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [selectedPoll]);


    const fetchOptions = async (pollId) => {
        try {
            const response = await api.get(`/polls/${pollId}/results`);
            setPollOptions(response.data);
        } catch (error) {
            console.error("Erro ao atualizar votos");
        }
    };

    const handleVote = async (optionId) => {
        try {
            await api.post(`/polls/${selectedPoll.id}/vote`, {
                option_id: optionId
            });


            fetchPolls();

        } catch (error) {
            console.error(error);
            alert("Erro ao registrar voto.");
        }
    };
    return (
        <div>
            <div className="polls-grid">
                {polls.map(poll => (
                    <PollCard
                        key={poll.id}
                        data={poll}
                        onClick={() => {
                            setPollOptions([]);
                            setSelectedPoll(poll);
                        }}
                    />
                ))}
            </div>
            {selectedPoll && (
                <PollModal onClose={() => setSelectedPoll(null)}>
                    <h2 style={{ marginBottom: '20px' }}>{selectedPoll.title}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                        {pollOptions.map(option => (
                            <BlueButton
                                key={option.id}
                                onClick={() => handleVote(option.id)}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    width: '100%',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    color: '#0f172a',
                                    padding: '12px 16px',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    position: 'relative', zIndex: 1, pointerEvents: 'none',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 500 }}>{option.option_text}</span>


                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2563eb' }}>
                                            {option.total_votes}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>votos</span>
                                    </div>
                                </div>
                            </BlueButton>
                        ))}
                    </div>
                </PollModal>
            )}
            {isCreateModalOpen && (
                <CreatePollModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={() => {
                        fetchPolls();
                    }}
                />
            )}
        </div>
    )
}

export default Home