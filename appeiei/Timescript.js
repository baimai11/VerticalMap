// Polynomial regression coefficients
const intercept = 4.25931842;
const coef = [0.0, 17.34630854, 0.56337349];

// Function to predict the time based on number of floors using the polynomial model
function predictTime(floors) {
  // Convert floors to a number if it's a string
  const x = parseFloat(floors);

  // Apply the polynomial regression model
  const predictedTime = intercept + coef[1] * x + coef[2] * Math.pow(x, 2);

  // Return the predicted time in seconds
  return predictedTime;
}

// Function to format time from seconds to hh:mm:ss
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
}

// Function to get the current time in seconds from the start of the day
function getCurrentTimeInSeconds() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Convert current time to total seconds since the start of the day
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to calculate the arrival time
function calculateArrivalTime(totalTimeInSeconds) {
  const currentTimeInSeconds = getCurrentTimeInSeconds();
  const arrivalTimeInSeconds = currentTimeInSeconds + totalTimeInSeconds;

  // Format the arrival time to hh:mm:ss
  return formatTime(arrivalTimeInSeconds % 86400); // % 86400 ensures time wraps at 24 hours
}

// Event listener to update the prediction when the number of floors is selected
document.getElementById("floors").addEventListener("change", function () {
  const floors = this.value;
  if (floors) {
    const totalTimeInSeconds = predictTime(floors);
    const formattedTotalTime = formatTime(totalTimeInSeconds);
    const arrivalTime = calculateArrivalTime(totalTimeInSeconds);

    // Update the HTML content to display the predicted total time and time to arrive
    document.querySelector(
      ".walk-box:nth-child(1) .time-info p:nth-child(1) span"
    ).innerText = formattedTotalTime;
    document.querySelector(
      ".walk-box:nth-child(1) .time-info p:nth-child(2) span"
    ).innerText = arrivalTime;
  } else {
    document.querySelector(
      ".walk-box:nth-child(1) .time-info p:nth-child(1) span"
    ).innerText = "00:00:00";
    document.querySelector(
      ".walk-box:nth-child(1) .time-info p:nth-child(2) span"
    ).innerText = "00:00:00";
  }
});
