import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Salon1.css'; // Стильдер файлы

function Salon1() {
    const [formData, setFormData] = useState({
        television: '',
        sofa: '',
        tipoSofa: '',
        tipoSalon: '',
        muebles: ''
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
                    setFormData(prev => ({ ...prev, ...data.salon })); // Carga datos del objeto 'salon'
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
                salon: formData, // Guarda todo el objeto formData bajo 'salon'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/bano1'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                salon: formData, // Guarda todo el objeto formData bajo 'salon'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/dormitorios2'); // Navega a la página anterior
        }
    };

    return (
        <div className="info-general-container">
            <h1>Salón</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128250;</div>
                    <label>¿Tiene televisión?</label>
                    <select name="television" value={formData.television} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128717;</div>
                    <label>¿Tiene sofá?</label>
                    <select name="sofa" value={formData.sofa} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128187;</div>
                    <label>¿Qué tipo de sofá tiene?</label>
                    <select name="tipoSofa" value={formData.tipoSofa} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {[
                            'Chaise Longue',
                            'Rinconero',
                            'Modular',
                            'En línea',
                            'Sofá cama',
                            'Reclinable',
                            'De almacenaje',
                            'Sofá de masajes'
                        ].map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128219;</div>
                    <label>¿Tipo de salón?</label>
                    <select name="tipoSalon" value={formData.tipoSalon} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Salón">Salón</option>
                        <option value="Salón comedor">Salón comedor</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128161;</div>
                    <label>¿Qué muebles tiene el salón?</label>
                    <input
                        type="text"
                        name="muebles"
                        value={formData.muebles}
                        onChange={handleChange}
                        placeholder="escribir"
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

export default Salon1;
