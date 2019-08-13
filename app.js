window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timzone');

    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postition => {
            long = postition.coords.longitude;
            lat = postition.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const darkSkyApi = `${proxy}https://api.darksky.net/forecast/15661430832381c45f9e8b40f4d02998/${lat},${long}`;
            fetch(darkSkyApi)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary} = data.currently;
            })
        });
    }else {
        alert("Your browser does not support this");
    }
});