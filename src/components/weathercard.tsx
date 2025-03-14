import Image from 'next/image';


import  { type WeatherData } from '@/interface/weatherdata';
export interface IWeatherCardProps {
    weatherdata: WeatherData,
    changeMetrics: (temp:number) => number,
    standardMetrics:boolean
}

export function WeatherCard ({weatherdata,changeMetrics,standardMetrics}: IWeatherCardProps ) {
  return (
        <div className='bg-neutral-120 dark:bg-neutral-900  w-screen h-screen grid grid-cols-1 font-mono'> 
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
                                 text-black bg-neutral-120
                                 dark:text-white dark:bg-neutral-900
                                  w-full gap-4'>

                    <div className='flex justify-center items-center text-xl p-4 gap-6 '>
                        <>Max: {changeMetrics(weatherdata.main.temp_max)}{standardMetrics?<> °C</>:<> °F</>}</>
                    </div>

                    <div className='flex justify-center items-center text-xl p-4 gap-6'>
                        <>Min: {changeMetrics(weatherdata.main.temp_min)}{standardMetrics?<> °C</>:<> °F</>}</>
                    </div>
                    <div className='flex justify-center items-center text-xl p-4 gap-6 '>
                        <>Humidity: {weatherdata.main.humidity}</>
                    </div>
                    <div className='flex justify-center items-center text-xl p-4 gap-6 '>
                        <>Sunrise: {new Date(weatherdata.sys.sunrise * 1000).toLocaleTimeString([],{hour:"2-digit",minute:'2-digit'})}</>
                    </div>
                    <div className='flex justify-center items-center text-xl p-4 gap-6 '>
                        <>Sunset: { new Date(weatherdata.sys.sunset * 1000).toLocaleTimeString([],{hour:"2-digit",minute:'2-digit'}) }</>
                    </div>
                    <div className='flex justify-center items-center text-xl p-4 gap-6 '>
                        <>Wind: {weatherdata.wind.speed}</>
                    </div>
                </div>
        
        </div>
  );
}
