document.addEventListener("DOMContentLoaded", function () {
    const powerButton = document.getElementById("powerButton");
    const temperatureSlider = document.getElementById("temperatureSlider");
    const temperatureValue = document.getElementById("temperatureValue");
    const fanSpeedUpButton = document.getElementById("fanSpeedUpButton");
    const fanSpeedDownButton = document.getElementById("fanSpeedDownButton");

    let isLoggedIn = false;

    const urlParams = new URLSearchParams(window.location.search);
    const sessionToken = urlParams.get("sessionToken");
    if (sessionToken) {
        isLoggedIn = true;
        togglePageViews();
    }

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (usernameInput.value && passwordInput.value) {
            const generatedSessionToken = generateSessionToken();
            navigateToControllerPage(generatedSessionToken);
        } else {
            alert("Invalid login credentials");
        }
    });

    powerButton.addEventListener("click", function () {
        if (!isLoggedIn) return;
        if (powerButton.textContent === "Turn On") {
            powerButton.textContent = "Turn Off";
        } else {
            powerButton.textContent = "Turn On";
        }
    });

    temperatureSlider.addEventListener("input", function () {
        temperatureValue.textContent = temperatureSlider.value + "°C";
    });

    function navigateToControllerPage(sessionToken) {
        window.location.href = `controller.html?sessionToken=${sessionToken}`;
    }

    function togglePageViews() {
        const login = document.querySelector(".login");
        const controls = document.querySelector(".controls");
        if (isLoggedIn) {
            login.style.display = "none";
            controls.style.display = "block";
            powerButton.removeAttribute("disabled");
            fanSpeedUpButton.removeAttribute("disabled");
            fanSpeedDownButton.removeAttribute("disabled");
        } else {
            login.style.display = "block";
            controls.style.display = "none";
            powerButton.setAttribute("disabled", "true");
            fanSpeedUpButton.setAttribute("disabled", "true");
            fanSpeedDownButton.setAttribute("disabled", "true");
        }
    }

    function generateSessionToken() {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let result = "";
        for (let i = 0; i < 32; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
});
