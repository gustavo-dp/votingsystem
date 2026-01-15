import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../axios/api';
import BlueButton from '../../components/blueButton/BlueButton';
import './login.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (err) {

            const msg = err.response?.data?.error || "Erro ao conectar com o servidor";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Bem-vindo de volta</h2>
                    <p>Entre para votar e criar enquetes</p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && <div className="error-message">{error}</div>}

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
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <BlueButton
                        type="submit"
                        disabled={isLoading}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </BlueButton>
                </form>

                <div className="register-link">
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;