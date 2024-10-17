import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Dormitorios1.css'; // Archivo de estilos

function Dormitorios1() {
    const [formData, setFormData] = useState({
        ocupacionMaxima: '',
        numeroHabitaciones: '',
        numeroSofasCamas: '',
        tipoArmario: '',
        tiposCamas: []
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
                    setFormData(prev => ({ ...prev, ...data.dormitorio })); // Carga datos del objeto 'dormitorio'
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
            navigate('/caracteristicas-principales5'); // Navega a la página anterior
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
                <div className="input-item">
                    <div className="icono">&#128190;</div>
                    <label>Tipo de armarios:</label>
                    <select name="tipoArmario" value={formData.tipoArmario} onChange={handleChange}>
                        <option value="">Seleccionar armario</option>
                        <option value="Armario de esquina">Armario de esquina</option>
                        <option value="Armario empotrado">Armario empotrado</option>
                        <option value="Vestidor">Vestidor</option>
                        <option value="Armarios modulares">Armarios modulares</option>
                        <option value="Armarios de bajo techo">Armarios de bajo techo</option>
                        <option value="No hay armarios">No hay armarios</option>
                    </select>
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
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default Dormitorios1;
