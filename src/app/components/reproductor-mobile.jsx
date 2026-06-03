

import boxMusic from "./box-music";
import { TextAlignJustify, Play, SkipBack, ChevronDown, Heart, Repeat, Pause } from "lucide-react";



import Image from 'next/image';

import { Geist, Montserrat, DM_Sans, Outfit } from "next/font/google";
import BoxMusic from "./box-music";

const montserrat = Outfit({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

export default function ReproductorMobile() {

    const id = 'RYr96YYEaZY'; // Reemplaza con el ID de tu video de YouTube


    return (

        <div className="flex items-center gap-2 w-screen min-h-20 p-2 bg-amber-500" >

            <div className="relative w-19 h-19 border border-yellow-300">
                <Image
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    alt='image music'
                    fill // Hace que la imagen ocupe el 100% de su contenedor padre inmediato
                    sizes="(width: 30px)" // Optimiza la descarga según la pantalla
                    loading="eager"
                    className="object-cover rounded-xl"
                />
            </div>
            <div className={`flex flex-col flex-1 text-gray-500 ${montserrat.className} text-lg`}>
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">Título de la canción</span>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">Nombre del artista</p>
            </div>
            <div className="flex items-center gap-2">
                <Play />

            </div>





        </div>

    )
}



