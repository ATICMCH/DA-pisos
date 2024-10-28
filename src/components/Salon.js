import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Salon.css';

function Salon() {
    const [formData, setFormData] = useState({
        tiene: [],
        tipoSofa: [],
        tipoSalon: [],
        muebles: ''
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
                    setFormData(prev => ({ ...prev, ...data.salon }));
                }
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
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
                salon: formData,
            }, { merge: true });
            navigate('/bano');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                salon: formData,
            }, { merge: true });
            navigate('/dormitorios2');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Salón</h1>
            <div className="form-group">

                {/* Tienes */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Tienes:</label>
                    <div className="checkbox-group">
                        {["Televisión", "Sofá", "Mesa de centro", "Mesa comedor"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="tiene"
                                    value={item}
                                    checked={formData.tiene.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tipo de sofá */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Qué tipo de sofá tiene?</label>
                    <div className="checkbox-group">
                        {[
                            'Chaise Longue',
                            'Rinconero',
                            'Modular',
                            'En línea',
                            'Sofá cama',
                            'Reclinable',
                            'De almacenaje',
                            'Sofá de masajes'
                        ].map(tipo => (
                            <label key={tipo}>
                                <input
                                    type="checkbox"
                                    name="tipoSofa"
                                    value={tipo}
                                    checked={formData.tipoSofa.includes(tipo)}
                                    onChange={handleCheckboxChange}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tipo de salón */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Tipo de salón?</label>
                    <div className="checkbox-group">
                        {["Salón", "Salón comedor"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="tipoSalon"
                                    value={item}
                                    checked={formData.tipoSalon.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Muebles */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Qué muebles tiene el salón?</label>
                    <input
                        type="text"
                        name="muebles"
                        value={formData.muebles}
                        onChange={handleChange}
                        placeholder="Escribe"
                    />
                </div>
            </div>

            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>

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

                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default Salon;
