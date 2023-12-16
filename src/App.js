import React from 'react';
import Table from './components/table/tableComponent.jsx';
import { FileDataProvider } from './FiledataContext/FileDataContext.jsx';

function App() {
  return (
    <FileDataProvider>
      <div className="App">
        <Table />
      </div>
    </FileDataProvider>
  );
}

export default App;
