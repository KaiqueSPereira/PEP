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
    const [inicioTratamento, setInicioTratamento] = useState('');
    const [tempoTratamento, setTempoTratamento] = useState('');
    const [unidadeTempo, setUnidadeTempo] = useState('dias');
    const [intervaloTratamento, setIntervaloTratamento] = useState('');

    // Função para mostrar ou ocultar campos com base na frequência selecionada
    const mostrarOcultarCampos = () => {
        // A visibilidade dos campos pode ser controlada via estado
    };

    // Função para calcular a duração do medicamento
    const calcularDuracaoMedicamento = () => {
        if (!dose || !estoque || !intervalo) return;

        const fatorIntervalo = unidadeIntervalo === 'dias' ? 1 :
            unidadeIntervalo === 'semanas' ? 7 :
            unidadeIntervalo === 'meses' ? 30 :
            unidadeIntervalo === 'horas' ? 1 / 24 : 1;

        const duracao = Math.ceil(estoque / (dose * intervalo * fatorIntervalo));
        setDuracao(duracao + " dias");
    };

    // Função para calcular a data de término do tratamento
    const calcularTerminoTratamento = () => {
        if (!inicioTratamento || !tempoTratamento || !intervaloTratamento) return;

        let tempoTratamentoDias = parseFloat(tempoTratamento);
        if (unidadeTempo === 'semanas') tempoTratamentoDias *= 7;
        else if (unidadeTempo === 'meses') tempoTratamentoDias *= 30;
        else if (unidadeTempo === 'horas') tempoTratamentoDias /= 24;

        let intervaloTratamentoDias = parseFloat(intervaloTratamento);
        if (unidadeIntervalo === 'semanas') intervaloTratamentoDias *= 7;
        else if (unidadeIntervalo === 'meses') intervaloTratamentoDias *= 30;
        else if (unidadeIntervalo === 'horas') intervaloTratamentoDias /= 24;

        const inicioTratamentoDate = new Date(inicioTratamento);
        const terminoTratamentoDate = new Date(inicioTratamentoDate.getTime() + tempoTratamentoDias * intervaloTratamentoDias * 24 * 60 * 60 * 1000);

        const dia = terminoTratamentoDate.getDate().toString().padStart(2, '0');
        const mes = (terminoTratamentoDate.getMonth() + 1).toString().padStart(2, '0');
        const ano = terminoTratamentoDate.getFullYear();
        setTerminoTratamento(`${dia}/${mes}/${ano}`);
    };

    useEffect(() => {
        calcularDuracaoMedicamento();
    }, [dose, estoque, intervalo, unidadeIntervalo]);

    useEffect(() => {
        calcularTerminoTratamento();
    }, [inicioTratamento, tempoTratamento, unidadeTempo, intervaloTratamento]);

    useEffect(() => {
        mostrarOcultarCampos();
    }, [frequencia]);

    return (
        <form id="medicamento-form">
            <div className="form-group">
                <label htmlFor="dose">Dose:</label>
                <input type="number" id="dose" value={dose} onChange={(e) => setDose(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="estoque">Estoque:</label>
                <input type="number" id="estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="intervalo">Intervalo:</label>
                <input type="number" id="intervalo" value={intervalo} onChange={(e) => setIntervalo(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="unidade-intervalo">Unidade Intervalo:</label>
                <select id="unidade-intervalo" value={unidadeIntervalo} onChange={(e) => setUnidadeIntervalo(e.target.value)}>
                    <option value="dias">Dias</option>
                    <option value="semanas">Semanas</option>
                    <option value="meses">Meses</option>
                    <option value="horas">Horas</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="frequencia">Frequência:</label>
                <select id="frequencia" value={frequencia} onChange={(e) => setFrequencia(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="continuo">Contínuo</option>
                    <option value="tratamento">Tratamento</option>
                </select>
            </div>

            {/* Campos que aparecem de acordo com a frequência */}
            {frequencia === 'continuo' && (
                <div id="usoContinuoFields">
                    <div className="form-group">
                        <label htmlFor="inicio-tratamento">Início do Tratamento:</label>
                        <input type="date" id="inicio-tratamento" value={inicioTratamento} onChange={(e) => setInicioTratamento(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tempo-tratamento">Tempo de Tratamento:</label>
                        <input type="number" id="tempo-tratamento" value={tempoTratamento} onChange={(e) => setTempoTratamento(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="unidade-tempo">Unidade Tempo:</label>
                        <select id="unidade-tempo" value={unidadeTempo} onChange={(e) => setUnidadeTempo(e.target.value)}>
                            <option value="dias">Dias</option>
                            <option value="semanas">Semanas</option>
                            <option value="meses">Meses</option>
                            <option value="horas">Horas</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="intervalo-tratamento">Intervalo Tratamento:</label>
                        <input type="number" id="intervalo-tratamento" value={intervaloTratamento} onChange={(e) => setIntervaloTratamento(e.target.value)} />
                    </div>
                </div>
            )}

            {frequencia === 'tratamento' && (
                <div id="tratamentoFields">
                    {/* Campos específicos para tratamento */}
                    {/* Adicione aqui campos específicos, se houver */}
                </div>
            )}

            <div>
                <label htmlFor="duracao">Duração:</label>
                <p id="duracao">{duracao}</p>
            </div>
            <div>
                <label htmlFor="termino-tratamento">Término do Tratamento:</label>
                <input type="text" id="termino-tratamento" value={terminoTratamento} readOnly />
            </div>
            <div id="anexo-receita">
                {/* Anexo receita ou outro campo */}
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

// Componente principal do modal
const Medicamento = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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

export default Medicamento;
