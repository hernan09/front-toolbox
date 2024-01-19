import React from 'react';
import Table from './components/table/tableComponent.jsx';
//import { FileDataProvider } from './FiledataContext/FileDataContext.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

/**
 * Componente principal de la aplicación que envuelve la tabla con el proveedor de datos de archivos.
 */
function App() {
  return (
    // Utilizar el proveedor de datos de archivos para gestionar el estado de los datos en la aplicación
    <Provider store={store}>
      <div className="App">
        {/* Renderizar el componente de tabla */}
        <Table />
      </div>
    </Provider>
  );
}

export default App;
