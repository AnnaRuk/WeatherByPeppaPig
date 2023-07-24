const myAddress = "https://get.geojs.io/v1/ip/geo.json";
const currentWeatherExample =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true";

const picturesOfCodeWeather = document.getElementById("picturesOfCodeWeather");
const picturesOfMudWeather = document.getElementById("picturesOfMudWeather");
const numberOfTemperature = document.getElementById("numberOfTemperature");

const buttonCilsiyTemperature = document.getElementById(
  "buttonCilsiyTemperature"
);
const buttonFaringateTemperature = document.getElementById(
  "buttonFaringateTemperature"
);
const buttonShowWeather = document.getElementById("buttonShowWeather");

const listParametrsWeather = document.getElementById("listParametrsWeather");
const listParametrsDataTime = document.getElementById("listParametrsDataTime");

const countryAndCity = document.getElementById("countryAndCity");

const mudContainer = document.getElementById("mudContainer");
const mudTitleFirstRow = document.getElementById("mudTitleFirstRow");

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
const cloudyAndSunny =
  "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
const cloudy = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
const rain = "https://ssl.gstatic.com/onebox/weather/64/rain_light.png";
const snow =
  "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/svg/1f328.svg";
const picturesGoodMud =
  "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/01/30/10/Untitled-1.jpg?width=1200&height=1200&fit=crop";
const picturesBadMud =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e823352-276b-49b7-8c01-1a8add1af5e2/d9jabvs-301a0bff-6c81-4c17-b27e-2cd3d760e2ba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzllODIzMzUyLTI3NmItNDliNy04YzAxLTFhOGFkZDFhZjVlMlwvZDlqYWJ2cy0zMDFhMGJmZi02YzgxLTRjMTctYjI3ZS0yY2QzZDc2MGUyYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ozv0ikRneJV8pP7XKV4vEPvno7IrN00I_H8buCDB33A";

//0.block with Async/aweit

weatherHandler(getDataAboutPlaceAA, getCurrentWeatherAA, showfunctionAA);

async function getDataAboutPlaceAA() {
  try {
    const response = await fetch(myAddress);
    const res = await response.json();
    return {
      latitude: res.latitude,
      longitude: res.longitude,
      city: res.city,
      country: res.country,
    };
  } catch {
    throw new Error("error while getting location");
  }
}

async function getCurrentWeatherAA(location) {
  try {
    const { latitude, longitude, city, country } = location;
    requestCurrentWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(requestCurrentWeather);
    const res = await response.json();

    return {
      city: city,
      country: country,
      longitude: longitude,
      latitude: latitude,
      temperature: res.current_weather.temperature,
      time: res.current_weather.time,
      weathercode: res.current_weather.weathercode,
      winddirection: res.current_weather.winddirection,
      windspeed: res.current_weather.windspeed,
    };
  } catch {
    throw new Error("error while getting weather");
  }
}

async function weatherHandler(
  getDataAboutPlaceAA,
  getCurrentWeatherAA,
  showfunctionAA
) {
  let place = await getDataAboutPlaceAA();
  console.log(place);
  let weather = await getCurrentWeatherAA(place);
  console.log(weather);
  showfunctionAA(weather);
}

///TODO
function showfunctionAA(weather) {
  console.log(weather);
  console.log("DONE");

  getAndShowCurrentParametresOfWeatherTemperature(weather); ///temperature
  getAndShowCurrentParametresOfWeatherTimeAndDay(weather); /// time data
  getAndShowCurrentParametresOfWeatherWeathercode(weather); ///pictures acording weathercode
  ShowCurrentParametresOfWeatherWindspeedWinddirectionWeathercodeStatment(
    weather
  );
  showCityAndCountry(weather);

  buttonsEvent(weather);
}

//TODO/// ne rabotaet
function buttonsEvent(weather) {
  buttonCilsiyTemperature.addEventListener("click", () => {
    numberOfTemperature.textContent = weather.temperature.toFixed(0);
  });

  buttonFaringateTemperature.addEventListener("click", () => {
    numberOfTemperature.textContent = (
      (weather.temperature * 9) / 5 +
      32
    ).toFixed(0);
  });

  //5. MUD

  buttonShowWeather.addEventListener("click", () => {
    //mudTitleFirstRow.textContent = "";

    switch (picturesCodeMud) {
      case (10, 20, 30):
        mudContainer.innerHTML = `<img id="picturesOfMudWeather" src=${picturesGoodMud} alt="">`;
        break;
      default:
        mudContainer.innerHTML = `<img id="picturesOfMudWeather" src=${picturesBadMud} alt="">`;
    }
    setTimeout(() => (mudContainer.innerHTML = ""), 5000);
  });
}

