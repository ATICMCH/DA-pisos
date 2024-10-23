import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // useNavigate импорттау
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore импорттау
import { auth, db } from '../firebase'; // Asegúrate de importar Firestore
import './Dormitorios2.css'; // СSS файл

function Dormitorios2() {
    const [formData, setFormData] = useState({
        habitacionConBano: '',
        ropaDeCama: '',
        mesillasDeNoche: '',
        otrosMuebles: '',
        cerraduraHabitaciones: ''
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
                    setFormData(prev => ({ ...prev, ...data.dormitorio })); // Carga datos del objeto 'dormitorio'
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
                dormitorio: formData, // Guarda todo el objeto formData bajo 'dormitorio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/salon1'); // Navega a la siguiente página
        }
    };

    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                dormitorio: formData, // Guarda todo el objeto formData bajo 'dormitorio'
            }, { merge: true }); // Merge para actualizar datos existentes
            navigate('/dormitorios1'); // Navega a la página anterior
        }
    };

    return (
        <div className="info-general-container">
            <h1>Características de Dormitorios</h1>
            <div className="form-group">
                <div className="input-item">
                    <div className="icono">&#128733;</div>
                    <label>¿Habitación con baño o aseo?</label>
                    <input
                        type="text"
                        name="habitacionConBano"
                        value={formData.habitacionConBano}
                        onChange={handleChange}
                        placeholder="escribir"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#10004;</div>
                    <label>¿Ropa de cama?</label>
                    <select name="ropaDeCama" value={formData.ropaDeCama} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-item">
                    <div className="icono">&#128217;</div>
                    <label>¿Hay mesillas de noche?</label>
                    <input
                        type="text"
                        name="mesillasDeNoche"
                        value={formData.mesillasDeNoche}
                        onChange={handleChange}
                        placeholder="escribir"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128196;</div>
                    <label>¿Hay otros muebles a parte en la habitación?</label>
                    <input
                        type="text"
                        name="otrosMuebles"
                        value={formData.otrosMuebles}
                        onChange={handleChange}
                        placeholder="escribir"
                    />
                </div>
                <div className="input-item">
                    <div className="icono">&#128274;</div>
                    <label>¿Tiene cerradura las habitaciones?</label>
                    <select name="cerraduraHabitaciones" value={formData.cerraduraHabitaciones} onChange={handleChange}>
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

export default Dormitorios2;
