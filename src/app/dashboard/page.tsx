"use client"




import SideBar from '@/app/components/sidebar'
import Reproductor from '@/app/components/reproductor'

import { TextAlignJustify, Play, SkipBack, SkipForward, Heart, Repeat, Pause, ChevronDown } from "lucide-react";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

const albumMusic = [
    {
        id: 1,
        title: `Lana del rey - Salvatore (lyrics)`,
        image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
        audio: '/music/audio1.mp3'
    },
    {
        id: 2,
        title: `Nothing's gonna hurt you baby - Cicarettes (lyrics)`,
        image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
        audio: '/music/audio2.mp3'
    },
    {
        id: 3,
        title: 'Sweet - Cigarettes (lyrics)',
        image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
        audio: '/music/audio3.mp3'
    }
]


export default function Dashboard() {


    const [handlerPlayer, setHandlerPlayer] = useState(false); // manejador de icono player y pause
    const [timeMusicFinish, setTimeMusic] = useState('00:00'); // tiempo final inicial --> 00:00
    const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00'); // tiempo de progreso
    const [progressPercentage, setProgressPercentage] = useState('0%');
    const [isOpen, setIsOpen] = useState(false); //false --> cerrado, true --> abierto

    const onClose = () => setIsOpen(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

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


            <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className='min-h-screen backdrop-blur-2xl bg-black/20'>
                <div className='relative'>
                    <div className='flex justify-between items-center px-4 py-3 text-white'>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`} onClick={() => setIsOpen(true)}>
                            <ChevronDown className="size-9 active:text-gray-500"/>
                        </button>
                        <h2 className='text-xl font-medium'>My Music</h2>
                        <div className='w-10 h-10 rounded-full overflow-hidden relative'>
                            <Image
                                src='https://i1-e.pinimg.com/1200x/23/c3/6b/23c36b997f4facf89386e9674692b445.jpg'
                                alt='Image-profile'
                                fill
                                sizes="40px"
                                className='object-cover'
                                priority
                            />
                        </div>
                    </div>

                    <div className='w-full h-95'>

                        <iframe className="h-full w-full" src={EMBED_URL}>
                        </iframe>

                    </div>
                    


                    <Reproductor callbacks={{ playerAudio, PauseAudio, handlerPlayer, currentTimeFormatted, timeMusicFinish, progressPercentage, handleBarClick }} />


                </div>
            </div>
        </div>
    );
}