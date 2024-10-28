import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Cocina.css';

function Cocina() {
    const [formData, setFormData] = useState({
        tipoCocina: [],
        tipoFuego: [],
        tipoCafetera: [],
        tiene: [],
        menaje: ''
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
                    setFormData(prev => ({ ...prev, ...data.cocina }));
                }
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                cocina: formData,
            }, { merge: true });
            navigate('/accesoriosdelhogar');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                cocina: formData,
            }, { merge: true });
            navigate('/bano');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Cocina</h1>
            <div className="form-group">

                {/* Tipo de cocina */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Tipo de cocina?</label>
                    <div className="checkbox-group">
                        {[
                            'Cocina en isla',
                            'Cocina en forma de U',
                            'Cocinas tipo península',
                            'Cocina americana',
                            'Cocina en L',
                            'Cocina en línea'
                        ].map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="checkbox"
                                    name="tipoCocina"
                                    value={tipo}
                                    checked={formData.tipoCocina.includes(tipo)}
                                    onChange={handleCheckboxChange}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tipo de fuego */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Qué tipo de fuego hay?</label>
                    <div className="checkbox-group">
                        {['Inducción', 'Vitrocerámica', 'Mixta', 'Gas'].map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="checkbox"
                                    name="tipoFuego"
                                    value={tipo}
                                    checked={formData.tipoFuego.includes(tipo)}
                                    onChange={handleCheckboxChange}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tipo de cafetera */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Tipo de cafetera?</label>
                    <div className="checkbox-group">
                        {['Cápsulas', 'Italiana', 'Francesa'].map((tipo) => (
                            <label key={tipo}>
                                <input
                                    type="checkbox"
                                    name="tipoCafetera"
                                    value={tipo}
                                    checked={formData.tipoCafetera.includes(tipo)}
                                    onChange={handleCheckboxChange}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tiene (Freidora, Horno, Menaje, Microondas) */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Tiene?</label>
                    <div className="checkbox-group">
                        {["Freidora", "Horno", "Menaje", "Microondas"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="tiene"
                                    value={item}
                                    checked={formData.tiene.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Menaje */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Qué menaje tiene?</label>
                    <input
                        type="text"
                        name="menaje"
                        value={formData.menaje}
                        onChange={handleChange}
                        placeholder="Escribir"
                    />
                </div>
            </div>

            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>&#8592;</button>

                <select className="page-select" onChange={(e) => e.target.value && navigate(e.target.value)}>
                    <option value="">Seleccionar página</option>
                    <option value="/">Login</option>
                    <option value="/register">Register</option>
                    <option value="/informacion-general1">Información General 1</option>
                    <option value="/informacion-general2">Información General 2</option>
                    <option value="/caracteristicas-principales1">Características Principales 1</option>
                    <option value="/caracteristicas-principales2">Características Principales 2</option>
                    <option value="/dormitorios1">Dormitorios 1</option>
                    <option value="/dormitorios2">Dormitorios 2</option>
                    <option value="/salon">Salón</option>
                    <option value="/bano">Baño</option>
                    <option value="/cocina">Cocina</option>
                    <option value="/accesoriosdelhogar">Accesorios del Hogar</option>
                    <option value="/caracteristicasadicionalesdelpiso">Características Adicionales del Piso</option>
                    <option value="/otros">Otros</option>
                    <option value="/finalpage">Final Page</option>
                </select>

                <button className="nav-button" onClick={handleNext}>&#8594;</button>
            </div>
        </div>
    );
}

export default Cocina;
