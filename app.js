window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timzone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span')

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
                const {temperature, summary, icon} = data.currently;
                // set dom elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //celcius conversion
                let celcius = (temperature - 32) * (5/9);
                setIcons(icon, document.querySelector('.icon'));

                //adding change to celcius funct 
                temperatureSection.addEventListener('click', ()=> {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }else {
        alert("Your browser does not support this");
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color:"white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});