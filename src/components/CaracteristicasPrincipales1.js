import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './CaracteristicasPrincipales1.css';

function CaracteristicasPrincipales1() {
    const [formData, setFormData] = useState({
        ocupacionMaxima: '',
        number: 0, // Start with 0 as a default value
        area: '',
        calefaccion: [], // Calefacción түрлері
        calefaccionTipo: [], // Calefacción типтері
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
                    setFormData(prev => ({ ...prev, ...data.caracteristicas }));
                }
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (e, fieldName) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [fieldName]: checked
                ? [...prev[fieldName], value]
                : prev[fieldName].filter(item => item !== value)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData,
            }, { merge: true });
            navigate('/caracteristicas-principales2');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData,
            }, { merge: true });
            navigate('/informacion-general2');
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            
            {/* Ocupación Máxima */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Ocupación Máxima:</span>
                <input
                    type="text"
                    name="ocupacionMaxima"
                    placeholder="escribe"
                    value={formData.ocupacionMaxima}
                    onChange={handleChange}
                />
            </div>

            {/* Nº de estancias */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Nº de estancias:</span>
                <input
                    type="number"
                    name="number"
                    min="0"
                    max="10"
                    value={formData.number}
                    onChange={handleChange}
                />
            </div>

            {/* Área m² */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Área m²:</span>
                <input
                    type="text"
                    name="area"
                    placeholder="escribe"
                    value={formData.area}
                    onChange={handleChange}
                />
            </div>

            {/* Calefacción */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Calefacción:</span>
                <div className="checkbox-group">
                    {["Gas", "Electrica", "Biomasa", "Geotermica"].map(type => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                value={type}
                                checked={formData.calefaccion.includes(type)}
                                onChange={(e) => handleCheckboxChange(e, "calefaccion")}
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Calefaccion Tipo */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Calefacción Tipo:</span>
                <div className="checkbox-group">
                    {["Central", "Individual"].map(tipo => (
                        <label key={tipo}>
                            <input
                                type="checkbox"
                                value={tipo}
                                checked={formData.calefaccionTipo.includes(tipo)}
                                onChange={(e) => handleCheckboxChange(e, "calefaccionTipo")}
                            />
                            {tipo}
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons and Page Selector */}
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>←</button>
                
                <select className="page-select" onChange={(e) => e.target.value && navigate(e.target.value)}>
                    <option value="">Seleccionar página</option>
                    <option value="/">Login</option>
                    <option value="/register">Register</option>
                    <option value="/informacion-general1">Información General 1</option>
                    <option value="/informacion-general2">Información General 2</option>
                    <option value="/caracteristicas-principales1">Características Principales 1</option>
                    <option value="/caracteristicas-principales2">Características Principales 2</option>
                    <option value="/dormitorios1">Dormitorios 1</option>
                    <option value="/dormitorios2">Dormitorios 2</option>
                    <option value="/salon">Salón</option>
                    <option value="/bano">Baño</option>
                    <option value="/cocina">Cocina</option>
                    <option value="/accesoriosdelhogar">Accesorios del Hogar</option>
                    <option value="/caracteristicasadicionalesdelpiso">Características Adicionales del Piso</option>
                    <option value="/otros">Otros</option>
                    <option value="/finalpage">Final Page</option>
                </select>

                <button className="nav-button" onClick={handleNext}>→</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales1;
