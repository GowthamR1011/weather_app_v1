"use client";
const DATA_FETCH_URL = "/api/city/";

import { UnknowCity } from "@/components/unknowncity";
import { useEffect, useState } from "react";
import { WeatherData } from "@/interface/weatherdata";
import { WeatherCard } from "@/components/weathercard";
import Header from "@/components/header";
import WebsiteDown from "@/components/websitedown";
import Loading from "@/components/loading";

export default function Home() {

	const [city,setCity] = useState<string>("");
  	const [weatherdata,setWeatherData] = useState<WeatherData>();
  	const [errorCode,setErrorCode] = useState<number>(200);
  	const [isLoading,setIsLoading] = useState<boolean>(false);
  	const [darkMode,setIsDarkMode] = useState<boolean>(false);
  	const [standardMetrics,setStandardMetrics] = useState<boolean>(true);

	function changeTheme():void{
		if(darkMode)
			document.cookie = "theme=false; path=/;";
		else
			document.cookie = "theme=true; path=/;"

		setIsDarkMode(!darkMode);
	}
 
	function fetchCityWeather(c:string){
		setIsLoading(true);
		fetch(DATA_FETCH_URL + c)
			.then(res => res.json())
			.then(data =>{
					setErrorCode(data.cod);	
					if(data.cod == 200)		
						setWeatherData(data);
					else
						setWeatherData(undefined);
			});

		setIsLoading(false);
	}

	function changeMetrics(temp:number):number{
		if(standardMetrics)
			return Math.round(temp - 273.15);
		return Math.round((temp-273.15) * (9/5) + 32);
	}

	function changeCity(e:React.ChangeEvent<HTMLFormElement>){
		e.preventDefault();
		fetchCityWeather(city);
		setCity("");
	}
	
	useEffect(()=>{
		const themeCookieValue: string|undefined = document.cookie
														.split("; ")
														.find((row) => row.startsWith("theme="))
														?.split("=")[1];
		if(themeCookieValue)
			setIsDarkMode(themeCookieValue === "true");
													
		const citycookieValue:string|undefined = document.cookie
							.split("; ")
							.find((row) => row.startsWith("City="))
							?.split("=")[1];
		
		if(citycookieValue)
			fetchCityWeather(citycookieValue);
		else
			fetchCityWeather("Manchester"); 
	},[]);

	

	return (
		<div className={`flex h-screen flex-col ${darkMode && "dark"}`}>
		
			{/* Header */}
			<Header 
				changeCity={changeCity}
				setCity={setCity}
				city={city}
				changeTheme={changeTheme}
				setStandardMetrics={setStandardMetrics}
				darkMode={darkMode}
				standardMetrics={standardMetrics}
				/>

			{isLoading && <Loading />}

			{errorCode==500 && <WebsiteDown /> }

			{errorCode==404&& <UnknowCity /> }


			{/* Content  */}
			{weatherdata && <WeatherCard weatherdata={weatherdata} changeMetrics={changeMetrics} standardMetrics={standardMetrics}/> }

		</div>
	);
}
