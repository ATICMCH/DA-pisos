import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracteristicasPrincipales3.css'; // Жаңа стильдер файлы

function CaracteristicasPrincipales3() {
    const [formData, setFormData] = useState({
        numeroPlant: '',
        numeroAseos: '',
        observacionesCamas: '',
        observacionesBanos: '',
        observacionesSofacamas: '',
        tipoPiso: '',
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
                    setFormData(prev => ({ ...prev, ...data.caracteristicas })); // Cargar datos del objeto 'informacion'
                }
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Actualiza el estado con el campo correspondiente
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales4');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales2');
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#8593;</div>
                    <input
                        type="text"
                        name="numeroPlant"
                        placeholder="Nro de Plantas"
                        value={formData.numeroPlant}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128703;</div>
                    <input
                        type="text"
                        name="numeroAseos"
                        placeholder="Nro aseos"
                        value={formData.numeroAseos}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128172;</div>
                    <input
                        type="text"
                        name="observacionesCamas"
                        placeholder="Observaciones de camas"
                        value={formData.observacionesCamas}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128172;</div>
                    <input
                        type="text"
                        name="observacionesBanos"
                        placeholder="Observaciones de baños"
                        value={formData.observacionesBanos}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128172;</div>
                    <input
                        type="text"
                        name="observacionesSofacamas"
                        placeholder="Observaciones de sofacama"
                        value={formData.observacionesSofacamas}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128218;</div>
                    <input
                        type="text"
                        name="tipoPiso"
                        placeholder="Tipo de Piso/Inmueble"
                        value={formData.tipoPiso}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales3;
