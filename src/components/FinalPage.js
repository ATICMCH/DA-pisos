import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/mycityhome-logo.png'; // Логотип суретін импорттау
import './FinalPage.css'; // Стильдер үшін CSS файлы

function FinalPage() {
    const navigate = useNavigate(); // Пайдалану үшін useNavigate хукасын қосамыз

    const handleImageClick = () => {
        navigate('/'); // Логин бетіне өтетін функция
    };

    return (
        <div className="final-page-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="image-container" onClick={handleImageClick}>
                {/* Енді img тегін қолданбаймыз */}
            </div>
            
        </div>
    );
}

export default FinalPage;
