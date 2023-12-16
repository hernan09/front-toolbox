import React from 'react';
import { useFileDataContext } from '../../FiledataContext/FileDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Table } from 'react-bootstrap';
import './table.css';

const MainComponent = () => {
  const fileData = useFileDataContext();

  return (
    <Container>
      <h1 className='title font-weight-bold'>React Text App</h1>
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className='th-custom'>File</th>
            <th className='th-custom'>Text</th>
            <th className='th-custom'>Number</th>
            <th className='th-custom'>Hex</th>
          </tr>
        </thead>
        <tbody>
          {fileData.map((item, index) => (
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
