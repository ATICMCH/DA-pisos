import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Otros.css';

function Otros() {
    const [formData, setFormData] = useState({
        zonaUrbanizacion: [],
        urlImagen: '',
        urlMantenimiento: '',
        comentariosAdicionales: ''
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
                    setFormData(prev => ({ ...prev, ...data.otros }));
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
                otros: formData
            }, { merge: true });
            navigate('/finalpage');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                otros: formData
            }, { merge: true });
            navigate('/caracteristicasadicionalesdelpiso');
        }
    };

    return (
        <div className="otros-container">
            <h1>Características de la Urbanización o Edificio</h1>
            <div className="form-group">
                <div className="input-item">
                <div className="icono">&#9998;</div>
                    <label>Tienes:</label>
                    <div className="checkbox-group">
                        {["Zona Infantil", "Porteria", "SPA", "Gimnasio", "Zona BBQ"].map(item => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="zonaUrbanizacion"
                                    value={item}
                                    checked={formData.zonaUrbanizacion.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <h1>Plano del Apartamento</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128206;</div>
                    <span className="input-label">Url de la imagen:</span>
                    <input
                        type="text"
                        name="urlImagen"
                        placeholder="escribe"
                        value={formData.urlImagen}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h1>Acceso a Mantenimiento</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128206;</div>
                    <span className="input-label">Url sección de mantenimiento:</span>
                    <input
                        type="text"
                        name="urlMantenimiento"
                        placeholder="escribe"
                        value={formData.urlMantenimiento}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <h1>Comentarios Adicionales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#9998;</div>
                    <span className="input-label">Comentarios adicionales:</span>
                    <textarea
                        name="comentariosAdicionales"
                        placeholder="escribe"
                        value={formData.comentariosAdicionales}
                        onChange={handleChange}
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

export default Otros;
