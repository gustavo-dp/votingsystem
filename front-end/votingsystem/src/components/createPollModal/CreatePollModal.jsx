import React, { useState } from 'react';
import api from '../../axios/api';
import PollModal from '../pollModal/PollModal';
import BlueButton from '../blueButton/BlueButton';
import './createpollmodal.css';

const CreatePollModal = ({ onClose, onSuccess }) => {

    const getCurrentLocalTime = () => {
        const now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60000;
        const localDate = new Date(now.getTime() - offsetMs);
        return localDate.toISOString().slice(0, 16);
    };


    const [title, setTitle] = useState('');
    const [endDate, setEndDate] = useState('');


    const [startDate, setStartDate] = useState(getCurrentLocalTime());

    const [options, setOptions] = useState(['', '']);
    const [isLoading, setIsLoading] = useState(false);


    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validOptions = options.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
            alert("A enquete precisa de pelo menos 2 opções válidas.");
            return;
        }

        setIsLoading(true);

        try {
            await api.post('/polls', {
                title,
                start_date: startDate,
                end_date: endDate,
                options: validOptions
            });

            alert("Enquete criada com sucesso!");
            onSuccess();
            onClose();

        } catch (error) {
            console.error(error);
            alert("Erro ao criar enquete. Verifique os dados.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PollModal onClose={onClose}>
            <h2 className="create-modal-title">Nova Enquete</h2>

            <form onSubmit={handleSubmit} className="create-poll-form">

                <div className="form-group">
                    <label>Título da Pergunta</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ex: Qual a melhor linguagem?"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Início da Votação</label>
                    <input
                        type="datetime-local"
                        className="form-input"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Encerra em</label>
                    <input
                        type="datetime-local"
                        className="form-input"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        required
                    />
                </div>

                <div className="options-section">
                    <label>Opções de Resposta</label>
                    {options.map((option, index) => (
                        <div key={index} className="option-row">
                            <input
                                type="text"
                                className="form-input"
                                placeholder={`Opção ${index + 1}`}
                                value={option}
                                onChange={e => handleOptionChange(index, e.target.value)}
                                required
                            />

                            {options.length > 2 && (
                                <button
                                    type="button"
                                    className="btn-remove"
                                    onClick={() => removeOption(index)}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" className="btn-add-option" onClick={addOption}>
                        + Adicionar outra opção
                    </button>
                </div>

                <div className="modal-actions">
                    <BlueButton type="submit" disabled={isLoading} style={{ width: '100%', justifyContent: 'center' }}>
                        {isLoading ? 'Criando...' : 'Publicar Enquete'}
                    </BlueButton>
                </div>

            </form>
        </PollModal>
    );
};

export default CreatePollModal;