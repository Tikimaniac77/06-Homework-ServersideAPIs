var currentWeather = document.getElementById('cityWeather');

var cityList = document.getElementById('cityList');

var submitBtn = document.getElementById('submitBtn');

var listBtn = document.querySelectorAll('.listBtn');

var forecast = document.getElementById('forecast');

var APIKey = "36d5883fc0309cad41a9117e54bcfc78";

var listContainer = [];


//function will take city name input into form and generate elements dynamically on page using weatherAPI fetch requests.
function getApi(event,citySelect) {
    currentWeather.innerHTML = '';
            
    var cityInput = document.getElementById('cityInput').value || citySelect;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&APPID=" + APIKey;
    
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
          
          // to use API to generate weather icons
          var icon = data.weather[0].icon;          
          var iconImg = document.createElement('img');
          iconImg.src = "https://openweathermap.org/img/wn/" + icon + ".png";


          //Generates rest of elements on input city with fetch from API
          var cityTemp = document.createElement('p');
          cityTemp.innerHTML = "<strong>Temperature:</strong> " + data.main.temp + " \xB0f";

          var cityWind = document.createElement('p');
          cityWind.innerHTML = "<strong>Wind:</strong> " + data.wind.speed + " MPH";

          var cityHumidity = document.createElement('p');
          cityHumidity.innerHTML = "<strong>Humidity:</strong> " + data.main.humidity + " %";          
          
          //To fetch UV index specifically needed to use other API call and reference data from previous api call.
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
                    //logic to change UV index color class
                    if(data.current.uvi < 2) {
                        cityUVI.classList.add('uvLow');
                    }else if(data.current.uvi > 6){
                        cityUVI.classList.remove('uvMod');                        
                        cityUVI.classList.add('uvHigh');
                    }else{
                        cityUVI.classList.remove('uvLow');
                        cityUVI.classList.add('uvMod');
                    }
                })
          }

          getUVapi();        
          
          resultBody.append(cityName, iconImg, cityTemp, cityWind, cityHumidity, cityUVI);

          currentWeather.append(resultDiv);

          var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIKey;
          
          //fetch and generate elements for 5 day forecast
          fetch(forecastURL)
            .then(function (res){
                console.log(res.status);
                return res.json();
            })
            .then(function(dat){
                console.log(dat);
                                
                var daysArray = [];

                let d1 = {
                    date: moment(dat.list[4].dt_txt, "YYYY-MM-DD").format("L"),
                    icon: dat.list[4].weather[0].icon,
                    temp: dat.list[4].main.temp,
                    wind: dat.list[4].wind.speed,
                    humid: dat.list[4].main.humidity                    
                };
                daysArray.push(d1);
                
                let d2 = {
                    date: moment(dat.list[12].dt_txt, "YYYY-MM-DD").format("L"),
                    icon: dat.list[12].weather[0].icon,
                    temp: dat.list[12].main.temp,
                    wind: dat.list[12].wind.speed,
                    humid: dat.list[12].main.humidity                  
                };
                daysArray.push(d2);

                let d3 = {
                    date: moment(dat.list[20].dt_txt, "YYYY-MM-DD").format("L"),
                    icon: dat.list[20].weather[0].icon,
                    temp: dat.list[20].main.temp,
                    wind: dat.list[20].wind.speed,
                    humid: dat.list[20].main.humidity                  
                };
                daysArray.push(d3);

                let d4 = {
                    date: moment(dat.list[28].dt_txt, "YYYY-MM-DD").format("L"),
                    icon: dat.list[28].weather[0].icon,
                    temp: dat.list[28].main.temp,
                    wind: dat.list[28].wind.speed,
                    humid: dat.list[28].main.humidity                  
                };
                daysArray.push(d4);

                let d5 = {
                    date: moment(dat.list[36].dt_txt, "YYYY-MM-DD").format("L"),
                    icon: dat.list[36].weather[0].icon,
                    temp: dat.list[36].main.temp,
                    wind: dat.list[36].wind.speed,
                    humid: dat.list[36].main.humidity                 
                };
                daysArray.push(d5);                
                console.log(daysArray);

                //creates parent div
                var resultDiv2 = document.createElement('div');
                resultDiv2.classList.add('row', 'card', 'bg-light', 'text-dark', 'p-3');
                resultDiv2.setAttribute('id', "forecastDiv");
                                                          
                    for (var i = 0; i < daysArray.length; i++) { 
                        
                    forecast.innerHTML = '';
                                                         
                    //creates body div
                    var resultBody2 = document.createElement('div');
                    resultBody2.setAttribute('id',"day" + i);
                    resultBody2.classList.add('col-auto', 'card-body');
                    resultDiv2.append(resultBody2);                                                       
                                       
                    var forecastDates = document.createElement('h4');
                    forecastDates.innerHTML = daysArray[i].date;
                    
                    var icon = daysArray[i].icon;          
                    var iconImg2 = document.createElement('img');
                    iconImg2.src = "https://openweathermap.org/img/wn/" + icon + ".png";

                    var forecastTemp = document.createElement('p');
                    forecastTemp.innerHTML = "Temp: " + daysArray[i].temp + " \xB0f";
                    

                    var forecastWind = document.createElement('p');
                    forecastWind.innerHTML = "Wind: " + daysArray[i].wind + " mph";
                    

                    var forecastHumid = document.createElement('p');
                    forecastHumid.innerHTML = "Humidity: " + daysArray[i].humid + " %";
                    
                    resultBody2.append(forecastDates, iconImg2, forecastTemp, forecastWind, forecastHumid);
                    forecast.append(resultDiv2);                    
                }                                
            
            })
                   
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
      document.getElementById('cityInput').value = '';

      //trying to get cityList items to change cityInpupt to getAPI function?
      cityListItems.addEventListener('click', function(event){
       //cityInput = "";
       cityInput = event.target.textContent;
       console.log(cityInput);
       /*function changeHandler(){
           var x=document.getElementById('cityInput').value;
           x.value = cityInput;

       }
       changeHandler();*/
       getApi(event,cityInput);

       
      })

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





//listBtn.addEventListener('click', getApi);

init();