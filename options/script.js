// This script is linked to [root]updated/updated.html

// Inserts version after fetching it from manifest.json
fetch('/manifest.json')
  .then(response => response.text())
  .then((data) => {
    var content = JSON.parse(data)
    document.getElementById("version").innerHTML = "The current installed version of this extension is " + "<b><u>v" + content.version + "</u></b>";
  })

document.getElementById("buttonUpdateCheck").addEventListener("click", buttonClick)

function buttonClick() {
  document.getElementById("text").remove();
  document.getElementById("buttonUpdateCheck").remove();

  document.getElementById("result").style.color = "#FFA500";
  document.getElementById("result").innerHTML = "Connecting to server, please wait...";

  fetch("https://fps-meter-extension.snakebyte.repl.co/version.json")
    .then(response => response.text())
    .then((data) => {
      var content = JSON.parse(data)
      var latestVersion = content.version
      
      fetch('/manifest.json')
        .then(response => response.text())
        .then((data) => {
          var content = JSON.parse(data)
          var currentVersion = content.version

          if (currentVersion == latestVersion) {
            document.getElementById("result").style.color = "#00ff00";
            document.getElementById("result").innerHTML = "✓ Running latest version!";
          } else {
            document.getElementById("version").remove();

            document.getElementById("result").style.color = "#FFA500";
            document.getElementById("result").innerHTML = "🛈 Update to version " + latestVersion + " available...";

            let button = document.createElement('button');
            button.innerHTML = "Click to update";
            button.id = "buttonUpdate";
            document.body.appendChild(button);
            document.getElementById("buttonUpdate").addEventListener("click", buttonUpdateClick)
            function buttonUpdateClick() {
              window.open("https://fps-meter-extension.snakebyte.repl.co/update.html")
            }
          }
        })
    })
}