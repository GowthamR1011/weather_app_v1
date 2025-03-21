import Image from 'next/image';
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { BsSunrise, BsSunset } from "react-icons/bs";

import  { type WeatherData } from '@/interface/weatherdata';
export interface IWeatherCardProps {
    weatherdata: WeatherData,
    changeMetrics: (temp:number) => number,
    standardMetrics:boolean
}

export function WeatherCard ({weatherdata,changeMetrics,standardMetrics}: IWeatherCardProps ) {
  return (
        <div className='bg-white dark:bg-neutral-900 w-screen h-screen grid grid-cols-1 font-mono'> 
            <div className="flex-1 flex items-center justify-center m-auto">
                <div className="grid ">
                
                    {/* Weather Icon */}
                    <div className="weatherIcon flex justify-center items-center">
                    <Image 
                    src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} 
                    alt={weatherdata.weather[0].description}
                    height={100}
                    width={100}
                    />
                    </div>

                    {/* Display Temperature */}
                    <div className="temperature flex justify-center items-center">
                    <p className="text-8xl text-neutal-900 dark:text-neutral-100">{changeMetrics(weatherdata.main.temp)}{standardMetrics?<>°C</>:<>°F</>}</p>
                    </div>

                    {/* Feels Like Display */}
                    <div className="feels-like flex justify-center items-center">
                    <p className="text-sm/8 text-neutal-900 dark:text-neutral-100">Feels Like: {changeMetrics(weatherdata.main.feels_like)}{standardMetrics?<>°C</>:<>°F</>}</p>
                    </div>

                    {/* Display City Name*/}
                    <div className="location flex justify-center items-center">
                    <p className="text-neutal-900 dark:text-neutral-100">{weatherdata.name}</p>
                    </div>
                </div>
            </div>

            {/* More Details */}
            <div className='grid sm:grid-cols-3 grid-cols-2 content-evenly 
                                 text-black bg-white/50
                                 dark:text-white dark:bg-neutral-900/50
                                 w-full gap-4 px-4 sm:px-8 md:px-16 py-4'>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <FaTemperatureHigh className="text-2xl" />
                        <span className="text-sm">Max Temp</span>
                        <span className="text-2xl">{changeMetrics(weatherdata.main.temp_max)}{standardMetrics?<> °C</>:<> °F</>}</span>
                    </div>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <FaTemperatureLow className="text-2xl" />
                        <span className="text-sm">Min Temp</span>
                        <span className="text-2xl">{changeMetrics(weatherdata.main.temp_min)}{standardMetrics?<> °C</>:<> °F</>}</span>
                    </div>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <WiHumidity className="text-3xl" />
                        <span className="text-sm">Humidity</span>
                        <span className="text-2xl">{weatherdata.main.humidity}%</span>
                    </div>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <BsSunrise className="text-2xl" />
                        <span className="text-sm">Sunrise</span>
                        <span className="text-2xl">
                            {new Date((weatherdata.sys.sunrise + weatherdata.timezone) * 1000).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <BsSunset className="text-2xl" />
                        <span className="text-sm">Sunset</span>
                        <span className="text-2xl">
                            {new Date((weatherdata.sys.sunset + weatherdata.timezone) * 1000).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>

                    <div className='flex flex-col justify-center items-center text-xl p-4 gap-2 bg-slate-200/70 dark:bg-slate-600/80 rounded-lg backdrop-blur-md shadow-lg'>
                        <FaWind className="text-2xl" />
                        <span className="text-sm">Wind Speed</span>
                        <span className="text-2xl">{weatherdata.wind.speed} m/s</span>
                    </div>
                </div>
        
        </div>
  );
}
