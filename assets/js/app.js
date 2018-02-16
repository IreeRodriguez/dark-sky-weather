// saber si el browser soporta geolocalizacio y si es asi pedir la localizacion y llamar a la funcion showPosition
function getLocation() {
    if (navigator.geolocation) {        
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Tu navegador no soporta geolocalizacion');
    }
}
// funcion que construye el url para necesario para llamar a la API del clima
function showPosition(position) {
    const coords = `https://api.darksky.net/forecast/e08338d346731e9cb921a3b7731f32a6/${position.coords.latitude},${position.coords.longitude}?units=auto`;    
    getWeather(coords);
}

// se guardan los datos devueltos por la api para su uso posterior
let weatherData; 
// se llama al API y se muestra en el HTML el clima actual
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
// se utiliza los datos guardados en weatherData, para iterar en los datos y encontrar los datos del pronostico de lso siguientes dias
$('#week').click(function() {
    $('#week').addClass('d-none');
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $('#weather').empty();
    $('#weather').append('<p>' + weatherData.daily.summary + '°</p>');
    let weekData = weatherData.daily.data;
    $( weekData ).each(function(index) {
        let day = weekData[index].time;
        // las fechas en los datos vienen en formato unix, se deben multiplicar por 1000 para poder hacer una new Date con la fecha correcta
        let getDate = new Date(day * 1000);
        let getDay = getDate.getDay();
        $('#weather').append('<p>' + days[getDay] + ': ' + weekData[index].temperatureMin + '° - ' + weekData[index].temperatureMax +'°</p>');       
    });   
});
getLocation();