function getAndShowCurrentParametresOfWeatherTemperature(weather) {
  numberOfTemperature.textContent = weather.temperature.toFixed(0); /// temperature 25, but value 24.8
}

//4. BLOK title city country  TODO

function showCityAndCountry(weather) {
  countryAndCity.textContent = weather.country + ", " + weather.city;
}

///3.2.BLOK show time and day
// time:"2023-07-23T11:00"
function getAndShowCurrentParametresOfWeatherTimeAndDay(weather) {
  let timeAndData = weather.time;
  showTimeAndData(timeAndData);
}

function showTimeAndData(timeAndData) {
  let data = new Date(timeAndData);
  currentDay = data.getDay();
  currentMonth = data.getMonth();

  let listLi = "";
  let li = `<li class='li-data'> ${data.getDate()} ${getNameOfMonth(
    currentMonth
  )} ${getDayOfWeek(currentDay)}</li>`;
  let li1 = `<li class='li-time'> ${data.getHours()}:${String(
    data.getMinutes()
  ).padStart(2, "0")}</li>`;
  listLi = li + li1;
  listParametrsDataTime.innerHTML = listLi;
}

function getNameOfMonth(currentMonth) {
  const currentMonthFromObject = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "December",
  };
  return currentMonthFromObject[currentMonth];
}

function getDayOfWeek(currentDay) {
  const dayOfWeekFromObject = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return dayOfWeekFromObject[currentDay];
}

///3.3.BLOK  weathercode

function getAndShowCurrentParametresOfWeatherWeathercode(weather) {
  let weathercode = weather.weathercode;
  console.log(weathercode);

  actionDependsOfWeathercode(weathercode);
}

//TODO
function actionDependsOfWeathercode(weathercode) {
  switch (weathercode) {
    case 0:
    case 1:
      picturesOfCodeWeather.src = sunny;
      codeDescription = "Clear sky/Mainly clear";
      picturesCodeMud = 10;
      break;
    case 2:
      picturesOfCodeWeather.src = cloudyAndSunny;
      codeDescription = "partly cloudy";
      picturesCodeMud = 20;
      break;
    case 3:
      picturesOfCodeWeather.src = cloudy;
      codeDescription = "cloudy";
      picturesCodeMud = 30;
      break;
    case (61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99):
      picturesOfCodeWeather.src = rain;
      codeDescription = "rain";
      picturesCodeMud = 40;
      break;

    case (71, 73, 75, 77, 85, 86):
      picturesOfCodeWeather.src = snow;
      codeDescription = "snow";
      picturesCodeMud = 50;
      break;
    ///TODO add pictures
    default:
      picturesOfCodeWeather.src = rain;
      codeDescription = "bad weather";
      picturesCodeMud = 60;
  }
}

///3.4.BLOK show windspeed + winddirection + weathercode(description)

function ShowCurrentParametresOfWeatherWindspeedWinddirectionWeathercodeStatment(
  weather
) {
  let listLi = "";
  let li = `<li class='li-windspeed'> windspeed: ${weather.windspeed} km/h </li>`;
  let li1 = `<li class='li-winddirection'> winddirection: ${winddirectionByParametr(
    weather.winddirection
  )}</li>`;
  let li2 = `<li class='li-codeDescription'> weather now: ${codeDescription}</li>`;
  listLi = li + li1 + li2;

  ListParametrsWeather.innerHTML = listLi;
}

function winddirectionByParametr(winddirection) {
  if (winddirection == 0 || winddirection == 360) {
    return "nord";
  }
  if (winddirection > 0 && winddirection < 90) {
    return "nord-east";
  }
  if (winddirection > 90 && winddirection < 180) {
    return "east-south";
  }
  if (winddirection == 180) {
    return "south";
  }
  if (winddirection > 180 && winddirection < 270) {
    return "south-west";
  }
  if (winddirection == 270) {
    return "west";
  }
  if (winddirection > 270 && winddirection < 360) {
    return "west-nord";
  }
}
