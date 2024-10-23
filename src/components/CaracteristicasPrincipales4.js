import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracteristicasPrincipales4.css'; // Archivo de estilos

function CaracteristicasPrincipales4() {
    const [formData, setFormData] = useState({
        radiadores: '',
        ventiladores: '',
        chimenea: '',
        terraza: '',
        balcon: '',
        tipoCalefaccion: '',
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
                    setFormData(prev => ({ ...prev, ...data.caracteristicas })); // Cargar datos del objeto 'caracteristica'
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
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristica'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales5');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristica'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales3');
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128296;</div>
                    <label>¿Tienen radiadores?</label>
                    <select name="radiadores" value={formData.radiadores} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128168;</div>
                    <label>¿Tienen ventiladores de techo?</label>
                    <select name="ventiladores" value={formData.ventiladores} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128994;</div>
                    <label>¿Tienen chimenea?</label>
                    <select name="chimenea" value={formData.chimenea} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127965;</div>
                    <label>¿Tienen terraza?</label>
                    <select name="terraza" value={formData.terraza} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <label>¿Tienen balcón?</label>
                    <select name="balcon" value={formData.balcon} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128298;</div>
                    <label>¿Tipo de calefacción?</label>
                    <select name="tipoCalefaccion" value={formData.tipoCalefaccion} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Gas">Gas</option>
                        <option value="Eléctricas">Eléctricas</option>
                    </select>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales4;
