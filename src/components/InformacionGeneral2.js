// InformacionGeneral2.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './InformacionGeneral2.css';

function InformacionGeneral2() {
    const [formData, setFormData] = useState({
        calle: '',
        numeroEdificio: '', 
        numeroPiso: '', 
        zonas: '', 
        ubicacionMapa: '',
        tipoVista: [], // Массив, бірнеше мәндерді сақтау үшін
        clasePiso: [], // Массив, бірнеше мәндерді сақтау үшін
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
                    setFormData(prev => ({ ...prev, ...data.informacion }));
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
                ? [...prev[name], value] // Егер белгіленсе, массивке қосу
                : prev[name].filter(item => item !== value) // Егер алынса, массивтен алып тастау
        }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true });
            navigate('/caracteristicas-principales1');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true });
            navigate('/informacion-general1');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Información GENERAL</h1>
            <div className="form-group">
                {/* Calle */}
                <div className="input-item">
                    <div className="icono">&#127961;</div>
                    <div className="input-field">
                        <span className="input-label">Calle/Avenida:</span>
                        <input
                            type="text"
                            name="calle"
                            placeholder="escribe"
                            value={formData.calle}
                            onChange={(e) => setFormData(prev => ({ ...prev, calle: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Número de Edificio */}
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <div className="input-field">
                        <span className="input-label">Nro edificio:</span>
                        <input
                            type="text"
                            name="numeroEdificio"
                            placeholder="escribe"
                            value={formData.numeroEdificio}
                            onChange={(e) => setFormData(prev => ({ ...prev, numeroEdificio: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Número de Piso */}
                <div className="input-item">
                    <div className="icono">&#128210;</div>
                    <div className="input-field">
                        <span className="input-label">Nro piso:</span>
                        <input
                            type="text"
                            name="numeroPiso"
                            placeholder="escribe"
                            value={formData.numeroPiso}
                            onChange={(e) => setFormData(prev => ({ ...prev, numeroPiso: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Zonas */}
                <div className="input-item">
                    <div className="icono">&#127979;</div>
                    <div className="input-field">
                        <span className="input-label">Zonas:</span>
                        <input
                            type="text"
                            name="zonas"
                            placeholder="escribe"
                            value={formData.zonas}
                            onChange={(e) => setFormData(prev => ({ ...prev, zonas: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Ubicación en Mapa */}
                <div className="input-item">
                    <div className="icono">&#128205;</div>
                    <div className="input-field">
                        <span className="input-label">Ubicación mapa:</span>
                        <input
                            type="text"
                            name="ubicacionMapa"
                            placeholder="escribe"
                            value={formData.ubicacionMapa}
                            onChange={(e) => setFormData(prev => ({ ...prev, ubicacionMapa: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Tipo de Vista */}
                <div className="input-item">
                    <div className="icono">&#128065;</div>
                    <label>Tipo Vista:</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="tipoVista"
                                value="Interior"
                                checked={formData.tipoVista.includes("Interior")}
                                onChange={handleCheckboxChange}
                            />
                            Interior
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="tipoVista"
                                value="Exterior"
                                checked={formData.tipoVista.includes("Exterior")}
                                onChange={handleCheckboxChange}
                            />
                            Exterior
                        </label>
                    </div>
                </div>
                {/* Clase de Piso */}
                <div className="input-item">
                    <div className="icono">&#128187;</div>
                    <label>Clase Piso:</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Apartamento"
                                checked={formData.clasePiso.includes("Apartamento")}
                                onChange={handleCheckboxChange}
                            />
                            Apartamento
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Studio"
                                checked={formData.clasePiso.includes("Studio")}
                                onChange={handleCheckboxChange}
                            />
                            Studio
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Casa"
                                checked={formData.clasePiso.includes("Casa")}
                                onChange={handleCheckboxChange}
                            />
                            Casa
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Finca"
                                checked={formData.clasePiso.includes("Finca")}
                                onChange={handleCheckboxChange}
                            />
                            Finca
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Aparthotel"
                                checked={formData.clasePiso.includes("Aparthotel")}
                                onChange={handleCheckboxChange}
                            />
                            Aparthotel
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Por Habitaciones"
                                checked={formData.clasePiso.includes("Por Habitaciones")}
                                onChange={handleCheckboxChange}
                            />
                            Por Habitaciones
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Oficina"
                                checked={formData.clasePiso.includes("Oficina")}
                                onChange={handleCheckboxChange}
                            />
                            Oficina
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="clasePiso"
                                value="Duplex"
                                checked={formData.clasePiso.includes("Duplex")}
                                onChange={handleCheckboxChange}
                            />
                            Duplex
                        </label>
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

export default InformacionGeneral2;
