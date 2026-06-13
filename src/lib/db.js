

import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Obligatorio para Azure SQL
        trustServerCertificate: true, // Cambiar a false si tienes un certificado válido
    },
};



// Creamos una variable vacía (null) donde guardaremos la conexión una vez que se abra.
// Al dejarla afuera de la función, se mantendrá guardada en la memoria de tu servidor web.
let pool = null;

// Exportamos la función para que puedas conectarte a las tablas desde cualquier página de tu web
export async function getConnection() {

    // REGLA DE REUTILIZACIÓN: Si 'pool' ya tiene una conexión abierta, la devuelve de inmediato.
    // Esto evita crear conexiones nuevas cada vez que el usuario hace clic, cuidando la memoria del servidor.
    if (pool) return pool;

    // Si es la primera vez que se ejecuta la función, intentamos abrir la conexión por primera vez
    try {
        // Le pedimos a la librería mssql que intente conectarse usando nuestra configuración 'config'
        // Usamos 'await' para esperar pacientemente a que responda el programa SQL Server Management
        pool = await sql.connect(config);

        // Si la contraseña y el servidor son correctos, verás este mensaje de éxito en la terminal de tu VS Code
        console.log('Conectado a SQL Server con JavaScript exitosamente');

        // Entregamos la conexión lista para recibir consultas (SELECT, INSERT, etc.)
        return pool;

    } catch (error) {
        // Si escribiste mal la clave, el usuario o el servidor está apagado, el error caerá aquí
        console.error('Error al conectar a SQL Server:', error);

        // Relanzamos el error para avisarle a Next.js que la conexión se rompió y detenga el proceso
        throw error;
    }
}
