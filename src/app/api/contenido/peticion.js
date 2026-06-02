





export default async function fetchContenido() {

    const videoID = 'EdgkWykbvpw'; // Reemplaza con el ID de tu video de YouTube
    const API_URL = `https://www.youtube.com/oEmbed?url=https://www.youtube.com/watch?v=${videoID}&format=json`;



    try {
        const res = await fetch(API_URL, {
            next: { revalidate: 86400 } // Revalida cada 24 horas (86400 segundos)
        });
        const datos = await res.json(); // Asegúrate de que la respuesta se convierta a JSON

        return datos; // Devuelve los datos en un formato adecuado
    } catch (error) {
        console.error('Error fetching contenido:', error);
        throw error;
    }
}

