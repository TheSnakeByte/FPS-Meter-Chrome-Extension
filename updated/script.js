// This script is linked to [root]updated/updated.html

// Inserts version after fetching it from manifest.json
fetch('/manifest.json')
  .then(response => response.text())
  .then((data) => {
    var content = JSON.parse(data)
    document.getElementById("version").innerHTML = content.version;
  })