import * as React from 'react';
import Image from 'next/image';


import  { type WeatherData } from '@/interface/weatherdata';
export interface IWeatherCardProps {
    weatherdata: WeatherData,
    changeMetrics: Function,
    standardMetrics:Boolean
}

export function WeatherCard ({weatherdata,changeMetrics,standardMetrics}: IWeatherCardProps ) {
  return (
        <div className="bg-neutral-120 dark:bg-neutral-900  w-screen flex-1 flex items-center justify-center m-auto">
            <div className="grid font-mono">
                
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
  );
}
