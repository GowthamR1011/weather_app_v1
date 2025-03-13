import * as React from 'react';
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";


export interface IHeaderProps {
    changeCity:React.FormEventHandler<HTMLFormElement>,
    city:string,
    setCity:React.Dispatch<React.SetStateAction<string>>,
    setStandardMetrics:React.Dispatch<React.SetStateAction<boolean>>,
    standardMetrics:boolean,
    setIsDarkMode:React.Dispatch<React.SetStateAction<boolean>>,
    darkMode:boolean
}

export default function Header ({changeCity,city,setCity,setIsDarkMode,setStandardMetrics,darkMode,standardMetrics}: IHeaderProps) {
  return (
        <div className="p-4 w-full bg-neutral-120 text-black  dark:bg-neutral-900 dark:text-white  grid grid-cols-3 ">
            <div>
                {/* App Title  */}
            </div>
            <div className="flex justify-center">
                <form onSubmit={changeCity}>
                    <input 
                        type="text"
                        value={city}
                        placeholder="Search City"
                        onChange={(e) => {setCity(e.target.value)}}
                        className="text-black bg-neutral-120 dark:bg-neutral-900 dark:text-white rounded-2xl pl-2 p-1"
                    />
                </form>
            </div>
            <div className="flex justify-end">
                <button className="px-2" onClick={()=>{setStandardMetrics(!standardMetrics)}}>{standardMetrics?<>°F</>:<>°C</>}</button>
                <button className="px-2" onClick={()=>{setIsDarkMode(!darkMode)}}>{darkMode?<MdOutlineWbSunny size={24}/>:<MdDarkMode size={24}/>}</button>
            </div>
        </div>
  );
}
