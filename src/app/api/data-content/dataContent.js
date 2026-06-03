


export default async function GET_DATA_MUSIC() {

    const ID_VIDEO = 'EdgkWykbvpw'; // Reemplaza con el ID de tu video de YouTube

    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ID_VIDEO}&format=json`;

    console.log("estamos en DataContent - Esta es la url que se va a llamar a la api de oEmbed:", url); // Para verificar que la URL es correcta antes de hacer la petición

    try {
        
        const res = await fetch(url, {

            next: { revalidate: 86400 } // Cachear por 24 horas está perfecto para videos de YouTube
        });

        if (!res.ok) {
            throw new Error('Error al obtener los datos de YouTube');
        }

        const data = await res.json();
        console.log("estamos en DataContent - Datos obtenidos de YouTube oEmbed:", data); // Para verificar la estructura de la respuesta

        return data;
    } catch (error) {
        console.error("estamos en DataContent - Error en oEmbed fetch:", error);
        return null;
    }

   
}







