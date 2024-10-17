import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracterísticasdelaUrbanizacionoEdificio.css'; // Стильдер файлы

function CaracteristicasdelaUrbanizacionoEdificio() {
    const [formData, setFormData] = useState({
        zonaInfantil: '',
        tienePorteria: '',
        tieneSpa: '',
        tieneGimnasio: '',
        tieneZonaBBQ: ''
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
                    setFormData(prev => ({ ...prev, ...data.edificio })); // Cargar datos del objeto 'edificio'
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
                edificio: formData // Guarda todo el objeto formData bajo 'edificio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/otros'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                edificio: formData // Guarda todo el objeto formData bajo 'edificio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicasadicionalesdelpiso2'); // Navega a la página anterior
        }
    };

    return (
        <div className="caracteristicas-urbanizacion-container">
            <h1>Características de la Urbanización o Edificio</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#127822;</div>
                    <label>Zona Infantil?</label>
                    <select name="zonaInfantil" value={formData.zonaInfantil} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128197;</div>
                    <label>Tiene Portería?</label>
                    <select name="tienePorteria" value={formData.tienePorteria} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128737;</div>
                    <label>Tiene Spa?</label>
                    <select name="tieneSpa" value={formData.tieneSpa} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128170;</div>
                    <label>Tiene Gimnasio?</label>
                    <select name="tieneGimnasio" value={formData.tieneGimnasio} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127869;</div>
                    <label>Tiene Zona BBQ?</label>
                    <select name="tieneZonaBBQ" value={formData.tieneZonaBBQ} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
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

export default CaracteristicasdelaUrbanizacionoEdificio;
