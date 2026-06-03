
import Image from "next/image";
import { Geist, Montserrat, DM_Sans, Outfit } from "next/font/google";

const montserrat = Outfit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function BoxMusic({ data, id }) {

    return (

        <div className={`snap-start shrink-0`}> {/** min-w-50 min-h-75 para la pagina de mi-musica*/}
            <div className="relative w-full min-h-50"> 
                <Image
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    alt='image music'
                    fill // Hace que la imagen ocupe el 100% de su contenedor padre inmediato
                    sizes="(max-width: 768px) 100vw, 33vw" // Optimiza la descarga según la pantalla
                    className="object-cover rounded-xl"

                />
            </div>

            <div className={`w-50 mt-2 text-gray-500 ${montserrat.className} text-xl`}>
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">{data?.title || 'Título no disponible'}</span>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{data?.author_name || 'Artista no disponible'}</p>
            </div>
        </div>

    )
}