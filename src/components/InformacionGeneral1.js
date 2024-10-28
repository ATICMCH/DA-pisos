import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './InformacionGeneral1.css';

function InformacionGeneral1() {
    const [formData, setFormData] = useState({
        codigo: '',
        nombrePiso: '',
        estado: [],
        pais: [],
        ciudad: '',
        observaciones: '',
        codigoPostal: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter(item => item !== value)
                : [...prev[name], value]
        }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true });
            navigate('/informacion-general2');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true });
            navigate('/');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Información GENERAL</h1>
            <div className="form-group">
                {/* Código del Piso */}
                <div className="input-item">
                    <div className="icono">&#128196;</div>
                    <div className="input-field">
                        <span className="input-label">Código del Piso:</span>
                        <input
                            type="text"
                            name="codigo"
                            placeholder="escribe"
                            value={formData.codigo}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Nombre del Piso */}
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <div className="input-field">
                        <span className="input-label">Nombre del Piso:</span>
                        <input
                            type="text"
                            name="nombrePiso"
                            placeholder="escribe"
                            value={formData.nombrePiso}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Estado - Checkbox */}
                <div className="input-item">
                    <div className="icono">&#127793;</div>
                    <label>Seleccionar estado:</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="estado"
                                value="alto"
                                checked={formData.estado.includes("alto")}
                                onChange={handleCheckboxChange}
                            />
                            Alto
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="estado"
                                value="bajo"
                                checked={formData.estado.includes("bajo")}
                                onChange={handleCheckboxChange}
                            />
                            Bajo
                        </label>
                    </div>
                </div>
                {/* País - Checkbox */}
                <div className="input-item">
                    <div className="icono">&#127760;</div>
                    <label>Seleccionar país:</label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="pais"
                                value="España"
                                checked={formData.pais.includes("España")}
                                onChange={handleCheckboxChange}
                            />
                            España
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="pais"
                                value="Italia"
                                checked={formData.pais.includes("Italia")}
                                onChange={handleCheckboxChange}
                            />
                            Italia
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="pais"
                                value="Francia"
                                checked={formData.pais.includes("Francia")}
                                onChange={handleCheckboxChange}
                            />
                            Francia
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="pais"
                                value="Portugal"
                                checked={formData.pais.includes("Portugal")}
                                onChange={handleCheckboxChange}
                            />
                            Portugal
                        </label>
                    </div>
                </div>
                {/* Ciudad */}
                <div className="input-item">
                    <div className="icono">&#127961;</div>
                    <label>Seleccionar ciudad:</label>
                    <select name="ciudad" value={formData.ciudad} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas de Gran Canaria', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Eixample', 'L\'Hospitalet de Llobregat', 'A Coruña', 'Vitoria-Gasteiz', 'Granada', 'Elche', 'Oviedo', 'Santa Cruz de Tenerife', 'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 'Móstoles', 'Alcalá de Henares', 'Pamplona', 'Fuenlabrada', 'Almería', 'San Sebastián', 'Leganés', 'Burgos', 'Santander', 'Castellón de la Plana', 'Albacete', 'Alcorcón', 'Getafe', 'Salamanca', 'Huelva', 'Logroño', 'Badajoz', 'Tarragona', 'Lleida', 'Marbella', 'Mataró', 'Dos Hermanas', 'Parla', 'Torrejón de Ardoz', 'Orense (Ourense)', 'Reus'
].map((ciudad) => (
                            <option key={ciudad} value={ciudad}>{ciudad}</option>
                        ))}
                    </select>
                </div>
                {/* Observaciones */}
                <div className="input-item">
                    <div className="icono">&#128196;</div>
                    <div className="input-field">
                        <span className="input-label">Observaciones:</span>
                        <input
                            type="text"
                            name="observaciones"
                            placeholder="escribe"
                            value={formData.observaciones}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Código Postal */}
                <div className="input-item">
                    <div className="icono">C.P.</div>
                    <div className="input-field">
                        <span className="input-label">Código Postal:</span>
                        <input
                            type="text"
                            name="codigoPostal"
                            placeholder="escribe"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            {/* Navigation Buttons and Dropdown in the Middle */}
            <div className="navigation-container">
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

export default InformacionGeneral1;
