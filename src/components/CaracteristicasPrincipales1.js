import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracteristicasPrincipales1.css'; // Nueva hoja de estilos

function CaracteristicasPrincipales1() {
    const [formData, setFormData] = useState({
        ocupacionMaxima: '',
        numeroHabitaciones: '',
        numeroCamas: '',
        numeroBanos: '',
        numeroSofacama: '',
        area: '',
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
                    setFormData(prev => ({ ...prev, ...data.caracteristicas })); // Cargar los datos
                }
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Actualiza el estado
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristicas'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales2'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristicas'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/informacion-general2'); // Navega a la página anterior
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128102;</div>
                    <input
                        type="text"
                        name="ocupacionMaxima"
                        placeholder="Ocupación Máxima"
                        value={formData.ocupacionMaxima}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128713;</div>
                    <input
                        type="text"
                        name="numeroHabitaciones"
                        placeholder="Nro habitaciones"
                        value={formData.numeroHabitaciones}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128715;</div>
                    <input
                        type="text"
                        name="numeroCamas"
                        placeholder="Nro camas"
                        value={formData.numeroCamas}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128703;</div>
                    <input
                        type="text"
                        name="numeroBanos"
                        placeholder="Nro baños"
                        value={formData.numeroBanos}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128752;</div>
                    <input
                        type="text"
                        name="numeroSofacama"
                        placeholder="Nro sofacama"
                        value={formData.numeroSofacama}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128204;</div>
                    <input
                        type="text"
                        name="area"
                        placeholder="Área m²"
                        value={formData.area}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>←</button>
                <button className="nav-button" onClick={handleNext}>→</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales1;
