import React, { createContext, useContext, useEffect, useState } from 'react';

const FileDataContext = createContext();

export const FileDataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);
  const [allFileData, setallFileData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fileDataResponse, allFileDataResponse] = await Promise.all([
          fetch('http://localhost:4000/files/data'),
          fetch('http://localhost:4000/files/data/allfiles')
        ]);
  
        const fileData = await fileDataResponse.json();
        const allFileData = await allFileDataResponse.json();
  
        setFileData(fileData);
        setallFileData(allFileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <FileDataContext.Provider value={fileData}>
      {children}
    </FileDataContext.Provider>
  );
};

export const useFileDataContext = () => {
  return useContext(FileDataContext);
};
