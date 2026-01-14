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

    // 1. Busca a lista de enquetes ao carregar a página
    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await api.get("/polls");
            setPolls(response.data);
        } catch (error) { console.error("Erro ao buscar polls"); }
    }

    // 2. Lógica de REAL TIME (Polling)
    // Sempre que 'selectedPoll' mudar (ou seja, modal abrir), isso roda
    useEffect(() => {
        let intervalId;

        if (selectedPoll) {
            // Busca imediatamente ao abrir
            fetchOptions(selectedPoll.id);

            // E configura um relógio para buscar de novo a cada 2 segundos
            intervalId = setInterval(() => {
                fetchOptions(selectedPoll.id);
            }, 2000);
        }

        // Limpeza: Quando fechar o modal, para de buscar para não pesar o servidor
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [selectedPoll]);

    // Função separada para buscar os votos (usada pelo intervalo)
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
            await api.post('/votes', {
                poll_id: selectedPoll.id,
                option_id: optionId
            });

            // Assim que votar, atualiza a lista IMEDIATAMENTE (sem esperar os 2s)
            fetchOptions(selectedPoll.id);

            // Opcional: Atualiza também a lista de fora para mostrar o total de votos novos
            fetchPolls();

        } catch (error) {
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
                            setPollOptions([]); // Limpa para não mostrar dados da enquete anterior
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
                                {/* BARRA DE FUNDO (Opcional: Se quiser remover a barra, apague essa div) */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, bottom: 0,
                                    // Cálculo simples apenas para a barra visual (proporção)
                                    // Se a enquete tiver 0 votos no total, barra é 0
                                    width: `${pollOptions.reduce((acc, o) => acc + Number(o.total_votes), 0) > 0
                                        ? (option.total_votes / pollOptions.reduce((acc, o) => acc + Number(o.total_votes), 0)) * 100
                                        : 0}%`,
                                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                    zIndex: 0,
                                    pointerEvents: 'none',
                                    transition: 'width 0.5s ease'
                                }}></div>

                                {/* CONTEÚDO (Texto e Número de Votos) */}
                                <div style={{
                                    position: 'relative', zIndex: 1, pointerEvents: 'none',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 500 }}>{option.option_text}</span>

                                    {/* AQUI ESTÁ A MUDANÇA: MOSTRANDO NÚMERO DE VOTOS */}
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
        </div>
    )
}

export default Home