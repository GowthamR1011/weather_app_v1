"use client";
const DATA_FETCH_URL = "/api/city/";

import { UnknowCity } from "@/components/unknowncity";
import { useEffect, useState } from "react";
import { WeatherData } from "@/interface/weatherdata";
import Image from "next/image";
import { MdDarkMode, MdOutlineWbSunny } from "react-icons/md";


export default function Home() {

	const [city,setCity] = useState<string>("Manchester");
  	const [weatherdata,setWeatherData] = useState<WeatherData>();
  	const [errorCode,setErrorCode] = useState<number>(200);
  	const [isLoading,setIsLoading] = useState<boolean>(false);
  	const [darkMode,setIsDarkMode] = useState<boolean>(false);
  	const [standardMetrics,setStandardMetrics] = useState<boolean>(true);

 
	function fetchCityWeather(){
		setIsLoading(true);
		fetch(DATA_FETCH_URL + city)
			.then(res => res.json())
			.then(data =>{
					setErrorCode(data.cod);			
					setWeatherData(data);
			});

		setIsLoading(false);
	}

	function changeMetrics(temp:number):number{
		if(standardMetrics)
			return Math.round(temp - 273.15);
		return Math.round((temp-273.15) * (9/5) + 32);
	}

	useEffect(()=>{
		fetchCityWeather();
	},[])

	if(isLoading)
		return(
			<div className="h-screen flex items-center justify-center font-mono">
				<span>Loading........</span>
			</div>
		)

	if(errorCode == 500)
		return(
		<div className="h-screen flex items-center justify-center font-mono">
			<span>We are facing some technical difficulties right now </span>
		</div>
	)

	if(errorCode == 404){
		return(
		<div>
			<div className="flex justify-center mt-1">
				<form onSubmit={(e) => {e.preventDefault();fetchCityWeather()}}>
					<input 
						type="text"
						placeholder="Search City"
						onChange={(e) => {setCity(e.target.value)}}
						className="text-black bg-neutral-120 dark:bg-neutral-900 dark:text-white rounded-2xl pl-2 p-1"
					/>
				</form>
			</div>
			<div>
				<UnknowCity />
			</div>
		</div>
		)
	}


	if(weatherdata)
	return (
	<div className={`flex h-screen flex-col ${darkMode && "dark"}`}>
		{/* Header */}
		<div className="p-4 w-full bg-neutral-120 text-black  dark:bg-neutral-900 dark:text-white  grid grid-cols-3 ">
			<div>
				{/* App Title  */}
			</div>
			<div className="flex justify-center">
				<form onSubmit={(e) => {e.preventDefault();fetchCityWeather()}}>
					<input 
						type="text"
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

		{/* Content  */}
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
	</div>
	);
	}
