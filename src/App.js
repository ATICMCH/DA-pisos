import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import InformacionGeneral1 from '../src/components/InformacionGeneral1'; // Importar el nuevo componente
import InformacionGeneral2 from './components/InformacionGeneral2';
import CaracteristicasPrincipales1 from './components/CaracteristicasPrincipales1';
import CaracteristicasPrincipales2 from './components/CaracteristicasPrincipales2';
import CaracteristicasPrincipales3 from './components/CaracteristicasPrincipales3';
import CaracteristicasPrincipales4 from './components/CaracteristicasPrincipales4';
import CaracteristicasPrincipales5 from './components/CaracteristicasPrincipales5';
import Dormitorios1 from './components/Dormitorios1';
import Dormitorios2 from './components/Dormitorios2';
import Salon1 from './components/Salon1';
import Bano1 from './components/Bano1';
import Cocina1 from './components/Cocina1';
import AccesoriosdelHogar from './components/AccesoriosdelHogar';
import CaracteristicasAdicionalesdelPiso1 from './components/CaracterísticasAdicionalesdelPiso1';
import CaracteristicasAdicionalesdelPiso2 from './components/CaracterísticasAdicionalesdelPiso2';
import CaracteristicasdelaUrbanizacionoEdificio from './components/CaracterísticasdelaUrbanizacionoEdificio';
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
                    <Route path="/caracteristicas-principales3" element={<CaracteristicasPrincipales3 />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicas-principales4" element={<CaracteristicasPrincipales4 />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicas-principales5" element={<CaracteristicasPrincipales5 />} /> {/* Nueva ruta */}
                    <Route path="/dormitorios1" element={<Dormitorios1 />} /> {/* Nueva ruta */}
                    <Route path="/dormitorios2" element={<Dormitorios2 />} /> {/* Nueva ruta */}
                    <Route path="/salon1" element={<Salon1 />} /> {/* Nueva ruta */}
                    <Route path="/bano1" element={<Bano1 />} /> {/* Nueva ruta */}
                    <Route path="/cocina1" element={<Cocina1 />} /> {/* Nueva ruta */}
                    <Route path="/accesoriosdelhogar" element={<AccesoriosdelHogar />} /> {/* Nueva ruta */}
                    <Route path="/caracteristicasadicionalesdelpiso1" element={<CaracteristicasAdicionalesdelPiso1/>} /> {/* Nueva ruta */}
                    <Route path="/caracteristicasadicionalesdelpiso2" element={<CaracteristicasAdicionalesdelPiso2/>} /> {/* Nueva ruta */}
                    <Route path="/caracteristicasdelaurbanizacionoedificio" element={<CaracteristicasdelaUrbanizacionoEdificio/>} /> {/* Nueva ruta */}
                    <Route path="/otros" element={<Otros />} /> {/* Nueva ruta */}
                    <Route path="/finalpage" element={<FinalPage />} /> {/* Nueva ruta */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
