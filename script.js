document.getElementById("locationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const lat = document.getElementById("lat").value;
  const lng = document.getElementById("lng").value;

  fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}`, {
    headers: {
      "x-ebirdapitoken": "ifru9hfj5p8m"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Recent Observations:</h2>";
    if (data.length === 0) {
      resultsDiv.innerHTML += "<p>No recent observations found.</p>";
      return;
    }
    const ul = document.createElement("ul");
    data.forEach(obs => {
      const li = document.createElement("li");
      li.textContent = `${obs.comName} at ${obs.locName} on ${obs.obsDt}`;
      ul.appendChild(li);
    });
    resultsDiv.appendChild(ul);
  })
  .catch(error => {
    document.getElementById("results").innerHTML = `<p>Error: ${error.message}</p>`;
  });
});