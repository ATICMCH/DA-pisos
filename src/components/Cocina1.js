import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Cocina1.css'; // Стильдер файлы

function Cocina1() {
    const [formData, setFormData] = useState({
        tipoCocina: '',
        tipoFuego: '',
        tipoCafetera: '',
        freidora: '',
        horno: '',
        menaje: '',
        microondas: '',
        mobiliario: '',
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
                    setFormData(prev => ({ ...prev, ...data.cocina })); // Carga datos del objeto 'cocina'
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
                cocina: formData, // Guarda todo el objeto formData bajo 'cocina'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/accesoriosdelhogar'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                cocina: formData, // Guarda todo el objeto formData bajo 'cocina'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/bano1'); // Navega a la página anterior
        }
    };

    return (
        <div className="info-general-container">
            <h1>Cocina</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#127859;</div>
                    <label>¿Tipo de cocina?</label>
                    <select name="tipoCocina" value={formData.tipoCocina} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {[
                            'Cocina en isla',
                            'Cocina en forma de U',
                            'Cocinas tipo península',
                            'Cocina americana',
                            'Cocina en L',
                            'Cocina en línea'
                        ].map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128296;</div>
                    <label>¿Qué tipo de fuego hay?</label>
                    <select name="tipoFuego" value={formData.tipoFuego} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {['Inducción', 'Vitrocerámica', 'Mixta', 'Gas'].map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#9749;</div>
                    <label>¿Tipo de cafetera?</label>
                    <select name="tipoCafetera" value={formData.tipoCafetera} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {['Cápsulas', 'Italiana', 'Francesa'].map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#129371;</div>
                    <label>¿Tiene freidora?</label>
                    <select name="freidora" value={formData.freidora} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128263;</div>
                    <label>¿Tiene horno?</label>
                    <select name="horno" value={formData.horno} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#129467;</div>
                    <label>¿Tiene menaje?</label>
                    <select name="menaje" value={formData.menaje} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128269;</div>
                    <label>¿Qué menaje tiene?</label>
                    <input
                        type="text"
                        name="mobiliario"
                        value={formData.mobiliario}
                        onChange={handleChange}
                        placeholder="Escribir"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128206;</div>
                    <label>¿Tiene microondas?</label>
                    <select name="microondas" value={formData.microondas} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
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

export default Cocina1;
