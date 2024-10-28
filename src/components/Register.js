import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from '../images/mycityhome-logo.png';
import { auth, db } from '../firebase'; // Importar Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Crear el usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Crear un documento en Firestore con el UID
            await setDoc(doc(db, "users", user.uid), {
                email: email, // Puedes agregar otros campos que quieras almacenar
            });

            navigate('/'); // Redirigir a la página de inicio después del registro exitoso
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="ui segment grey signup-form" id="signup-form">
            <form className="ui form big" onSubmit={handleRegister}>
                <div className="ui stacked segment">
                    {error && <div className="ui error message">{error}</div>}
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
                    <button className="ui button blue fluid big" type="submit" id="signup-btn">Crear Cuenta</button>
                </div>
            </form>
            <div className="ui message small big">
                Ya tienes una cuenta? <Link to="/" id="have-an-account-btn">Iniciar Sesión</Link>
            </div>
        </section>
    );
}

export default Register;
