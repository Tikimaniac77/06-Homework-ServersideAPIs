var currentWeather = document.getElementById('cityWeather');
var submitBtn = document.getElementById('submitBtn');

var APIKey = "f7c5269b7ff70849ebb5f47fde1d3606";



function getApi(event) {
    var cityInput = document.getElementById('cityInput').value;
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&APPID=" + APIKey;
    console.log(cityInput);
    console.log(requestUrl);
    event.preventDefault();

    
    fetch(requestUrl)
      .then(function (response){
          console.log(response.status);
          return response.json();
      })
      .then(function (data){
          console.log(data);
          
          var resultDiv = document.createElement('div');
          resultDiv.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

          var resultBody = document.createElement('div');
          resultBody.classList.add('card-body');
          resultDiv.append(resultBody);

          var cityName = document.createElement('h3');
          cityName.textContent = data.name;

          var cityTemp = document.createElement('p');
          cityTemp.innerHTML = "<strong>Temperature:</strong> " + data.main.temp + " \xB0f";

          var cityWind = document.createElement('p');
          cityWind.innerHTML = "<strong>Wind:</strong> " + data.wind.speed + " MPH";

          var cityHumidity = document.createElement('p');
          cityHumidity.innerHTML = "<strong>Humidity:</strong> " + data.main.humidity + " %";          

          var cityUVI = document.createElement('p');

          var cityLat = data.coord.lat;
          var cityLon = data.coord.lon;

          function getUVapi(event){
              var UVRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;
              fetch(UVRequest)
                .then(function (response){
                    console.log(response.status);
                    return response.json();
                })
                .then(function (data){
                    console.log(data);
                    
                    cityUVI.innerHTML = "<strong>UV Index:</strong> " + data.current.uvi;
                })
          }

          getUVapi();
          
          

          resultBody.append(cityName, cityTemp, cityWind, cityHumidity, cityUVI);

          currentWeather.append(resultDiv);

      });
}




submitBtn.addEventListener('click', getApi);