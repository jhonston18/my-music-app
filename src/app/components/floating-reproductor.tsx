"use client"

import Reproductor from '@/app/components/reproductor'
import ReproductorMobile from '@/app/components/reproductor-mobile'

import { TextAlignJustify, Play, SkipBack, SkipForward, Heart, Repeat, Pause, ChevronDown } from "lucide-react";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { MouseEvent } from 'react';






export default function FloatingReproductor() {

    const [handlerPlayer, setHandlerPlayer] = useState(false); // manejador de icono player y pause
    const [timeMusicFinish, setTimeMusic] = useState('00:00'); // tiempo final inicial --> 00:00
    const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00'); // tiempo de progreso
    const [progressPercentage, setProgressPercentage] = useState('0%');

    const [hiddenVideo, setHiddenVideo] = useState(true); // falso --> video visible, verdadero --> video oculto




    const audioRef = useRef < HTMLAudioElement | null > (null);

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return '00:00';
        const min = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seg = (Math.floor(timeInSeconds % 60)).toString().padStart(2, '0');

        return `${min}:${seg}`;
    };

    const formatTimeProgress = (clickX: number, barWidth: number) => {
        if (!audioRef.current) return;
        const duration = audioRef.current.duration; //duracion del audio
        if (!duration || isNaN(duration) || barWidth <= 0) return;

        const percentage = Math.min(Math.max((clickX / barWidth) * 100, 0), 100); //calculo del porcentaje basado en la posicion del click
        setProgressPercentage(`${percentage.toFixed(2)}%`);

        const newTime = (percentage / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTimeFormatted(formatTime(newTime));
    };

    const handleBarClick = (event: MouseEvent<HTMLDivElement>) => {
        const dimensions = event.currentTarget.getBoundingClientRect(); //me brinda las dimensiones del elemento
        const clickX = event.clientX - dimensions.left; //posicion del click dentro de la barra
        const barWidth = dimensions.width; //ancho total de la barra, es decir el div padre
        console.log('ClickX:', clickX, 'BarWidth:', barWidth);
        console.log("Dimensiones: ", dimensions);
        console.log("Event: ", event);
        formatTimeProgress(clickX, barWidth);
    };

    useEffect(() => {
        audioRef.current = new Audio('/music/audio2.mp3');
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setTimeMusic(formatTime(audio.duration));
        };

        const handleTimeUpdate = () => {
            setCurrentTimeFormatted(formatTime(audio.currentTime));
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                setProgressPercentage(`${percentage.toFixed(2)}%`);
            }
        };

        const handleEnded = () => {
            setHandlerPlayer(false);
            setCurrentTimeFormatted('00:00');
            setProgressPercentage('0%');
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.pause();
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);


    useEffect(() => {

        if(hiddenVideo){
            document.body.style.overflow = 'auto'; // Permite el scroll
        }
        else{
            document.body.style.overflow = 'hidden'; // Evita el scroll
        }

        return () => {
            document.body.style.overflow = 'auto'; //por defecto el dashboard tiene scroll
        }


    }, [hiddenVideo]);

    

   

    const playerAudio = () => {
        if (!audioRef.current) return;
        setHandlerPlayer(true);
        audioRef.current.play().catch(err => console.log("Error al reproducir:", err));
    };

    const PauseAudio = () => {
        if (!audioRef.current) return;
        setHandlerPlayer(false);
        audioRef.current.pause();
    };

    const ID_VIDEO = "RYr96YYEaZY"

    const EMBED_URL = `https://www.youtube-nocookie.com/embed/${ID_VIDEO}?&controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&showinfo=0&autoplay=0&mute=0&start=0`;

    console.log("esto es embed URL:", EMBED_URL);

    return (



        <div>

            <div className={`${hiddenVideo ? "hidden h-0" : "fixed top-0 min-h-screen min-w-screen overflow-y-hidden"} bg-black bg-opacity-80`}>
                <div className='relative'>
                    <div className='flex justify-between items-center px-4 py-3 text-white'>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`} onClick={() => setHiddenVideo(true)}>
                            <ChevronDown className="size-9 active:text-gray-500" />
                        </button>
                        <h2 className='text-xl font-medium'>My Music</h2>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`}>
                            <ChevronDown className="size-9 active:text-gray-500" />
                        </button>

                    </div>

                    <div className='w-full h-95'>

                        <iframe className="h-full w-full" src={EMBED_URL}>
                        </iframe>

                    </div>

                    <Reproductor callbacks={{ playerAudio, PauseAudio, handlerPlayer, currentTimeFormatted, timeMusicFinish, progressPercentage, handleBarClick }} />


                </div>
            </div>
            {hiddenVideo ? <div onClick={() => setHiddenVideo(false)} className={`${!hiddenVideo && "hidden h-0"} fixed bottom-0`}><ReproductorMobile /></div> : ""}
        </div>
    );


}





