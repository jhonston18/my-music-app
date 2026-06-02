

import { NextResponse } from "next/server";
import getYoutubeData from "../contenido/peticion";

export async function GET_DATA_MUSIC() {

    const ID_VIDEO = 'EdgkWykbvpw'; // Reemplaza con el ID de tu video de YouTube

    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ID_VIDEO}&format=json`;

    console.log("URL de oEmbed que se va a llamar:", url); // Para verificar que la URL es correcta antes de hacer la petición

    try {
        const res = await fetch(url, {
            // Opcional: Next.js cachea las peticiones por defecto. 
            // Si quieres que siempre esté actualizado, puedes usar: next: { revalidate: 3600 } (1 hora)
            next: { revalidate: 86400 } // Cachear por 24 horas está perfecto para videos de YouTube
        });

        if (!res.ok) {
            throw new Error('Error al obtener los datos de YouTube');
        }


        console.log("Datos obtenidos de YouTube oEmbed:", res.json); // Para verificar la estructura de la respuesta

        return await res.json();
    } catch (error) {
        console.error("Error en oEmbed fetch:", error);
        return null;
    }

   
}

export async function GET_VIDEO_MINIATURA() {

    const VIDEO_ID = 'EdgkWykbvpw'; // Reemplaza con el ID de tu video de YouTube

    const url = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;


    


}






