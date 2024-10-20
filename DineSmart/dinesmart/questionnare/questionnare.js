document.getElementById('restaurant-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const cuisine = document.getElementById('cuisine').value;
    console.log("Form data:", { city, state, cuisine });

    // Show a loading message while fetching data
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.style.display = 'block';

    // Construct the query string for a GET request
    const query = `city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&cuisine=${encodeURIComponent(cuisine)}`;
    console.log("Query string:", query);

    fetch(`/get_restaurants?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingMessage.style.display = 'none';  // Hide loading message
            console.log("Received data:", data);
            displayRestaurants(data);  // Check if 'data' is not empty
        })
        .catch(error => {
            loadingMessage.style.display = 'none';  // Hide loading message
            console.error('Error:', error);
            alert('An error occurred while fetching the restaurant data. Please try again later.');
        });
});


function displayRestaurants(data) {
    console.log("Displaying restaurants:", data);

    if (data.error) {
        alert(data.error); // Display any error returned from the server
        return;
    }

    const table = document.getElementById('restaurant-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        // Display message in the table if no restaurants are found
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No restaurants found for the selected cuisine and location.</td>`;
        tbody.appendChild(row);
        table.style.display = 'table';
        return;
    }

    data.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${restaurant.name}</td>
            <td>${restaurant.distance}</td>
            <td>${restaurant.price}</td>
            <td>${restaurant.stars}</td>
            <td>${restaurant.rating}</td>
        `;
        tbody.appendChild(row);
    });

    table.style.display = 'table';
}

