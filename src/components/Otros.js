import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Otros.css'; // Стильдер файлы

function Otros() {
    const [formData, setFormData] = useState({
        urlImagen: '',
        urlMantenimiento: '',
        comentariosAdicionales: ''
    });
    const navigate = useNavigate(); // Пайдалану үшін useNavigate хукасын қосамыз

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({ ...prev, ...data.otros })); // Cargar datos del objeto 'otros'
                }
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Actualiza el estado con el campo correspondiente
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                otros: formData // Guarda todo el objeto formData bajo 'otros'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/finalpage'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                otros: formData // Guarda todo el objeto formData bajo 'otros'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicasdelaurbanizacionoedificio'); // Navega a la página anterior
        }
    };

    return (
        <div className="otros-container">
            <h1>Plano del Apartamento</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128206;</div>
                    <input
                        type="text"
                        name="urlImagen"
                        placeholder="Url de la imagen"
                        value={formData.urlImagen}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h1>Acceso a Mantenimiento</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128206;</div>
                    <input
                        type="text"
                        name="urlMantenimiento"
                        placeholder="Url sección de mantenimiento"
                        value={formData.urlMantenimiento}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h1>Comentarios Adicionales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#9998;</div>
                    <textarea
                        name="comentariosAdicionales"
                        placeholder="Ingresar observaciones adicionales"
                        value={formData.comentariosAdicionales}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default Otros;

