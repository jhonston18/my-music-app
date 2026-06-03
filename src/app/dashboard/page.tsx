

import MiMusicaScroll from "../components/mi-musica-scroll";
import GET_DATA_MUSIC from "@/app/api/data-content/dataContent";
import FloatingReproductor from "@/app/components/floating-reproductor";



export default async function Dashboard() {


    const data = await GET_DATA_MUSIC();

    // console.log("estamos en Dashboard - Esta es la data en mimusica: ", data)

    return (
        <div>
            <div className="flex flex-col gap-4 p-5 mb-20">
                <div className="text-2xl font-bold">
                    <h1>Mi Música</h1>
                </div>
                <div>
                    <button className="p-2 bg-blue-600 mx-2 rounded-xl">Agregar Link</button>
                    <button className="p-2 border border-gray-400 mx-2 rounded-xl">Agregar musica local</button>

                </div>

                <div className="">
                    <input className="p-2 w-full border border-gray-400 outline-none rounded-xl" type="text" placeholder="Ingresa el link de youtube de la musica que quieres escuchar" />
                </div>

                <MiMusicaScroll data={data} id={'EdgkWykbvpw'} />
                <MiMusicaScroll data={data} id={'RYr96YYEaZY'} />
                <MiMusicaScroll data={data} id={'uJ_1HMAGb4k'} />


            </div>
            <FloatingReproductor />
        </div>
    )

}