const OPENWEATHER_API_KEY = ""
import { WeatherData } from "@/interface/weatherdata";


import Image from "next/image";
export default async function Home() {

  const latitude:number = 53.4808; 
  const longitude:number =  -2.1487;

  const weatherdata:WeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHER_API_KEY}&lon=${longitude}&lat=${latitude}`,{
                                      cache:"no-store"
                                    })
                            .then(res => res.json());
    
  function kelvintoCelcius(temp:number):number{
    return Math.round(temp - 273.15);
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid font-mono">
        
        <div className="weatherIcon flex justify-center items-center">
          <Image 
            src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} 
            alt={weatherdata.weather[0].description}
            height={20}
            width={20}
            layout="responsive"/>
        </div>
        <div className="temperature flex justify-center items-center">
          <p className="text-8xl">{kelvintoCelcius(weatherdata.main.temp)}°C</p>
        </div>
        <div className="feels-like flex justify-center items-center">
          <p className="text-sm/8">Feels Like: {kelvintoCelcius(weatherdata.main.feels_like)}°C</p>
        </div>
        <div className="location flex justify-center items-center">
          <p>{weatherdata.name}</p>
        </div>
      </div>
    </div>
  );
}
