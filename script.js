

const myAddress = "https://get.geojs.io/v1/ip/geo.json";
const currentWeatherExample = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true";

const picturesOfCodeWeather = document.getElementById('picturesOfCodeWeather'); 
const picturesOfMudWeather = document.getElementById('picturesOfMudWeather');
const numberOfTemperature = document.getElementById('numberOfTemperature');  

const buttonCilsiyTemperature = document.getElementById('buttonCilsiyTemperature');
const buttonFaringateTemperature = document.getElementById('buttonFaringateTemperature');
const buttonShowWeather = document.getElementById('buttonShowWeather');

const listParametrsWeather = document.getElementById('listParametrsWeather');
const listParametrsDataTime = document.getElementById('listParametrsDataTime');

const countryAndCity = document.getElementById('countryAndCity');

const mudContainer = document.getElementById('mudContainer');
const mudTitleFirstRow = document.getElementById('mudTitleFirstRow');

let latitude;
let longitude;
let city;
let country;
let requestCurrentWeather;
let answerCurrentWeather;
let codeDescription;
let picturesCodeMud;
let currentMonth;
let currentDay;


const sunny = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
const cloudyAndSunny = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
const cloudy = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
const rain = "https://ssl.gstatic.com/onebox/weather/64/rain_light.png";
const snow = "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/svg/1f328.svg";
const picturesGoodMud = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/01/30/10/Untitled-1.jpg?width=1200&height=1200&fit=crop";
const picturesBadMud = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e823352-276b-49b7-8c01-1a8add1af5e2/d9jabvs-301a0bff-6c81-4c17-b27e-2cd3d760e2ba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzllODIzMzUyLTI3NmItNDliNy04YzAxLTFhOGFkZDFhZjVlMlwvZDlqYWJ2cy0zMDFhMGJmZi02YzgxLTRjMTctYjI3ZS0yY2QzZDc2MGUyYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ozv0ikRneJV8pP7XKV4vEPvno7IrN00I_H8buCDB33A";


getDataAboutPlace();

//1. BLOK get plase

