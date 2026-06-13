



import { NextResponse } from 'next/server';
// Importamos la función que creamos en tu archivo db.js (asegúrate de que la ruta @/lib/db sea correcta)
import {getConnection} from '@/lib/db'; 

export async function GET() {
  try {
    // 1. Intentamos llamar a la función de conexión
    const pool = await getConnection();
    
    // 2. Si se conecta, le pedimos a SQL Server la fecha y hora actual del sistema para verificar que responde
    const result = await pool.request().query('SELECT GETDATE() as fechaServidor');
    
    // 3. Si todo sale bien, respondemos un mensaje de éxito en la pantalla del navegador
    return NextResponse.json({
      status: "¡Conexión exitosa!",
      mensaje: "Next.js se ha conectado correctamente a SQL Server Management.",
      datos: result.recordset[0]
    });

  } catch (error) {
    // Si hay un error (contraseña mal, servidor apagado, etc.), responderá esto
    return NextResponse.json({ 
      status: "Error de conexión", 
      detalles: error.message 
    }, { status: 500 });
  }
}



