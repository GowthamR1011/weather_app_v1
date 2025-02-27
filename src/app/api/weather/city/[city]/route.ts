import { NextResponse } from "next/server";
import { WeatherData } from "@/interface/weatherdata";
import { ErrorMessage } from "@/interface/errormessage";


export async function GET(request:Request, {params}: any) {
  
  const {city} = await params;

const weatherdata:WeatherData | ErrorMessage  = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHER_API_KEY}&q=${city}`,
                                                {
                                                    cache:"no-store"
                                                })
                            .then(async (res) => {
                                const jsonData =  await res.json();
                                if(jsonData.cod == 401){
                                    console.log(jsonData);
                                    return {cod:404,message:"Unable to Fetch Data"};
                                }
                                return jsonData;
                            }
                            )
                            .catch(err => {
                                console.log(err)
                               
                            });
        
  return NextResponse.json({...weatherdata});
}