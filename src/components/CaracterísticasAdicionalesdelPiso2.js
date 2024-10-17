import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './CaracterísticasAdicionalesdelPiso2.css'; // Стильдер файлы

function CaracteristicasAdicionalesdelPiso2() {
    const [formData, setFormData] = useState({
        tipoCalefaccion: '',
        tieneBalcon: '',
        tieneTerraza: '',
        patioInterior: '',
        tieneJardin: '',
        tienePiscina: ''
    });

    const navigate = useNavigate(); // Пайдалану үшін useNavigate хукасын қосамыз

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({ ...prev, ...data.adicionales })); // Cargar datos del objeto 'adicionales'
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
                adicionales: formData // Guarda todo el objeto formData bajo 'adicionales'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicasdelaurbanizacionoedificio'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                adicionales: formData // Guarda todo el objeto formData bajo 'adicionales'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicasadicionalesdelpiso1'); // Navega a la página anterior
        }
    };

    return (
        <div className="caracteristicas-adicionales-container">
            <h1>Características Adicionales del Piso</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128293;</div>
                    <label>Tipo Calefacción?</label>
                    <select name="tipoCalefaccion" value={formData.tipoCalefaccion} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Gas">Gas</option>
                        <option value="Eléctrica">Eléctrica</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128249;</div>
                    <label>Tiene Balcón?</label>
                    <select name="tieneBalcon" value={formData.tieneBalcon} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <label>Tiene Terraza?</label>
                    <select name="tieneTerraza" value={formData.tieneTerraza} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127957;</div>
                    <label>Patio Interior?</label>
                    <select name="patioInterior" value={formData.patioInterior} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127794;</div>
                    <label>Tiene Jardín?</label>
                    <select name="tieneJardin" value={formData.tieneJardin} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#127942;</div>
                    <label>Tiene Piscina?</label>
                    <select name="tienePiscina" value={formData.tienePiscina} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="No">No</option>
                        <option value="Si, privada">Sí, privada</option>
                        <option value="Si, comunitaria">Sí, comunitaria</option>
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

export default CaracteristicasAdicionalesdelPiso2;
