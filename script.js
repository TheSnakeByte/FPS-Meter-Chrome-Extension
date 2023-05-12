// Browser detect, using https://github.com/lancedikson/bowser
var result = bowser.getParser(navigator.userAgent).getResult();
if (!(result.browser.name == "Chrome")) {
  alert('ERROR: You have installed a version of this extension only compatible with Chrome.\n\nVisit the installation page of this extension to get the right version for your browser.\n\nThis extension will now uninstall.');
  chrome.management.uninstallSelf()
}

// Insert version
fetch('/manifest.json')
  .then(response => response.text())
  .then((data) => {
    var content = JSON.parse(data)
    document.getElementById("version").innerHTML = "v" + content.version + " |";
  });

// Footer event listener
document.getElementById("footerTextUpdate").addEventListener("click", versionClick)

function versionClick() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options/options.html'));
  }
}

// Refreshing loop
const times = [];
let fps;

function refreshLoop() {
  window.requestAnimationFrame(() => {
    // FPS number update
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    if (fps <= 10) {
      // For FPS between 0 and 10
      document.getElementById('count').style.color = '#ff0000';
    } else if (fps <= 30 && fps > 10) {
      // For FPS between 11 and 30
      document.getElementById('count').style.color = '#FFA500';
    } else {
      // For FPS 31 or above
      if (document.getElementById("toggleSwitch").checked == true) {
        // If dark mode is on
        document.getElementById('count').style.color = '#00ff00';
      } else {
        // If light mode is on
        document.getElementById('count').style.color = '#00c800';
      }
    }
    document.getElementById("count").innerHTML = fps;

    // Dark/Light mode toggle update
    var mode = document.getElementById("toggleSwitch").checked
    if (mode == true) {
      document.body.style.background = "#000000";
      var list = document.getElementsByTagName('h4');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#ffffff";
      }
      var list = document.getElementsByTagName('h1');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#6600ff";
      }
      var list = document.getElementsByTagName('h5');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#ffffff";
      }
      var list = document.getElementsByTagName('h6');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#ffffff";
      }
    } else if (mode == false) {
      document.body.style.background = "#e6e6e6";
      var list = document.getElementsByTagName('h4');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#000000";
      }
      var list = document.getElementsByTagName('h1');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#ff8300";
      }
      var list = document.getElementsByTagName('h5');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#000000";
      }
      var list = document.getElementsByTagName('h6');
      for (var i = 0; i < list.length; i++) {
        list[i].style.color = "#000000";
      }
    }
    refreshLoop();
  });
}

refreshLoop()