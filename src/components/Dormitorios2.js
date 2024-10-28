import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; 
import './Dormitorios2.css';

function Dormitorios2() {
    const [formData, setFormData] = useState({
        tipoArmarios: [],
        habitacionConBano: '',         // Ahora es un campo de texto
        ropaDeCama: [],
        mesillasDeNoche: [],
        otrosMuebles: '',
        cerraduraHabitaciones: []
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
                    setFormData(prev => ({ ...prev, ...data.dormitorio }));
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
                dormitorio: formData,
            }, { merge: true });
            navigate('/salon');
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                dormitorio: formData,
            }, { merge: true });
            navigate('/dormitorios1');
        }
    };

    return (
        <div className="info-general-container">
            <h1>Características de Dormitorios</h1>
            <div className="form-group">
                
                {/* Tipo de armarios */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>Tipo de armarios:</label>
                    <div className="checkbox-group">
                        {["Armario de esquina", "Armario empotrado", "Vestidas", "Armarios modulares", "Armarios de bajo techo", "No hay armarios"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="tipoArmarios"
                                    value={item}
                                    checked={formData.tipoArmarios.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Habitación con baño o aseo */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Habitación con baño o aseo?</label>
                    <input
                        type="text"
                        name="habitacionConBano"
                        value={formData.habitacionConBano}
                        onChange={handleChange}
                        placeholder="escribe"
                    />
                </div>

                {/* Ropa de cama */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Ropa de cama?</label>
                    <div className="checkbox-group">
                        {["Sí", "No"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="ropaDeCama"
                                    value={item}
                                    checked={formData.ropaDeCama.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Mesillas de noche */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Hay mesillas de noche?</label>
                    <div className="checkbox-group">
                        {["Sí", "No"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="mesillasDeNoche"
                                    value={item}
                                    checked={formData.mesillasDeNoche.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Otros muebles */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Hay otros muebles a parte en la habitación?</label>
                    <input
                        type="text"
                        name="otrosMuebles"
                        value={formData.otrosMuebles}
                        onChange={handleChange}
                        placeholder="escribe"
                    />
                </div>

                {/* Cerradura de las habitaciones */}
                <div className="input-item">
                <div className="icono">&#128203;</div>
                    <label>¿Tiene cerradura las habitaciones?</label>
                    <div className="checkbox-group">
                        {["Sí", "No"].map((item) => (
                            <label key={item}>
                                <input
                                    type="checkbox"
                                    name="cerraduraHabitaciones"
                                    value={item}
                                    checked={formData.cerraduraHabitaciones.includes(item)}
                                    onChange={handleCheckboxChange}
                                />
                                {item}
                            </label>
                        ))}
                    </div>
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

export default Dormitorios2;
