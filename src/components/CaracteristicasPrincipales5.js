import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracteristicasPrincipales5.css'; // Archivo de estilos

function CaracteristicasPrincipales5() {
    const [formData, setFormData] = useState({
        centralOIndividual: '',
        lavadora: '',
        secadora: '',
        cuartoDeColadas: '',
        tipoEspacio: '',
        amueblado: '',
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
                    setFormData(prev => ({ ...prev, ...data.caracteristicas })); // Cargar datos del objeto 'caracteristicas'
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
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristicas'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/dormitorios1');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                caracteristicas: formData, // Guarda todo el objeto formData bajo 'caracteristicas'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales4');
        }
    };

    return (
        <div className="caracteristicas-container">
            <h1>Características Principales</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128296;</div>
                    <label>¿Es central o individual?</label>
                    <select name="centralOIndividual" value={formData.centralOIndividual} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Central comunidad">Central comunidad</option>
                        <option value="Individual">Individual</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128240;</div>
                    <label>¿Tiene lavadora?</label>
                    <select name="lavadora" value={formData.lavadora} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128240;</div>
                    <label>¿Tiene secadora?</label>
                    <select name="secadora" value={formData.secadora} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128240;</div>
                    <label>¿Tiene cuarto de coladas?</label>
                    <select name="cuartoDeColadas" value={formData.cuartoDeColadas} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128241;</div>
                    <label>¿Qué tipo de espacio es?</label>
                    <select name="tipoEspacio" value={formData.tipoEspacio} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Vivenda">Vivenda</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Local">Local</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128219;</div>
                    <label>¿Está amueblado?</label>
                    <select name="amueblado" value={formData.amueblado} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                        <option value="Medias">Medias</option>
                    </select>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default CaracteristicasPrincipales5;

