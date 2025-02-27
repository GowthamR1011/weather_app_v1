import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
      "coord": {
          "lon": -0.1257,
          "lat": 51.5085
      },
      "weather": [
          {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01n"
          }
      ],
      "base": "stations",
      "main": {
          "temp": 278.79,
          "feels_like": 277.78,
          "temp_min": 277.21,
          "temp_max": 280.01,
          "pressure": 1025,
          "humidity": 72,
          "sea_level": 1025,
          "grnd_level": 1020
      },
      "visibility": 10000,
      "wind": {
          "speed": 1.54,
          "deg": 310
      },
      "clouds": {
          "all": 7
      },
      "dt": 1740685621,
      "sys": {
          "type": 2,
          "id": 2091269,
          "country": "GB",
          "sunrise": 1740639004,
          "sunset": 1740677803
      },
      "timezone": 0,
      "id": 2643743,
      "name": "London",
      "cod": 200
  })
};
  
