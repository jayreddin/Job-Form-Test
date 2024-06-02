function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(reverseGeocode, showError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function reverseGeocode(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var apiKey = 'adUFrPp0c9lPyLKnsdzAnO8kjOs-vxEfCSFhoOuOopg'; // Replace with your actual API key
  var url = `https://geocode.search.hereapi.com/v1/reverse?at=${lat},${lon}&apiKey=${apiKey}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.items && data.items.length > 0) {
              var address = data.items[0].title; // The format of the address
              document.getElementById('address').value = address;
          } else {
              alert('Address not found');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Error retrieving address. Please enter it manually.');
      });
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}
