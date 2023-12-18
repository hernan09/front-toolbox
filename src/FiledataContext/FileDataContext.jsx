import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear un contexto para los datos de archivos
const FileDataContext = createContext();

/**
 * Proveedor de datos de archivos para gestionar y compartir el estado de los datos en la aplicación.
 * param {Object} children - Componentes secundarios anidados al proveedor.
 */
export const FileDataProvider = ({ children }) => {
  // Estado local para almacenar los datos de archivos y todos los archivos
  const [fileData, setFileData] = useState([]);
  const [allFileData, setallFileData] = useState([]);

  // Efecto para realizar la carga inicial de datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar solicitudes concurrentes para obtener datos específicos y todos los archivos
        const [fileDataResponse, allFileDataResponse] = await Promise.all([
          fetch('http://localhost:4000/files/data'),
          fetch('http://localhost:4000/files/data/allfiles')
        ]);

        // Convertir las respuestas a formato JSON
        const fileData = await fileDataResponse.json();
        const allFileData = await allFileDataResponse.json();

        // Actualizar el estado local con los datos obtenidos
        setFileData(fileData);
        setallFileData(allFileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamar a la función de carga de datos al montar el componente
    fetchData();
  }, []);

  // Renderizar el proveedor de contexto con los datos de archivos y todos los archivos
  return (
    <FileDataContext.Provider value={{ fileData, allFileData }}>
      {children}
    </FileDataContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de datos de archivos.
 * returns {Object} - Contexto de datos de archivos.
 */
export const useFileDataContext = () => {
  return useContext(FileDataContext);
};
