import React, { useState, useEffect } from 'react';
import '../css/novaconsulta.css';



// Componente para o formulário de medicamento
const FormularioMedicamento = () => {
    const [dose, setDose] = useState('');
    const [estoque, setEstoque] = useState('');
    const [intervalo, setIntervalo] = useState('');
    const [unidadeIntervalo, setUnidadeIntervalo] = useState('dias');
    const [frequencia, setFrequencia] = useState('');
    const [duracao, setDuracao] = useState('');
    const [terminoTratamento, setTerminoTratamento] = useState('');

    const calcularDuracaoMedicamento = () => {
        if (!dose || !estoque || !intervalo) return;

        const fatorIntervalo = unidadeIntervalo === 'dias' ? 1 :
            unidadeIntervalo === 'semanas' ? 7 :
            unidadeIntervalo === 'meses' ? 30 :
            unidadeIntervalo === 'horas' ? 1 / 24 : 1;

        const duracao = Math.ceil(estoque / (dose * intervalo * fatorIntervalo));
        setDuracao(duracao + " dias");
    };

    const calcularTerminoTratamento = () => {
        const inicioTratamento = new Date(document.getElementById('inicio-tratamento').value);
        const tempoTratamento = parseFloat(document.getElementById('tempo-tratamento').value);
        const unidadeTempo = document.getElementById('unidade-tempo').value;
        const intervaloTratamento = parseFloat(document.getElementById('intervalo-tratamento').value);
        const unidadeIntervalo = document.getElementById('unidade-intervalo').value;

        if (unidadeTempo === 'semanas') {
            tempoTratamento *= 7;
        } else if (unidadeTempo === 'meses') {
            tempoTratamento *= 30;
        } else if (unidadeTempo === 'horas') {
            tempoTratamento /= 24;
        }

        if (unidadeIntervalo === 'semanas') {
            intervaloTratamento *= 7;
        } else if (unidadeIntervalo === 'meses') {
            intervaloTratamento *= 30;
        } else if (unidadeIntervalo === 'horas') {
            intervaloTratamento /= 24;
        }

        const terminoTratamento = new Date(inicioTratamento.getTime() + tempoTratamento * intervaloTratamento * 24 * 60 * 60 * 1000);
        const dia = terminoTratamento.getDate().toString().padStart(2, '0');
        const mes = (terminoTratamento.getMonth() + 1).toString().padStart(2, '0');
        const ano = terminoTratamento.getFullYear();
        setTerminoTratamento(`${dia}/${mes}/${ano}`);
    };

    useEffect(() => {
        calcularDuracaoMedicamento();
    }, [dose, estoque, intervalo, unidadeIntervalo]);

    useEffect(() => {
        calcularTerminoTratamento();
    }, [document.getElementById('inicio-tratamento')?.value, document.getElementById('tempo-tratamento')?.value, document.getElementById('unidade-tempo')?.value, document.getElementById('intervalo-tratamento')?.value, document.getElementById('unidade-intervalo')?.value]);

    return (
        <form id="medicamento-form">
            <div>
                <label htmlFor="dose">Dose:</label>
                <input type="number" id="dose" value={dose} onChange={(e) => setDose(e.target.value)} />
            </div>
            <div>
                <label htmlFor="estoque">Estoque:</label>
                <input type="number" id="estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
            </div>
            <div>
                <label htmlFor="intervalo">Intervalo:</label>
                <input type="number" id="intervalo" value={intervalo} onChange={(e) => setIntervalo(e.target.value)} />
            </div>
            <div>
                <label htmlFor="unidade-intervalo">Unidade Intervalo:</label>
                <select id="unidade-intervalo" value={unidadeIntervalo} onChange={(e) => setUnidadeIntervalo(e.target.value)}>
                    <option value="dias">Dias</option>
                    <option value="semanas">Semanas</option>
                    <option value="meses">Meses</option>
                    <option value="horas">Horas</option>
                </select>
            </div>
            <div>
                <label htmlFor="frequencia">Frequência:</label>
                <select id="frequencia" value={frequencia} onChange={(e) => setFrequencia(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="continuo">Contínuo</option>
                    <option value="tratamento">Tratamento</option>
                </select>
            </div>
            <div>
                <label htmlFor="duracao">Duração:</label>
                <p id="duracao">{duracao}</p>
            </div>
            <div>
                <label htmlFor="termino-tratamento">Término do Tratamento:</label>
                <input type="text" id="termino-tratamento" value={terminoTratamento} readOnly />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

// Componente principal do modal
const ModalMedicamento = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="modal" id="medicamentoModal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Medicamento Modal</h2>
                <FormularioMedicamento />
            </div>
        </div>
    );
};

export default ModalMedicamento;
