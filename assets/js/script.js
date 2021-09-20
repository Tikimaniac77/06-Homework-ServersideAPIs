var currentWeather = document.getElementById('cityWeather');

var cityList = document.getElementById('cityList');

var submitBtn = document.getElementById('submitBtn');

var listBtn = document.querySelectorAll('.listBtn');

var APIKey = "f7c5269b7ff70849ebb5f47fde1d3606";

var listContainer = [];


//function will take city name input into form and generate elements dynamically on page using weatherAPI fetch requests.
function getApi(event) {
    var cityInput = document.getElementById('cityInput').value;
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&APPID=" + APIKey;
    console.log(cityInput);
    console.log(requestUrl);
    event.preventDefault();

    //fetch request
    fetch(requestUrl)
      .then(function (response){
          console.log(response.status);
          return response.json();
      })
      .then(function (data){
          console.log(data);
          
          //creates parent div
          var resultDiv = document.createElement('div');
          resultDiv.classList.add('card', 'bg-light', 'text-dark', 'p-3');

          //creates body div
          var resultBody = document.createElement('div');
          resultBody.classList.add('card-body');
          resultDiv.append(resultBody);

          //generates city name to page from apicall data
          var cityName = document.createElement('h3');
          var today = moment().format('L');
          
          
          cityName.innerHTML = data.name + " (" +today+")";
          
          var icon = data.weather[0].icon;
          //var iconURL = "https://openweathermap.org/img/wn/" + icon + "2x.png";
          var iconImg = document.createElement('img');
          iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";



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
          
          

          resultBody.append(cityName, iconImg, cityTemp, cityWind, cityHumidity, cityUVI);

          currentWeather.append(resultDiv);

                   
          var listText = document.getElementById('cityInput').value.trim();

          listContainer.push(listText);
          cityInput.value = "";

          storedList();
          renderList();

      });
}

//generate City List
function renderList() {
    cityList.innerHTML = "";

    for (var i = 0; i < listContainer.length; i++) {
      var listItem = listContainer[i];

      var cityInput = document.getElementById('cityInput').value;
      
      var cityListItems = document.createElement('button');

      cityListItems.textcontent = cityInput;
      cityListItems.setAttribute('data-index', i);
      cityListItems.classList.add('listBtn')
      cityListItems.textContent = listItem;

      cityList.append(cityListItems);
    }
  }
    function init() {
        var storeList = JSON.parse(localStorage.getItem('cities'));

        if (storeList !== null) {
            listContainer = storeList;
        }

        renderList();
    }
    
    function storedList(){
        localStorage.setItem('cities', JSON.stringify(listContainer));
    }



submitBtn.addEventListener('click', getApi);

//listBtn.addEventListener('click', function);

init();