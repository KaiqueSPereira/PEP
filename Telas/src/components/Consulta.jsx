import React, { useState } from 'react';
import '../css/novaconsulta.css';
import upfileBlack from '../assets/upfileBlack.svg';

const Consulta = ({ isOpen, onClose }) => {
  const [tipoConsulta, setTipoConsulta] = useState('');
  
  const handleTipoConsultaChange = (event) => {
    setTipoConsulta(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form id="consulta-form">
          <div className="form-group">
            <label htmlFor="data-consulta">Data da Consulta:</label>
            <input type="date" id="data-consulta" name="data-consulta" required />
          </div>
          <div className="form-group">
            <label htmlFor="tipo-consulta">Tipo de Consulta:</label>
            <select id="tipo-consulta" name="tipo-consulta" value={tipoConsulta} onChange={handleTipoConsultaChange} required>
              <option value="">Selecione</option>
              <option value="rotina">Rotina</option>
              <option value="emergencia">Emergência</option>
              <option value="exame">Exame</option>
            </select>
          </div>

          {tipoConsulta === 'emergencia' && (
            <div id="queixas-group" className="form-group">
              <label htmlFor="queixas">Queixas:</label>
              <input type="text" id="queixas" name="queixas" placeholder="Descreva as queixas" />
              <label htmlFor="profissional">Profissional:</label>
              <input type="text" id="profissional" name="profissional" placeholder="Nome do profissional" />
              <label htmlFor="local-consulta">Local da Consulta:</label>
              <input type="text" id="local-consulta" name="local-consulta" required placeholder="Hospital Santa Joana" />
            </div>
          )}

          {tipoConsulta === 'rotina' && (
            <>
              <div id="tratamentos-group" className="form-group">
                
                <label htmlFor="tratamentos">Tratamentos:</label>
                <select id="tratamentos" name="tratamentos">
                <option value="tratamento1">Tratamento 1</option>
                <option value="tratamento2">Tratamento 2</option>
                <option value="tratamento3">Tratamento 3</option>
              </select>
              </div>
              <div id="profissional-group" className="form-group">
                <label htmlFor="profissional">Profissional:</label>
                <input type="text" id="profissional" name="profissional" placeholder="Nome do profissional" />
                <label htmlFor="local-consulta">Local da Consulta:</label>
                <input type="text" id="local-consulta" name="local-consulta" required placeholder="Hospital Santa Joana" />
              </div>
            </>
          )}

          {tipoConsulta === 'exame' && (
            <>
              <div id="tipo-exame-group" className="form-group">
                <label htmlFor="tipo-exame">Tipo de Exame:</label>
                <input type="text" id="tipo-exame" name="tipo-exame" placeholder="Tipo de exame realizado" />
              </div>
              <div id="profissional-group" className="form-group">
                <label htmlFor="profissional">Profissional:</label>
                <input type="text" id="profissional" name="profissional" placeholder="Nome do profissional" />
                <label htmlFor="local-consulta">Local da Consulta:</label>
                <input type="text" id="local-consulta" name="local-consulta" required placeholder="Hospital Santa Joana" />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="anexos-consulta">Anexar Arquivos Consulta:</label>
            <div className="custom-file-input">
              <input type="file" id="anexos-consulta" name="anexos-consulta" multiple className="anexos" />
              <button type="button" onClick={() => document.getElementById('anexos-consulta').click()}>
                <img src={upfileBlack} alt="Upload Icon" />
                Selecionar Arquivos
              </button>
            </div>
            <div id="file-names-consulta"></div>
          </div>
          <div className="form-group submit-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Consulta;
