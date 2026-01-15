import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axios/api';
import BlueButton from '../../components/blueButton/BlueButton';
import './register.css';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {

            await api.post('/auth/register', {
                name,
                email,
                password
            });
            alert("Conta criada com sucesso! Faça login para continuar.");
            navigate('/login');

        } catch (err) {
            const msg = err.response?.data?.error || "Erro ao criar conta. Tente novamente.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Crie sua conta</h2>
                    <p>Comece a criar e votar em enquetes agora</p>
                </div>
                <form onSubmit={handleRegister}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder="Ex: João Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Crie uma senha forte"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <BlueButton
                        type="submit"
                        disabled={isLoading}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {isLoading ? 'Criando conta...' : 'Cadastrar'}
                    </BlueButton>
                </form>

                <div className="login-link">
                    Já tem uma conta? <Link to="/login">Fazer Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;