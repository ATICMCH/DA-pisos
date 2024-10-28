import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Dormitorios1.css'; // Archivo de estilos

function Dormitorios1() {
    const [formData, setFormData] = useState({
        ocupacionMaxima: '0', // Set default to '0'
        numeroHabitaciones: '0', // Set default to '0'
        numeroSofasCamas: '0', // Set default to '0'
        tiposCamas: [],
        observacionesCamas: '' // Новое поле для "Observaciones sobre las camas y el sofá cama"
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
                    setFormData(prev => ({
                        ...prev, 
                        ...data.dormitorio,
                        ocupacionMaxima: data.dormitorio?.ocupacionMaxima || '0', // Default to '0' if empty
                        numeroHabitaciones: data.dormitorio?.numeroHabitaciones || '0', // Default to '0' if empty
                        numeroSofasCamas: data.dormitorio?.numeroSofasCamas || '0', // Default to '0' if empty
                        observacionesCamas: data.dormitorio?.observacionesCamas || '' // Observaciones sobre las camas y el sofá cama
                    })); 
                }
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Actualiza el estado con el campo correspondiente
    };

    const handleTiposCamasChange = (value) => {
        setFormData(prev => ({
            ...prev,
            tiposCamas: prev.tiposCamas.includes(value)
                ? prev.tiposCamas.filter(item => item !== value)
                : [...prev.tiposCamas, value]
        }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                dormitorio: formData, // Guarda todo el objeto formData bajo 'dormitorio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/dormitorios2'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                dormitorio: formData, // Guarda todo el objeto formData bajo 'dormitorio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales2'); // Navega a la página anterior
        }
    };

    return (
        <div className="dormitorios-container">
            <h1>Características de Dormitorios</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128717;</div>
                    <label>Ocupación máxima:</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        name="ocupacionMaxima"
                        value={formData.ocupacionMaxima}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128721;</div>
                    <label>Nº de habitaciones:</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        name="numeroHabitaciones"
                        value={formData.numeroHabitaciones}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128522;</div>
                    <label>Nº de sofás camas:</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        name="numeroSofasCamas"
                        value={formData.numeroSofasCamas}
                        onChange={handleChange}
                    />
                </div>

                {/* Nuevo campo para Observaciones sobre las camas y el sofá cama */}
                <div className="input-item">
                    <div className="icono">&#128221;</div>
                    <label>Observaciones:</label>
                    <textarea
                        name="observacionesCamas"
                        placeholder="Escriba observaciones"
                        value={formData.observacionesCamas}
                        onChange={handleChange}
                        rows="4"
                        cols="30"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128719;</div>
                    <label>Tipos de camas:</label>
                    <div className="checkbox-group">
                        {[
                            "Cama individual",
                            "Cama de matrimonio",
                            "Cama Queen",
                            "Cama King",
                            "Sofá cama",
                            "Cama nido",
                            "Cama plegable"
                        ].map(tipo => (
                            <div key={tipo}>
                                <input
                                    type="checkbox"
                                    id={tipo}
                                    value={tipo}
                                    checked={formData.tiposCamas.includes(tipo)}
                                    onChange={() => handleTiposCamasChange(tipo)}
                                />
                                <label htmlFor={tipo}>{tipo}</label>
                            </div>
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

export default Dormitorios1;
