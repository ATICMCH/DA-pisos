import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './InformacionGeneral1.css';

function InformacionGeneral1() {
    const [formData, setFormData] = useState({
        codigo: '',         // Código del Piso
        nombrePiso: '',    // Nombre del Piso
        pais: '',          // País
        ciudad: '',        // Ciudad
        estado: '',        // Estado
        codigoPostal: '',   // Código Postal
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
                    setFormData(prev => ({ ...prev, ...data.informacion })); // Carga todos los datos del usuario bajo 'informacion'
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
                informacion: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/informacion-general2');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Información GENERAL</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128196;</div>
                    <input
                        type="text"
                        name="codigo" // Sin prefijo numérico
                        placeholder="Código del Piso"
                        value={formData.codigo}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <input
                        type="text"
                        name="nombrePiso" // Sin prefijo numérico
                        placeholder="Nombre del Piso"
                        value={formData.nombrePiso}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#127793;</div>
                    <label>Seleccionar estado:</label>
                    <select name="estado" value={formData.estado} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="alto">Alto</option>
                        <option value="bajo">Bajo</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127760;</div>
                    <label>Seleccionar país:</label>
                    <select name="pais" value={formData.pais} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Espana">España</option>
                        <option value="Italia">Italia</option>
                        <option value="Francia">Francia</option>
                        <option value="Portugal">Portugal</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127961;</div>
                    <label>Seleccionar ciudad:</label>
                    <select name="ciudad" value={formData.ciudad} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {['Madrid', 'Valencia', 'Cordoba', 'Sevilla'].map((ciudad) => (
                            <option key={ciudad} value={ciudad}>{ciudad}</option>
                        ))}
                    </select>
                </div>
                {/* Campo para el código postal */}
                <div className="input-item">
                    <div className="icono">C.P.</div>
                    <input
                        type="text"
                        name="codigoPostal" // Sin prefijo numérico
                        placeholder="Código Postal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>←</button>
                <button className="nav-button" onClick={handleNext}>→</button>
            </div>
        </div>
    );
}

export default InformacionGeneral1;
