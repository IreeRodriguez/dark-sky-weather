function getLocation() {
    if (navigator.geolocation) {        
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Tu navegador no soporta geolocalizacion');
    }
}
function showPosition(position) {
    const coords = `https://api.darksky.net/forecast/e08338d346731e9cb921a3b7731f32a6/${position.coords.latitude},${position.coords.longitude}?units=auto`;

    
    getWeather(coords);
}
let weatherData; 
function getWeather(coords) {
    $.getJSON(coords, function(data) {
        weatherData = data;
        let title = document.getElementById('title');
        let weatherDiv = document.getElementById('weather');
        title.innerHTML = data.timezone;
        $('#weather').append('<h3>' + data.currently.summary + '</h2>' +
         '<p>Temperature: ' + data.currently.temperature + '°</p>' + 
         '<p>Humidity: ' + data.currently.humidity + '%</p>' + 
         '<p>UV Index: ' + data.currently.uvIndex + '%</p>' +
         '<p>Pressure: ' + data.currently.pressure + 'hPa</p>' );
         $('#week').removeClass('d-none');
    })
}

$('#week').click(function() {
    $('#week').addClass('d-none');
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $('#weather').empty();
    $('#weather').append('<p>' + weatherData.daily.summary + '°</p>');
    let weekData = weatherData.daily.data;
    $( weekData ).each(function(index) {
        let day = weekData[index].time;
        let getDate = new Date(day * 1000);
        let getDay = getDate.getDay();
        $('#weather').append('<p>' + days[getDay] + ': ' + weekData[index].temperatureMin + '° - ' + weekData[index].temperatureMax +'°</p>');       
    });   

});


getLocation();