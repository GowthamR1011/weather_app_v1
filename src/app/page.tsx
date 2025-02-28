"use client";
const DATA_FETCH_URL = "http://localhost:3000/api/weather/"

import { useState,useEffect } from "react";
import { WeatherData } from "@/interface/weatherdata";
import Image from "next/image";

export default function Home() {

  let lat:number = 51.509865; // Default to London in case no city provided.
  let lon:number =  -0.118092;
  const [weatherdata,SetWeatherData] = useState<WeatherData| any>();
  const [errorMessage,SetErrorMessage] = useState<boolean>(false);
  const [isLoading,SetIsLoading] = useState<boolean>(true);

  function getLocation(){
    if('geolocation' in navigator)
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        lat = latitude;
        lon = longitude;   
    })
    fetchData();
  }

  function fetchData(){
    fetch(DATA_FETCH_URL+`${lat}/${lon}`)
    .then(res => res.json())
    .then((data)=>{
      if(data.cod==404){
        SetErrorMessage(true);
      }
      else{
      SetWeatherData(data);
    }
    SetIsLoading(false);
    })
  }
  
  useEffect(()=>{
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    },60*1000);
  return () => clearInterval(interval)
  },[]);


    
  function kelvintoCelcius(temp:number):number{
    return Math.round(temp - 273.15);
  }

  if(isLoading)return<div className="h-screen flex items-center justify-center font-mono"><span>Loading........</span></div>
  if(errorMessage)return<div className="h-screen flex items-center justify-center font-mono"><span>We are facing some technical difficulties right now </span></div>
  
  return (
    <div className="h-screen flex items-center justify-center">
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
