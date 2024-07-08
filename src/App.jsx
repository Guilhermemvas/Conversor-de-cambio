// App.jsx
import './App.css';
import TabComponent from './components/TabComponent/TabComponent';
import ConverterMoedas from './components/ConverterMoedas';

function App() {
  return (
    <div className="App">
      <div className="content">
        <TabComponent>
          <div label="Conversor">
            <ConverterMoedas />
          </div>
          <div label="Mais Informações">
            <h2>Informações da Moeda</h2>
            <p>Aqui você pode adicionar informações adicionais sobre a moeda selecionada, como histórico, taxas de câmbio, etc.</p>
          </div>
        </TabComponent>
      </div>
    </div>
  );
}

export default App;
