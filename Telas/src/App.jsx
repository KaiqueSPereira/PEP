// src/App.jsx
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfBlack from './assets/InfBlack.svg';
import Consulta from './components/Consulta';
import './App.css';
import './css/inicio.css';
import Medicamento from './components/Medicamento';

function App() {
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);

  const handleOpenConsulta = () => {
    setIsConsultaOpen(true);
  };

  const handleCloseConsulta = () => {
    setIsConsultaOpen(false);
  };
  const [isMedicamentoOpen, setIsMedicamentoOpen] = useState(false);

  const handleOpenMedicamento = () => {
    setIsMedicamentoOpen(true);
  };

  const handleCloseMedicamento = () => {
    setIsMedicamentoOpen(false);
  };

  return (
    <>
      <ToastContainer autoClose={3000} position='bottom-left' />
      <div className="App">
        <div>
          <h1>Olá</h1>
          <h3>Seja bem-vindo ao seu prontuário</h3>
        </div>
        <div>
          <div>
            <h2>Consultas</h2>
            <img src={InfBlack} alt="Consultas" />
            <button onClick={handleOpenConsulta}>Nova Consulta</button>
          </div>
          <Consulta isOpen={isConsultaOpen} onClose={handleCloseConsulta} />
        </div>
      </div>
      <div>
          <div>
            <h2>Medicamentos</h2>
            <img src={InfBlack} alt="Consultas" />
            <button onClick={handleOpenMedicamento}>Novo Medicamento</button>
          </div>
          <Medicamento isOpen={isMedicamentoOpen} onClose={handleCloseMedicamento} />
        </div>
    
    </>
  );
}

export default App;