import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 
import './CaracterísticasAdicionalesdelPiso1.css'; // СSS файл

function CaracteristicasAdicionalesdelPiso1() {
    const [formData, setFormData] = useState({
        tieneParking: '',
        nroPlazas: '',
        tieneAlarma: '',
        alarmaIncendios: '',
        calefaccion: ''
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
                    setFormData(prev => ({ ...prev, ...data.adicionales }));
                }
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                adicionales: formData 
            }, { merge: true });
            navigate('/caracteristicasadicionalesdelpiso2');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                adicionales: formData 
            }, { merge: true });
            navigate('/accesoriosdelhogar');
        }
    };

    return (
        <div className="caracteristicas-adicionales-container">
            <h1>Características Adicionales del Piso</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128665;</div>
                    <label>Tiene Parking?</label>
                    <select name="tieneParking" value={formData.tieneParking} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128203;</div>
                    <label>Nro de Plazas:</label>
                    <input
                        type="text"
                        name="nroPlazas"
                        value={formData.nroPlazas}
                        onChange={handleChange}
                        placeholder="Número de plazas"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128274;</div>
                    <label>Tiene Alarma?</label>
                    <select name="tieneAlarma" value={formData.tieneAlarma} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128273;</div>
                    <label>Alarma Incendios?</label>
                    <select name="alarmaIncendios" value={formData.alarmaIncendios} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128293;</div>
                    <label>Calefacción?</label>
                    <select name="calefaccion" value={formData.calefaccion} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Individual">Individual</option>
                        <option value="Central">Central</option>
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

export default CaracteristicasAdicionalesdelPiso1;
