import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './InformacionGeneral1.css';

function InformacionGeneral1() {
    // Set up formData for the form fields
    const [formData, setFormData] = useState({
        codigo: '',
        nombrePiso: '',
        pais: '',
        ciudad: '',
        estado: '',
        codigoPostal: '',
    });

    const navigate = useNavigate();

    // Fetch user data from Firestore on component mount
    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser; // Get current user
            if (user) {
                const docRef = doc(db, "users", user.uid); // Reference Firestore doc
                const docSnap = await getDoc(docRef); // Get document snapshot

                if (docSnap.exists()) {
                    const data = docSnap.data(); // Get document data
                    setFormData(prev => ({ ...prev, ...data.informacion })); // Set form data with user info
                }
            }
        };

        fetchData(); // Call the fetch function
    }, []);

    // Handle input changes and update the form state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission and save the data to Firestore, navigate to the next page
    const handleNext = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true }); // Merge to update existing fields
            navigate('/informacion-general2'); // Navigate to next page
        }
    };

    // Handle going back (save data and navigate back to home page)
    const handlePrev = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                informacion: formData,
            }, { merge: true });
            navigate('/'); // Navigate back to home page
        }
    };

    return (
        <div className="info-general-container">
            <h1>Información GENERAL</h1>
            <div className="form-group">
                {/* Código del Piso */}
                <div className="input-item">
                    <div className="icono">&#128196;</div>
                    <div className="input-field">
                        <span className="input-label">Código del Piso:</span>
                        <input
                            type="text"
                            name="codigo"
                            placeholder="escribe"
                            value={formData.codigo}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Nombre del Piso */}
                <div className="input-item">
                    <div className="icono">&#127968;</div>
                    <div className="input-field">
                        <span className="input-label">Nombre del Piso:</span>
                        <input
                            type="text"
                            name="nombrePiso"
                            placeholder="escribe"
                            value={formData.nombrePiso}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* Estado */}
                <div className="input-item">
                    <div className="icono">&#127793;</div>
                    <label>Seleccionar estado:</label>
                    <select name="estado" value={formData.estado} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="alto">Alto</option>
                        <option value="bajo">Bajo</option>
                    </select>
                </div>
                {/* País */}
                <div className="input-item">
                    <div className="icono">&#127760;</div>
                    <label>Seleccionar país:</label>
                    <select name="pais" value={formData.pais} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Espana">España</option>
                        <option value="Italia">Italia</option>
                        <option value="Francia">Francia</option>
                        <option value="Portugal">Portugal</option>
                    </select>
                </div>
                {/* Ciudad */}
                <div className="input-item">
                    <div className="icono">&#127961;</div>
                    <label>Seleccionar ciudad:</label>
                    <select name="ciudad" value={formData.ciudad} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        {['Madrid', 'Valencia', 'Cordoba', 'Sevilla'].map((ciudad) => (
                            <option key={ciudad} value={ciudad}>{ciudad}</option>
                        ))}
                    </select>
                </div>
                {/* Código Postal */}
                <div className="input-item">
                    <div className="icono">C.P.</div>
                    <div className="input-field">
                        <span className="input-label">Código Postal:</span>
                        <input
                            type="text"
                            name="codigoPostal"
                            placeholder="escribe"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrev}>←</button>
                <button className="nav-button" onClick={handleNext}>→</button>
            </div>
        </div>
    );
}

export default InformacionGeneral1;
