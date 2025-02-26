type Coordinates = {
    lat:number,
    lon:number
};

type Weather = {
    id:number,
    main:string,
    description:string,
    icon:string
}

type Measurements = {
    temp:number,
    feels_like:number,
    temp_min:number,
    temp_map:number,
    pressure:number,
    humidity:number,
    sea_level:number,
    grnd_level:number
}

export interface WeatherData{
    
        coord:Coordinates ,
        weather: Weather[],

        base: string,
        main:Measurements,

        visibility: number,

        wind : {
            speed:number,
            deg:number
        },
        

        clouds: {
            all: number,
        },


        dt: number,
        sys: {
            type: number,
            id: number,
            country: number,
            sunrise: number,
            sunset: number
        },

        timezone: number,
        id: number,
        name: number,
        cod: number
    }