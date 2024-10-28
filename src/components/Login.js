import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirección
import '../styles/Login.css';
import logo from '../images/mycityhome-logo.png'; // Importar la imagen del logo
import { auth } from '../firebase'; // Importar Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Usar el hook useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Realizar la autenticación con Firebase
            await signInWithEmailAndPassword(auth, email, password);
            
            navigate('/informacion-general1'); // Redirigir a otra página después del inicio de sesión exitoso
        } catch (error) {
            // Mostrar el mensaje de error adecuado
            if (error.code === "auth/invalid-email" || error.code === "auth/missing-password") {
                setError("El correo electrónico o la contraseña son incorrectos");
            } else if (error.code === "auth/user-not-found") {
                setError("Usuario no encontrado. Por favor, crea una cuenta.");
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <section className="ui segment grey" id="login-form">
            <form className="ui big form" onSubmit={handleLogin}>
                <div className="ui stacked segment">
                    {error && <div className="ui error message big">{error}</div>}
                    <div className="field">
                        <h4 className="h4">Welcome to</h4>
                        <div className="image3">
                            <img src={logo} alt="MyCityHome Logo" width="300" height="100" />
                        </div>
                        <div className="ui left icon input big">
                            <i className="mail icon"></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input big">
                            <i className="lock icon"></i>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="ui button blue fluid big" type="submit" id="login-btn">Iniciar Sesión</button>
                </div>
            </form>
            <div className="ui message small big">
                No tienes cuenta aún? <Link to="/register" id="need-an-account-btn">Registrate</Link>
            </div>
        </section>
    );
}

export default Login;
