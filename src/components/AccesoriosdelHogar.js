import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './AccesoriosdelHogar.css'; // Стильдер файлы

function AccesoriosdelHogar() {
    const [formData, setFormData] = useState({
        entradaIndependiente: '',
        chimenea: '',
        cajaFuerte: '',
        minibar: '',
        ventiladorTecho: '',
        tipoLavadora: '',
        tipoTV: '',
        conexionInternet: ''
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
                    setFormData(prev => ({ ...prev, ...data.accesorios })); // Cargar datos del objeto 'accesorios'
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
                accesorios: formData // Guarda todo el objeto formData bajo 'accesorios'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicasadicionalesdelpiso1'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                accesorios: formData // Guarda todo el objeto formData bajo 'accesorios'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/cocina1'); // Navega a la página anterior
        }
    };

    return (
        <div className="accesorios-container">
            <h1>Accesorios del Hogar</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Entrada Independiente?</label>
                    <select name="entradaIndependiente" value={formData.entradaIndependiente} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Tiene Chimenea?</label>
                    <select name="chimenea" value={formData.chimenea} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Tiene Caja Fuerte?</label>
                    <select name="cajaFuerte" value={formData.cajaFuerte} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Tiene Minibar?</label>
                    <select name="minibar" value={formData.minibar} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Ventilador Techo?</label>
                    <select name="ventiladorTecho" value={formData.ventiladorTecho} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Tipo Lavadora?</label>
                    <select name="tipoLavadora" value={formData.tipoLavadora} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Lavadora">Lavadora</option>
                        <option value="Lavadora y Secadora">Lavadora y Secadora</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Tipo TV?</label>
                    <select name="tipoTV" value={formData.tipoTV} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="LED">LED</option>
                        <option value="Plasma">Plasma</option>
                        <option value="LCD">LCD</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>Conexión Internet?</label>
                    <select name="conexionInternet" value={formData.conexionInternet} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Wifi">Wifi</option>
                        <option value="Ethernet">Ethernet</option>
                        <option value="USB">USB</option>
                    </select>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => navigate('/cocina1')}>&#8592;</button>
                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default AccesoriosdelHogar;
