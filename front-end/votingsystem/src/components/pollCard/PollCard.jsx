import React, { useState, useEffect } from 'react' // <--- Importe useState e useEffect
import './pollcard.css'

const PollCard = ({ data: poll, onClick }) => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);


        return () => clearInterval(timer);
    }, []);

    const startDate = new Date(poll.start_date);
    const endDate = new Date(poll.end_date);
    const isNotStarted = now < startDate;
    const isClosed = now > endDate;

    const formatDate = (dateString) => {
        if (!dateString) return '--/--/----';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className="poll-card" onClick={onClick}>

            <div className="card-header">
                {isNotStarted ? (
                    <span className="card-status status-scheduled">● Em breve</span>
                ) : isClosed ? (
                    <span className="card-status status-closed">● Encerrada</span>
                ) : (
                    <span className="card-status status-active">● Em andamento</span>
                )}
            </div>

            <div className="card-body">
                <h3 className="card-title">{poll.title}</h3>
            </div>

            <div className="card-meta">
                <span>{poll.total_votes || 0} votos</span>

                <span>
                    {isNotStarted
                        ? `Inicia: ${formatDate(poll.start_date)}`
                        : isClosed
                            ? `Encerrou: ${formatDate(poll.end_date)}`
                            : `Encerra: ${formatDate(poll.end_date)}`
                    }
                </span>
            </div>
        </div>
    )
}

export default PollCard