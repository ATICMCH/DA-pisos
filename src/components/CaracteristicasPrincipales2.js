import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './CaracteristicasPrincipales2.css';

function CaracteristicasPrincipales2() {
    const [formData, setFormData] = useState({
        numeroPlantas: 0,               // Nº de plantas
        tipoPiso: '',                   // Tipo de piso
        tipoInmueble: '',               // Tipo de piso/Inmueble
        muebles: '',                    // Que muebles tiene
        otrasCaracteristicas: []        // Otras características (мульти таңдау)
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

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            otrasCaracteristicas: checked
                ? [...prev.otrasCaracteristicas, value]
                : prev.otrasCaracteristicas.filter(item => item !== value)
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
            navigate('/dormitorios1');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData,
            }, { merge: true });
            navigate('/caracteristicas-principales1');
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            
            {/* Nº de plantas */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Nº de plantas:</span>
                <input
                    type="number"
                    name="numeroPlantas"
                    min="0"
                    value={formData.numeroPlantas}
                    onChange={handleChange}
                />
            </div>

            {/* Tipo de piso */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Tipo de piso:</span>
                <input
                    type="text"
                    name="tipoPiso"
                    placeholder="escribe"
                    value={formData.tipoPiso}
                    onChange={handleChange}
                />
            </div>

            {/* Tipo de piso/Inmueble */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Tipo de piso/Inmueble:</span>
                <input
                    type="text"
                    name="tipoInmueble"
                    placeholder="escribe"
                    value={formData.tipoInmueble}
                    onChange={handleChange}
                />
            </div>

            {/* Que muebles tiene */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Que muebles tiene:</span>
                <input
                    type="text"
                    name="muebles"
                    placeholder="escribe"
                    value={formData.muebles}
                    onChange={handleChange}
                />
            </div>

            {/* Otras características */}
            <div className="input-item">
            <div className="icono">&#128203;</div>
                <span className="input-label">Otras características:</span>
                <div className="checkbox-group">
                    {["Elevador", "Aire acondicionado", "Accesibilidad", "Ventiladores de techo", "Radiadores", "Chimenea", "Lavadora", "Secadora", "Cuarto de coladas", "Está amueblado"].map((caracteristica) => (
                        <label key={caracteristica}>
                            <input
                                type="checkbox"
                                value={caracteristica}
                                checked={formData.otrasCaracteristicas.includes(caracteristica)}
                                onChange={handleCheckboxChange}
                            />
                            {caracteristica}
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
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

export default CaracteristicasPrincipales2;
