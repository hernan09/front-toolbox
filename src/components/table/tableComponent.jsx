import React, { useState } from 'react';
import { useFileDataContext } from '../../FiledataContext/FileDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Table, Dropdown, FormControl  } from 'react-bootstrap';
import './table.css';

const MainComponent = () => {
  /// Estado local para almacenar los datos 
  const {fileData, allFileData} = useFileDataContext();
  const [searchTerm, setSearchTerm] = useState('');

  // metodo para filtrar la data de la tabla desde el buscador
  const filteredFileData = fileData?.filter((item) => {
    return item?.file?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Container>
       <FormControl
        type="text"
        placeholder="Search by file name"
        className="mb-3 mt-5"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ border: '2px solid #808080', outline:'none' }}
      />
      <h1 className='title font-weight-bold'>React Text App</h1>
      <Dropdown className='mt-2 mb-2'>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        See available Files
        </Dropdown.Toggle>

        <Dropdown.Menu>
        {allFileData.map((item, index) => (
          <Dropdown.Item key={index} href={`#`}>
            {item}
          </Dropdown.Item>
        ))}
        </Dropdown.Menu>
     </Dropdown>
      <Table className="table table-bordered table-striped">
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th className='th-custom-title'>File</th>
            <th className='th-custom-title'>Text</th>
            <th className='th-custom-title'>Number</th>
            <th className='th-custom-title'>Hex</th>
          </tr>
        </thead>
        <tbody>
          {filteredFileData.map((item, index) => (
            item.lines?.map((line, lineIndex) => (
              <tr className="tr-custom" key={`${index}-${lineIndex}`}>
                <td className="th-custom">{item.file}</td>
                <td className="th-custom">{line.text}</td>
                <td className="th-custom">{line.number}</td>
                <td className="th-custom">{line.hex}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MainComponent;
