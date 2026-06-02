



// Al no tener "use client", Next.js asume por defecto que es un Server Component.
// Esto permite que el 'fetch' se ejecute directamente en el servidor.

interface VideoHeaderProps {
    videoId: string;
}

// 1. Tipamos la respuesta que ya viste en Insomnia para trabajar tranquilos con TypeScript
interface OEmbedResponse {
    title: string;
    author_name: string;
    thumbnail_url: string;
}

async function getYoutubeData(id: string): Promise<OEmbedResponse | null> {
    // Construimos la URL exacta que probaste con éxito en Insomnia (¡todo en minúsculas!)
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;

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

export default async function VideoHeader({ videoId }: VideoHeaderProps) {
    // 2. Llamamos a la función directamente en el cuerpo del componente
    const videoData = await getYoutubeData('EdgkWykbvpw');
    console.log("Video data en el componente:", videoData); // Para verificar que tenemos los datos antes de renderizar

    if (!videoData) {
        return <p className="text-red-500">No se pudo cargar la información del video.</p>;
    }

    return (
        <div className="my-4 p-4 border border-gray-200 rounded-lg max-w-xl bg-white shadow-sm">
            {/* Pintamos el título del video que extrajimos de la API */}
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {videoData.title}
            </h3>

            {/* Pintamos el nombre del canal */}
            <p className="text-sm text-gray-600 mt-1">
                Por: <span className="font-semibold">{videoData.author_name}</span>
            </p>
        </div>
    );
}


