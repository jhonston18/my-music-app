


import Image from "next/image";

import BoxMusic from "./box-music";





export default function MiMusicaScroll ({data, id} ) {

  // console.log("Esta es la data en mimusica scroll: ", data)
  // console.log("Este es el id en mimusica scroll: ", id)


  return (

    <div>

      <div>
        <h2 className="text-2xl font-bold mb-4">album.title</h2>
      </div>
      <div className="flex snap-x snap-mandatory overflow-x-auto w-full gap-3 py-4 [&::-webkit-scrollbar]:hidden">

        <BoxMusic data={data} id={id} />
        <BoxMusic data={data} id={id} />
        <BoxMusic data={data} id={id} />
        <BoxMusic data={data} id={id} />
        <BoxMusic data={data} id={id} />

        
      </div>

    </div>

  )
}


