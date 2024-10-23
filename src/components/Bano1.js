import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Bano1.css'; // Стильдер файлы

function Bano1() {
    const [formData, setFormData] = useState({
        numBanios: 0,
        numAseos: 0,
        numDuchas: 0,
        numBateras: 0,
        numJacuzzis: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({ ...prev, ...data.bano })); // Cargar datos del objeto 'bano'
                }
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (setter) => (e) => {
        const value = Math.max(0, Math.min(10, Number(e.target.value))); // Limitar el valor entre 0 y 10
        setter(value);
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                bano: formData // Guarda todo el objeto formData bajo 'bano'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/cocina1'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                bano: formData // Guarda todo el objeto formData bajo 'bano'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/salon1'); // Navega a la página anterior
        }
    };

    return (
        <div className="info-general-container">
            <h1>Baño</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128701;</div>
                    <label>Nº de baños:</label>
                    <input
                        type="number"
                        value={formData.numBanios}
                        onChange={handleInputChange((value) => setFormData(prev => ({ ...prev, numBanios: value })))}
                        placeholder="0"
                        min="0"
                        max="10"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128701;</div>
                    <label>Nº de aseos:</label>
                    <input
                        type="number"
                        value={formData.numAseos}
                        onChange={handleInputChange((value) => setFormData(prev => ({ ...prev, numAseos: value })))}
                        placeholder="0"
                        min="0"
                        max="10"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128701;</div>
                    <label>Nº de duchas:</label>
                    <input
                        type="number"
                        value={formData.numDuchas}
                        onChange={handleInputChange((value) => setFormData(prev => ({ ...prev, numDuchas: value })))}
                        placeholder="0"
                        min="0"
                        max="10"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128701;</div>
                    <label>Nº de bañeras:</label>
                    <input
                        type="number"
                        value={formData.numBateras}
                        onChange={handleInputChange((value) => setFormData(prev => ({ ...prev, numBateras: value })))}
                        placeholder="0"
                        min="0"
                        max="10"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128701;</div>
                    <label>Nº de jacuzzis:</label>
                    <input
                        type="number"
                        value={formData.numJacuzzis}
                        onChange={handleInputChange((value) => setFormData(prev => ({ ...prev, numJacuzzis: value })))}
                        placeholder="0"
                        min="0"
                        max="10"
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

export default Bano1;
