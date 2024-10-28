import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './AccesoriosdelHogar.css';

function AccesoriosdelHogar() {
    const [formData, setFormData] = useState({
        entradaIndependiente: [],
        cajaFuerteMinibar: [],
        tipoTV: [],
        conexionInternet: []
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
                    setFormData(prev => ({ ...prev, ...data.accesorios }));
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

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                accesorios: formData
            }, { merge: true });
            navigate('/caracteristicasadicionalesdelpiso');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                accesorios: formData
            }, { merge: true });
            navigate('/cocina');
        }
    };

    return (
        <div className="accesorios-container">
            <h1>Accesorios del Hogar</h1>
            <div className="form-group">

                {/* Entrada Independiente */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Entrada Independiente?</label>
                    <div className="checkbox-group">
                        {["Si", "No"].map(option => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    name="entradaIndependiente"
                                    value={option}
                                    checked={formData.entradaIndependiente.includes(option)}
                                    onChange={handleCheckboxChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tienes (Caja Fuerte, Minibar) */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Tienes:</label>
                    <div className="checkbox-group">
                        {["Caja Fuerte", "Minibar"].map(item => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="cajaFuerteMinibar"
                                    value={item}
                                    checked={formData.cajaFuerteMinibar.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tipo TV */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Tipo TV?</label>
                    <div className="checkbox-group">
                        {["LED", "Plasma", "LCD"].map(type => (
                            <label key={type}>
                                <input
                                    type="checkbox"
                                    name="tipoTV"
                                    value={type}
                                    checked={formData.tipoTV.includes(type)}
                                    onChange={handleCheckboxChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Conexión Internet */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Conexión Internet?</label>
                    <div className="checkbox-group">
                        {["Wifi", "Ethernet", "USB"].map(connection => (
                            <label key={connection}>
                                <input
                                    type="checkbox"
                                    name="conexionInternet"
                                    value={connection}
                                    checked={formData.conexionInternet.includes(connection)}
                                    onChange={handleCheckboxChange}
                                />
                                {connection}
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

export default AccesoriosdelHogar;
