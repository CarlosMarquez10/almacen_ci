// Importar módulos necesarios usando ES6
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import pool from '../model/db.js'; // Ajusta la ruta según tu proyecto

// Obtener la ruta absoluta del archivo Excel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaExcel = path.join(__dirname, '../model/doc/Empleados_Data.xlsx');

// Leer el archivo Excel
const workbook = xlsx.readFile(rutaExcel);
const sheetName = workbook.SheetNames[0]; // Suponiendo que los datos están en la primera hoja
const worksheet = workbook.Sheets[sheetName];

// Convertir los datos de Excel a un arreglo de objetos JavaScript
const data = xlsx.utils.sheet_to_json(worksheet);

// Función para insertar los datos en la base de datos
async function insertarDatos() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const empleado of data) {
      const queryText = `
        INSERT INTO empleados (
          Cedula,
          Sede,
          Nombres,
          Apellidos,
          CelularPersonal,
          TallaCamisa,
          TallaPantalon,
          TallaZapatos,
          Cargo,
          Movilidad,
          EstadoRevision,
          RolRevisor,
          RevisorInspeccion,
          RevisorAlmacen,
          RevisorDocumentos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        empleado.Cedula,
        empleado.Sede,
        empleado.Nombres,
        empleado.Apellidos,
        empleado.CelularPersonal,
        empleado.TallaCamisa,
        empleado.TallaPantalon,
        empleado.TallaZapatos,
        empleado.Cargo,
        empleado.Movilidad,
        empleado.EstadoRevision,
        empleado.RolRevisor,
        empleado.RevisorInspeccion,
        empleado.RevisorAlmacen,
        empleado.RevisorDocumentos
      ];

      await connection.query(queryText, values);
    }

    await connection.commit();
    console.log('Datos insertados exitosamente');
  } catch (error) {
    await connection.rollback();
    console.error('Error al insertar datos:', error);
  } finally {
    connection.release();
  }
}

// Ejecutar la función
insertarDatos();
