let totalCandles = 0;
let extinguishedCandles = 0;

function init() {
    var url = new URL(window.location.href);
    appendCandles(url.searchParams.get("candles"));
    appendName(url.searchParams.get("name"));
    appendMessages(url.searchParams.getAll("message"));
}

function appendMessages(messages) {
    if (!Array.isArray(messages) || messages.length == 0) return;
    let messageBox = document.getElementById("message_container");
    if (messageBox == null || messageBox == 'undefined') return;
    messageBox.innerHTML = `${messages.join("<br />")}`;
}

function appendName(message) {
    let messageBox = document.getElementById("message_container");
    if (messageBox == null) return;
    messageBox.innerHTML = `Happy Birthday ${message != null ? message : "Madona"}`;
}

function appendCandles(candlesCount) {
    if (candlesCount == null) candlesCount = 9;
    totalCandles = candlesCount;
    let candleHalfCount = 1;
    for (var i = 0; i < candlesCount; i++) {
        if ((i + 1) < (candlesCount / 2)) candleHalfCount++;
        else if ((i + 1) > (candlesCount / 2)) candleHalfCount--;
        let candleXPositionOffset = candleHalfCount * (20 / (candlesCount / 2));
        let candleXPosition = ((-310 + (600 / candlesCount) / 2) + ((600 / candlesCount) * i));
        let candleYPosition = -1 * Math.floor(Math.random() * ((325 + candleXPositionOffset) - (320 - candleXPositionOffset) + 1) + (320 - candleXPositionOffset));
        document.body.innerHTML += `<div id="candle_${i}" class="candle" style="margin-left:${candleXPosition}px; "></div>`;
        let candle = document.getElementById(`candle_${i}`);
        candle.setAttribute("onClick", `putOutCandle("candle_${i}");`);
        for (var j = 0; j < 5; j++) {
            candle.innerHTML += `<div class="flame"></div>`;
        }
    }
}

function putOutCandle(candle_name) {
    if (candle_name == null) return;
    let candle = document.getElementById(candle_name);
    for (var i = 0; i < 5; i++) {
        var flame = candle.querySelector(`.flame`);
        if (flame != null) {
            flame.remove();
        }
    }
    extinguishedCandles++;
    if (extinguishedCandles === totalCandles) {
        displaySophisticatedMessage();
    }
}

function displaySophisticatedMessage() {
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
	<div class="container">
	<div class="palette">
	  <div id="color1" class="color">
		<span>Happy Birthday !</span>
	  </div>
	  <div id="color2" class="color">
		<span>MADONA...</span>
	  </div>
	  <div id="color3" class="color">
		<span>GodBless you 🕉️☪️✝️</span>
	  </div>
	  <div id="color4" class="color">
		<span>All the Best 😊</span>
	  </div>
	  <div id="color-code">
		<div id="color-code-bg"></div>
		<div id="color-code-text"></div>
	  </div>
	</div>
  <div id="footer">
  <div id="bookmarks">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
	  <span>Live Long and stay strong...</span>
	  </div>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
	<circle cx="12" cy="12" r="1"></circle>
	<circle cx="19" cy="12" r="1"></circle>
	<circle cx="5" cy="12" r="1"></circle>
  </svg>
	</div>
  </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    let modal = document.querySelector(".modal");
    if (modal) {
        modal.parentNode.removeChild(modal);
    }
}
