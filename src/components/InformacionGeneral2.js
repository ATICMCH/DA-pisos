import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './InformacionGeneral2.css'; // Стильдер файлы

function InformacionGeneral2() {
    const [formData, setFormData] = useState({
        calle: '',
        numeroEdificio: '', 
        numeroPiso: '', 
        zonas: '', 
        ubicacionMapa: '',
        tipoVista: '', 
        clasePiso: '', 
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
                    setFormData(prev => ({ ...prev, ...data.informacion })); // Cargar todos los datos del usuario bajo 'informacion'
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
                informacion: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/caracteristicas-principales1');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData, // Guarda todo el objeto formData bajo 'informacion'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/informacion-general1');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Información GENERAL</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#127961;</div>
                    <input
                        type="text"
                        name="calle"
                        placeholder="Calle/Avenida"
                        value={formData.calle}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <input
                        type="text"
                        name="numeroEdificio"
                        placeholder="Nro edificio"
                        value={formData.numeroEdificio}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128210;</div>
                    <input
                        type="text"
                        name="numeroPiso"
                        placeholder="Nro piso"
                        value={formData.numeroPiso}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#127979;</div>
                    <input
                        type="text"
                        name='zonas'
                        placeholder="Zonas"
                        value={formData.zonas}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128205;</div>
                    <input
                        type="text"
                        name='ubicacionMapa'
                        placeholder="Ubicación mapa"
                        value={formData.ubicacionMapa}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128065;</div>
                    <label>Tipo Vista:</label>
                    <select name="tipoVista" value={formData.tipoVista} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Interior">Interior</option>
                        <option value="Exterior">Exterior</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128187;</div>
                    <label>Clase Piso:</label>
                    <select name="clasePiso" value={formData.clasePiso} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Studio">Studio</option>
                        <option value="Casa">Casa</option>
                        <option value="Finca">Finca</option>
                        <option value="Aparthotel">Aparthotel</option>
                        <option value="Por Habitaciones">Por Habitaciones</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Duplex">Duplex</option>
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

export default InformacionGeneral2;
