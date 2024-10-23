import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracteristicasPrincipales2.css'; // Estilo de archivo

function CaracteristicasPrincipales2() {
    const [formData, setFormData] = useState({
        elevador: '',                // Elevador
        calefaccion: '',             // Calefacción
        aireAcondicionado: '',       // Aire acondicionado
        accesibilidad: '',           // Accesibilidad
        nroEstancias: '',            // Número de estancias
        puertasConCerraduras: '',    // Puertas con cerraduras
    });

    const navigate = useNavigate(); // Para la navegación

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({ ...prev, ...data.caracteristicas })); // Carga los datos del usuario
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
                caracteristicas: formData, // Guarda todo el objeto formData bajo caracteristicas
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales3'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo caracteristicas
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales1'); // Navega a la página anterior
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128221;</div>
                    <label>Elevador?</label>
                    <select name="elevador" value={formData.elevador} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128187;</div>
                    <label>Calefacción?</label>
                    <select name="calefaccion" value={formData.calefaccion} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10054;</div>
                    <label>Aire acondicionado?</label>
                    <select name="aireAcondicionado" value={formData.aireAcondicionado} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128695;</div>
                    <label>Accesibilidad?</label>
                    <select name="accesibilidad" value={formData.accesibilidad} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128296;</div>
                    <label>Nro de Estancias</label>
                    <input
                        type="text"
                        name="nroEstancias" // Sin prefijo numérico
                        placeholder="escribe"
                        value={formData.nroEstancias}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128274;</div>
                    <label>Puertas con cerraduras?</label>
                    <select name="puertasConCerraduras" value={formData.puertasConCerraduras} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>←</button>
                <button className="nav-button" onClick={handleNext}>→</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales2;
