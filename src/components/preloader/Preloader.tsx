import { TbLoader3 } from "react-icons/tb";


export default function Preloader() {
    return (
        <div className='grid place-items-center h-[100vh]'>
            <div className='flex items-center content-center flex-col'>
                <TbLoader3 className="h-24 w-24 animate-spin text-slate-500" />
                <h2>Loading Please Wait....</h2>
            </div>
        </div>
    )
}
