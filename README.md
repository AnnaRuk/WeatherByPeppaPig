
1. Project name "Weather APP by Peppa Pig".
 
The main goal that the project solves is to display the current weather in a specific location at the current time.
Project status: under development.

2. Data sources
- https://open-meteo.com/ - Open-Meteo is an open-source weather API and offers free access for non-commercial use. No API key required.
- https://www.geojs.io/docs/v1/endpoints/geo/ - Contains all available geographical information about an IP.

3. Technologies
 -HTML
 -CSS
 -JS

*also in project is used resources from library Bootstrap. 

4. The project was developed as a homework assignment.

5. The project team
 - Anna Bieliaieva, student AIT-TR school(cohort25).

6. A short description of the project work
  6.1. Got my latitude and longitude data by sending a request to the following link: https://get.geojs.io/v1/ip/geo.json. From the response, I extracted the fields: "latitude," "longitude," "city," and "country."

  6.2. I took the values: latitude and longitude, and used them in the weather server request, following this example: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true.

  6.3. From the received response, I got the fields: "temperature," "windspeed," "weathercode," "winddirection," "time," and "date"." For the "winddirection" field, I obtained the textual description. For the "weathercode" field, I got both the textual description and the visual representation

  6.4. Displayed the obtained data using HTML/CSS. I used fonts, images, and additional capabilities. The temperature value was shown in Fahrenheit, and the visual representation of Peppa Pig was displayed based on the current weather conditions.

  6.5. Deployed the project on GitPages and wrote a README.


