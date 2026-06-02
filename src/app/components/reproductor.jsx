
import { TextAlignJustify, Play, SkipBack, SkipForward, Heart, Repeat, Pause } from "lucide-react";
import TimeLineMusic from '@/app/components/time-line-music'

export default function Reproductor({ callbacks }) {


    const { playerAudio, PauseAudio, handlerPlayer, currentTimeFormatted, timeMusicFinish, progressPercentage, handleBarClick } = callbacks;


    return (


        <div className='flex flex-col gap-5 mx-6 my-6'>
            <div>
                <span className='block text-sm text-gray-300 uppercase tracking-wider font-bold'>Canal</span>
                <p className='text-xl font-semibold'>Lana del rey - Salvatore (lyrics)</p>
            </div>

            <div className="my-2">
                {/* Le pasamos el porcentaje dinamico de actualizacion al componente */}
                <TimeLineMusic width={progressPercentage} onClick={handleBarClick} />
                <div className='w-full flex justify-between text-sm text-gray-300 mt-2'>
                    <span>{currentTimeFormatted}</span>
                    <span>{timeMusicFinish}</span>
                </div>
            </div>

            <div className='flex items-center justify-between mt-4'>
                <Heart className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                <div className='flex justify-center items-center gap-8'>
                    <SkipBack className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                    {handlerPlayer ? (
                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={PauseAudio}>
                            <Pause className='size-6 fill-black' />
                        </div>
                    ) : (
                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={playerAudio}>
                            <Play className='size-6 fill-black translate-x-0.5' />
                        </div>
                    )}
                    <SkipForward className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                </div>
                <Repeat className='size-7 cursor-pointer hover:scale-105 transition-transform' />
            </div>
        </div>

    )
}