function getDataAboutPlace() {

fetch(myAddress).then((response)=>{
    if(response.ok){
        return response.json();
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}).then((res)=>{


    latitude = res.latitude;
    longitude = res.longitude; 
    city = res.city; 
    country = res.country;

    showCityAndCountry(country,city);

    requestCurrentWeather =  insertsCoordinatesCurrentWeatherRequest(); 
    answerCurrentWeather = getCurrentWeather();  

})


}


/// 2. BLOK getting current weather from https://open-meteo.com/

function insertsCoordinatesCurrentWeatherRequest(){

    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
}

function getCurrentWeather(){

    fetch(requestCurrentWeather).then((response)=>{
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then((res)=>{
        answerCurrentWeather = res.current_weather;

      
       getAndShowCurrentParametresOfWeatherTemperature(); ///temperature
       getAndShowCurrentParametresOfWeatherTimeAndDay(); /// time data
       getAndShowCurrentParametresOfWeatherWeathercode(); ///pictures acording weathercode
       ShowCurrentParametresOfWeatherWindspeedWinddirectionWeathercodeStatment();

})

}

/// 3. BLOK working with parametres
///3.1.BLOK temperature


function getAndShowCurrentParametresOfWeatherTemperature(){  

numberOfTemperature.textContent = answerCurrentWeather.temperature.toFixed(0);  /// temperature 25, but value 24.8

}

buttonCilsiyTemperature.addEventListener('click', (()=>{
    numberOfTemperature.textContent = answerCurrentWeather.temperature.toFixed(0);

}))

buttonFaringateTemperature.addEventListener('click', (()=>{

    numberOfTemperature.textContent = (((answerCurrentWeather.temperature)*9/5)+32).toFixed(0);

}))

///3.2.BLOK show time and day
  // time:"2023-07-23T11:00"
function getAndShowCurrentParametresOfWeatherTimeAndDay(){
    let timeAndData = answerCurrentWeather.time;
    showTimeAndData(timeAndData);
}

function showTimeAndData(timeAndData){

    let data = new Date(timeAndData);
    currentDay = data.getDay();
    currentMonth = data.getMonth();

    let listLi = '';
    let li = `<li class='li-data'> ${data.getDate()} ${getNameOfMonth(currentMonth)} ${getDayOfWeek(currentDay)}</li>`;
    let li1 = `<li class='li-time'> ${data.getHours()}:${String(data.getMinutes()).padStart(2,'0')}</li>`;
    listLi = li+li1;
    listParametrsDataTime.innerHTML = listLi;
}

function getNameOfMonth(){
switch(currentMonth) {
    case 0: return 'January';
    case 1: return 'February';
    case 2: return 'March';
    case 3: return 'April';
    case 4: return 'May';
    case 5: return 'June';
    case 6: return 'July';
    case 7: return 'August';
    case 8:  return 'September';
    case 9: return 'Oktober';
    case 10: return 'November';
    default:  return 'December';
}
}

function getDayOfWeek(){
    switch(currentDay) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        default:  return 'Saturday';
}}

///3.3.BLOK  weathercode

function getAndShowCurrentParametresOfWeatherWeathercode(){
    let weathercode = answerCurrentWeather.weathercode;

    actionDependsOfWeathercode(weathercode);
}

function actionDependsOfWeathercode(weathercode){
    switch(weathercode) {

        case 0,1: picturesOfCodeWeather.src  = sunny;
        codeDescription = 'Clear sky/Mainly clear';
        picturesCodeMud = 10;
        break;
        case 2: picturesOfCodeWeather.src  = cloudyAndSunny; 
        codeDescription = 'partly cloudy';
        picturesCodeMud = 20;
        break;
        case 3: picturesOfCodeWeather.src  = cloudy; 
        codeDescription = 'cloudy';
        picturesCodeMud = 30;
        break;
        case 61, 63, 65, 66,67,80, 81, 82,95,96,99: picturesOfCodeWeather.src  = rain; 
        codeDescription = 'rain';
        picturesCodeMud = 40;
        break;
        case 71, 73, 75, 77, 85, 86: picturesOfCodeWeather.src  = snow; 
        codeDescription = 'snow';
        picturesCodeMud = 50;
        break;
        ///TODO add pictures
        default: codeDescription = 'bad weather'; 
        picturesCodeMud = 60;
    }
        
}

///3.4.BLOK show windspeed + winddirection + weathercode(description)

function ShowCurrentParametresOfWeatherWindspeedWinddirectionWeathercodeStatment(){
    let listLi = '';
    let li = `<li class='li-windspeed'> windspeed: ${answerCurrentWeather.windspeed} km/h </li>`;
    let li1 = `<li class='li-winddirection'> winddirection: ${winddirectionByParametr(answerCurrentWeather.winddirection)}</li>`;
    let li2 = `<li class='li-codeDescription'> weather now: ${codeDescription}</li>`;
    listLi = li+li1+li2;
    
    ListParametrsWeather.innerHTML = listLi;

}

function winddirectionByParametr(winddirection){
    
        if (winddirection==0||winddirection==360){return 'nord'};
        if (winddirection>0&&winddirection<90){return 'nord-east'};
        if (winddirection>90&&winddirection<180){return 'east-south'};
        if (winddirection==180){return 'south'};
        if (winddirection>180&&winddirection<270){return 'south-west'}
        if (winddirection==270){return 'west'}
        if (winddirection>270&&winddirection<360){return 'west-nord'}
     
    }
    

//4. BLOK title city country

function showCityAndCountry(country,city){
    countryAndCity.textContent = country + ", "+ city;
}

//5. MUD 

buttonShowWeather.addEventListener('click', (()=>
{
mudTitleFirstRow.textContent = "";

    switch(picturesCodeMud) {
        case 10,20,30: 
        mudContainer.innerHTML = `<img id="picturesOfMudWeather" src=${picturesGoodMud} alt="">`;break;
        default:  mudContainer.innerHTML = `<img id="picturesOfMudWeather" src=${picturesBadMud} alt="">`;
    }}
    )

)


