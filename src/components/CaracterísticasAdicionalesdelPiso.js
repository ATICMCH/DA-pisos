import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './CaracterísticasAdicionalesdelPiso.css';

function CaracteristicasAdicionalesdelPiso() {
    const [formData, setFormData] = useState({
        nroPlazas: '0',
        adicionales: [],
        piscina: []
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
                    setFormData(prev => ({ ...prev, ...data.adicionales }));
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
                adicionales: formData
            }, { merge: true });
            navigate('/otros');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                adicionales: formData
            }, { merge: true });
            navigate('/accesoriosdelhogar');
        }
    };

    return (
        <div className="caracteristicas-adicionales-container">
            <h1>Características Adicionales del Piso</h1>
            <div className="form-group">

                {/* Nro de Plazas */}
                <div className="input-item">
                    <div className="icono">&#128203;</div>
                    <label>Nro de Plazas:</label>
                    <input
                        type="number"
                        name="nroPlazas"
                        value={formData.nroPlazas}
                        onChange={handleChange}
                        min="0"
                    />
                </div>

                {/* Tienes (parking, alarma, alarma incendios, etc.) */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Tienes:</label>
                    <div className="checkbox-group">
                        {["parking", "alarma", "alarma incendios", "balcón", "terraza", "patio interior", "jardín"].map(item => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="adicionales"
                                    value={item}
                                    checked={formData.adicionales.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Piscina (multiple selection) */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Piscina:</label>
                    <div className="checkbox-group">
                        {["No", "Sí privada", "Sí comunitaria"].map(option => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    name="piscina"
                                    value={option}
                                    checked={formData.piscina.includes(option)}
                                    onChange={handleCheckboxChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
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

export default CaracteristicasAdicionalesdelPiso;
