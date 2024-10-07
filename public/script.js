document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const dropdowns = document.querySelectorAll(".dropdown");
  var select = document.getElementById("floors");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      // Animate menu items
      menu.querySelectorAll("li").forEach((item, index) => {
        setTimeout(() => {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 0);
      });
    } else {
      menu.querySelectorAll("li").forEach((item) => {
        item.style.transitionDelay = "0s";
        item.style.opacity = "0";
        item.style.transform = "translateY(-10px)";
      });
    }
  });

  dropdowns.forEach((dropdown) => {
    const dropbtn = dropdown.querySelector(".dropbtn");
    dropbtn.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    });
  });

  for (var i = 1; i <= 85; i++) {
    // Create a new option element
    var option = document.createElement("option");
  
    // Set the value and text of the option
    option.value = i;
    option.text = i;
  
    // Add the option to the select element
    select.appendChild(option);
  }

  // Current time functionality
  function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;

    const currentTimeElement = document.getElementById("current-time");
    if (currentTimeElement) {
      currentTimeElement.textContent = timeString;
    }
  }

  // Update time immediately and then every second
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});
