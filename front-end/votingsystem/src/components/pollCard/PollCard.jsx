import React from 'react'
import { Link } from 'react-router-dom';
import './pollcard.css'
const PollCard = ({ data: poll, onClick }) => {

    const now = new Date();
    const endDate = new Date(poll.end_date);
    const isClosed = now > endDate;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    return (
        <div className="poll-card" onClick={onClick}>

            <div className="card-header">
                {isClosed ? (
                    <span className="card-status status-closed">● Encerrada</span>
                ) : (
                    <span className="card-status status-active">● Em andamento</span>
                )}
            </div>

            <div className="card-body">
                <h3 className="card-title">{poll.title}</h3>
                <div className="mini-bars">
                    <div className="bar fill" style={{ width: '60%' }}></div>
                    <div className="bar" style={{ width: '40%' }}></div>
                </div>
            </div>

            <div className="card-meta">
                <span>{poll.total_votes || 0} votos</span>
                <span>
                    {isClosed ? `Encerrou: ${formatDate(poll.end_date)}` : `Encerra: ${formatDate(poll.end_date)}`}
                </span>
            </div>
        </div>
    )
}

export default PollCard