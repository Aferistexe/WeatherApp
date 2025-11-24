import React, { useState } from "react";
import '../styles/Weather.css';

function WeatherApp(){
    const [search,setSearch] = useState('');
    const [weather,setWeather] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('')
    const [emodji,setEmodji] = useState("")

    const cityCoordinates = {
        'москва': { lat: 55.7558, lon: 37.6176 },
        'санкт-петербург': { lat: 59.9343, lon: 30.3351 },
        'казань': { lat: 55.7961, lon: 49.1064 },
        'новосибирск': { lat: 55.0084, lon: 82.9357 },
        'екатеринбург': { lat: 56.8389, lon: 60.6057 },
        'сочи': { lat: 43.5855, lon: 39.7231 },
        'краснодар': { lat: 45.0355, lon: 38.9750 },
        'нижний новгород': { lat: 56.3269, lon: 44.0059 },
        'самара': { lat: 53.1959, lon: 50.1002 },
        'омск': { lat: 54.9885, lon: 73.3242 },
        'старая русса': {lat:57.99072,lon:31.355461},
        'великий новгород':{lat:58.522857,lon:31.269816},
        'зеленогорск':{lat:60.193153,lon:29.701528},
        'рощино':{lat:60.256511,lon:29.6031},
        'сестрорецк':{lat:60.094255,lon:29.973296},
        'мурино':{lat:60.051284,lon:30.438578},
        'чебоксары':{lat:56.139918,lon:47.247728},
        'ульяновск':{lat:54.314192,lon:48.403132},
        'оренбург':{lat:51.768205,lon:55.097},
        'челябинск':{lat:55.159902,lon:61.402554}
    };
    const handleSearch = async () =>{

        if(!search.trim()){
        setError('Поле пустое')
            return
        }
        setLoading(true)
        setError('')
        
        try{ 
            const cityKey = search.toLowerCase().trim()
            const coordinates = cityCoordinates[cityKey]
            if(!coordinates){
                setError("В базе нет этого города")
                return
            }


        const lat = coordinates.lat
        const lon = coordinates.lon

        console.log(`Кординаты ${lat} ${lon}`)

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)

        const weatherData = await weatherRes.json()
        setWeather(weatherData.current_weather)

        console.log('Данные получены ' ,weatherData)
    const code = weatherData.current_weather.weathercode;
    console.log('Weather code:', code);
        if(code === 0){
            setEmodji("☀️")
        }if(code >0 && code < 4){
             setEmodji("⛅")
        }if(code >44 && code < 49){
             setEmodji("🌫️")
        }if(code >50 && code < 68){
             setEmodji("🌧️")
        }else if(code >70 && code < 78){
            setEmodji("❄️")
        }
        }catch (error){
            setError("Ошибка", error)
        }finally {
            setLoading(false)
        }
        
    }
    const resetWeather = () => {
        setWeather(null)
        setSearch('')
    }

    const hadleKeyPress = (event) =>{
        if(event.key === "Enter"){
            handleSearch()
        }
    }

    return(
        <div style={{width:"100%",maxWidth:"600px",margin:"0 auto", backgroundColor:"#4f606177",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center',gap:'20px',borderRadius:"40px"}}>
            <h1 style={{fontSize:"48px"}}>Погодное приложение</h1>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:'center',gap:'20px'}}>
                <input style={{padding:'10px',borderRadius:'20px',border:"1px solid #26292977"}} type="text" placeholder="Введите город" value={search} onChange={(e)=> setSearch(e.target.value)} onKeyPress={hadleKeyPress}/>
                <button  onClick={handleSearch}>Поиск</button>
                <button onClick={resetWeather}>Очистить</button>
            </div>
            {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
            {loading && <p>Загрузка</p> }

            {weather && 
            <div className={loading ?'display' :''}style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center'} }>
                <h1>{search}</h1>
                <p style={{fontSize:"20px"}}>Температура: <strong>{weather.temperature} °C {emodji}</strong></p>
                <p>Дата: <strong>{new Date(weather.time).toLocaleString()}</strong></p>
                <p>Ветер : <strong>{weather.windspeed} km/h</strong></p>
            </div>
            }
        </div>
    )
}

export default WeatherApp