// components/ConverterMoedas.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { BsArrowLeftRight } from 'react-icons/bs';
import { moedas } from './moedas';

const ConverterMoedas = () => {
  const [valor, setValor] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('USD');
  const [moedaDestino, setMoedaDestino] = useState('EUR');
  const [convertido, setConvertido] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await converterMoedas();
  };


//Função para ativar botão converter apertando a tecla 'Enter'
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      converterMoedas();
    }
  };


  //Função assync que chama API e converte moedas
  const converterMoedas = async (e) => {
    if (valor === '') {
      alert('Insira um valor numérico válido para conversão.');
      return;
    }

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
      const rate = response.data.rates[moedaDestino];
      setConvertido((valor * rate).toFixed(2));
    } catch (error) {
      console.error('Erro ao converter as moedas:', error);
      alert('Erro ao converter as moedas. Verifique a console para mais detalhes.');
    }
  };


//Função que inverte a posição das moedas

  const inverterMoedas = (e) => {
    e.preventDefault();
    setMoedaDestino(moedaOrigem);
    setMoedaOrigem(moedaDestino);
  }

  return (
    <div className="converter-moedas">
      <div className="main">
        <h1>Conversor de Moedas</h1>
        <div className="input">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Valor</label>
              <div className="input-group">
                <input
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="number"
                  placeholder="0,00"
                />
                <select
                  value={moedaOrigem}
                  onChange={(e) => setMoedaOrigem(e.target.value)}
                  className="moeda1"
                >
                  {moedas.map((moeda) => (
                    <option key={moeda.codigo} value={moeda.codigo}>
                      {moeda.nome} ({moeda.simbolo})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={inverterMoedas} className="Invert">
              <BsArrowLeftRight />
            </button>

            <div className="form-group">
              <label>Converter para</label>
              <div className="input-group">
                <select
                  value={moedaDestino}
                  onChange={(e) => setMoedaDestino(e.target.value)}
                  className="moeda2"
                >
                  {moedas.map((moeda) => (
                    <option key={moeda.codigo} value={moeda.codigo}>
                      {moeda.nome} ({moeda.simbolo})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="convert">
              Converter
            </button>
          </form>
        </div>
      </div>
      <div className="resultado">
        {convertido} {moedaDestino}
      </div>
    </div>
  );
};

export default ConverterMoedas;
