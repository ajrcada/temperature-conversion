let fahrenheitTemperature = [];
let celsiusTemperature = [];

let fahrenheit = document.querySelector("#Fahrenheit");
let celsius = document.querySelector("#Celsius");
let results = document.querySelector("#results");

let convert = document.querySelector("#convert");
let average = document.querySelector("#average");
let reset = document.querySelector("#reset");

function toSubmit() {
   return false;
}

function resetValue() {
   fahrenheit.value = "";
   celsius.value = "";
   average.disabled = true;
   convert.disabled = true;
   fahrenheit.disabled = true;
   reset.setAttribute("style", "visibility: hidden;");
}

function disableButton() {
   resetValue();
   results.value = "";
   fahrenheit.disabled = false;
   fahrenheit.focus();
}

document.addEventListener("keydown", (event) => {
   if (event.isComposing || event.keyCode === 13) {
      convert.click();
   }
});

document.addEventListener("keyup", (event) => {
   if (convert.disabled && !fahrenheit.value && celsiusTemperature.length)
      average.disabled = false;
   else average.disabled = true;

   if (!isNaN(parseInt(fahrenheit.value))) convert.disabled = false;
   else convert.disabled = true;
});

function convertTemp() {
   let fahrenheitTemp = parseInt(fahrenheit.value);
   fahrenheitTemperature.push(fahrenheitTemp);

   let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
   celsiusTemp = Math.floor(celsiusTemp * 100 + 0.5) / 100;
   celsiusTemperature.push(celsiusTemp);
   celsius.value = celsiusTemp;

   results.value +=
      fahrenheitTemp.toString().padStart(6, " ") +
      "    " +
      celsiusTemp.toFixed(2).toString().padStart(14, " ") +
      "\r\n";

   convert.disabled = true;
   average.disabled = false;

   fahrenheit.value = "";
   fahrenheit.setAttribute("maxlength", "4");
   fahrenheit.focus();

   if (fahrenheitTemperature.length == 10) {
      averageTemp();
   }
}

function averageTemp() {
   let celsiusAverage = 0;
   let fahrenheitAverage = 0;

   for (let i = 0; i < celsiusTemperature.length; i++) {
      celsiusAverage += celsiusTemperature[i];
      fahrenheitAverage += fahrenheitTemperature[i];
   }

   celsiusAverage /= celsiusTemperature.length;
   fahrenheitAverage /= celsiusTemperature.length;

   fahrenheitAverage = Math.floor(fahrenheitAverage * 100 + 0.5) / 100;
   celsiusAverage = Math.floor(celsiusAverage * 100 + 0.5) / 100;

   results.value =
      results.value +
      "=====================================\r\n" +
      fahrenheitAverage.toFixed(2) +
      "    " +
      celsiusAverage.toFixed(2) +
      "\r\n";

   resetValue();

   celsiusTemperature = [];
   fahrenheitTemperature = [];

   document.getElementById("reset").style.visibility = "visible";
   reset.focus();
}

function isInputNumber() {
   let inputChar = event.key;
   let result = false;

   if (inputChar === "Backspace" && fahrenheit.value === "-") {
      fahrenheit.setAttribute("maxlength", "4");
      result = true;
   } else if (!fahrenheit.value && inputChar === "-") {
      fahrenheit.setAttribute("maxlength", "5");
      result = true;
   } else if (
      (inputChar >= "0" && inputChar <= "9") ||
      inputChar == "Backspace"
   ) {
      result = true;
   } else result = false;
   return result;
}
