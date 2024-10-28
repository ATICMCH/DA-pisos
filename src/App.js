import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import InformacionGeneral1 from '../src/components/InformacionGeneral1'; // Importar el nuevo componente
import InformacionGeneral2 from './components/InformacionGeneral2';
import CaracteristicasPrincipales1 from './components/CaracteristicasPrincipales1';
import CaracteristicasPrincipales2 from './components/CaracteristicasPrincipales2';
import Dormitorios1 from './components/Dormitorios1';
import Dormitorios2 from './components/Dormitorios2';
import Salon from './components/Salon'
import Bano from './components/Bano';
import Cocina from './components/Cocina';
import AccesoriosdelHogar from './components/AccesoriosdelHogar';
import CaracteristicasAdicionalesdelPiso from './components/CaracterísticasAdicionalesdelPiso';
import Otros from './components/Otros';
import FinalPage from './components/FinalPage';
function App() {
    return (
        <Router>
            <div className="ui container">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/informacion-general1" element={<InformacionGeneral1 />} /> {/* Nueva ruta */}
                    <Route path="/informacion-general2" element={<InformacionGeneral2 />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicas-principales1" element={<CaracteristicasPrincipales1 />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicas-principales2" element={<CaracteristicasPrincipales2 />} /> {/* Nueva ruta */}
                    <Route path="/dormitorios1" element={<Dormitorios1 />} /> {/* Nueva ruta */}
                    <Route path="/dormitorios2" element={<Dormitorios2 />} /> {/* Nueva ruta */}
                    <Route path="/salon" element={<Salon />} /> {/* Nueva ruta */}
                    <Route path="/bano" element={<Bano />} /> {/* Nueva ruta */}
                    <Route path="/cocina" element={<Cocina />} /> {/* Nueva ruta */}
                    <Route path="/accesoriosdelhogar" element={<AccesoriosdelHogar />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicasadicionalesdelpiso" element={<CaracteristicasAdicionalesdelPiso/>} /> {/* Nueva ruta */}
                    <Route path="/otros" element={<Otros />} /> {/* Nueva ruta */}
                    <Route path="/finalpage" element={<FinalPage />} /> {/* Nueva ruta */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
