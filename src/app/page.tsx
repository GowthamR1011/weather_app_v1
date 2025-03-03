"use client";
const DATA_FETCH_URL = "/api/weather/";

import { useState,useEffect } from "react";
import { WeatherData } from "@/interface/weatherdata";
import Image from "next/image";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";


export default function Home() {


  const [weatherdata,SetWeatherData] = useState<WeatherData>();
  const [errorMessage,SetErrorMessage] = useState<boolean>(false);
  const [isLoading,SetIsLoading] = useState<boolean>(true);
  const [isLocationGranted,SetIsLocationGranted] = useState<boolean>(false);
  const [darkMode,setIsDarkMode] = useState<boolean>(false);


  function getLocation(){
    if('geolocation' in navigator)
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        SetIsLocationGranted(true);
        const { latitude, longitude } = coords;
        fetchData(latitude,longitude);
    })
    else{
      SetIsLocationGranted(false);
    }
  }


  
  function fetchData(lat:number,lon:number){
    fetch(DATA_FETCH_URL+`${lat}/${lon}`)
    .then(res => res.json())
    .then((data)=>{
      if(data.cod==404){
        SetErrorMessage(true);
      }
      else{
      SetWeatherData(data);
      if(data.sys.sunset < data.dt){
        setIsDarkMode(true);
      }
    }
    SetIsLoading(false);
    })
  }
  
  useEffect(()=>{
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    },10*60*1000);
  return () => clearInterval(interval)
  },[]);


    
  function kelvintoCelcius(temp:number):number{
    return Math.round(temp - 273.15);
  }
  if(!isLocationGranted) return <div className="h-screen flex items-center justify-center font-mono">Grant Location Permision to fetch Weather......</div>
  if(isLoading)return<div className="h-screen flex items-center justify-center font-mono"><span>Loading........</span></div>
  if(errorMessage)return<div className="h-screen flex items-center justify-center font-mono"><span>We are facing some technical difficulties right now </span></div>
  if(weatherdata)
  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="absolute top-5 right-5 bg-neutral-120 text-black flex justify-end dark:bg-neutral-900 dark:text-white">
        <button onClick={()=>{setIsDarkMode(!darkMode)}}>{darkMode?<MdOutlineWbSunny size={24}/>:<MdDarkMode size={24}/>}</button>
      </div>
      <div className="bg-neutral-120 dark:bg-neutral-900 h-screen flex items-center justify-center">
      <div className="grid font-mono">
        
        <div className="weatherIcon flex justify-center items-center">
          <Image 
            src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} 
            alt={weatherdata.weather[0].description}
            height={100}
            width={100}
            />
        </div>
        <div className="temperature flex justify-center items-center">
          <p className="text-8xl text-neutal-900 dark:text-neutral-100">{kelvintoCelcius(weatherdata.main.temp)}°C</p>
        </div>
        <div className="feels-like flex justify-center items-center">
          <p className="text-sm/8 text-neutal-900 dark:text-neutral-100">Feels Like: {kelvintoCelcius(weatherdata.main.feels_like)}°C</p>
        </div>
        <div className="location flex justify-center items-center">
          <p className="text-neutal-900 dark:text-neutral-100">{weatherdata.name}</p>
        </div>
      </div>
      </div>
  </div>
  );
}
