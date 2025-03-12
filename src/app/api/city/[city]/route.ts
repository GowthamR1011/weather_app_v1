import { NextResponse } from "next/server";
import { WeatherData } from "@/interface/weatherdata";
import { ErrorMessage } from "@/interface/errormessage";
import { cookies } from "next/headers";

type Context = {
   params: Promise<{
    city:string
   }>
}

export async function GET(request:Request, context:Context ) {
    
    const {params} = context;  
    const {city} = await params;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHER_API_KEY}&q=${city}`,
    {
        cache:"no-store"
    })

    const weatherdata:WeatherData | ErrorMessage = await response.json()

    if(weatherdata.cod == 401)
        return NextResponse.json({cod:500,message:"Unable to Fetch Data"});


    if(weatherdata.cod == 500)
        return NextResponse.json({cod:404,message:"City Not Found"});
    
    
    return NextResponse.json({...weatherdata});
}