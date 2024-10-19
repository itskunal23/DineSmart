document.getElementById('restaurant-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form submission and page reload
    
    // Get the input values
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const cuisine = document.getElementById('cuisine').value;
    
    try {
        // Send POST request to the Flask API
        const response = await fetch('/get_restaurants', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city, state, cuisine })
        });

        // Parse the response data
        const data = await response.json();
        
        // Get the table elements
        const table = document.getElementById('restaurant-table');
        const tbody = table.querySelector('tbody');
        
        // Clear the table body before populating it
        tbody.innerHTML = '';

        // Check if data is received and not empty
        if (data.length > 0) {
            // Loop over each restaurant and create table rows
            data.forEach(restaurant => {
                const row = document.createElement('tr');
                
                // Create table cells for each piece of data
                const nameCell = document.createElement('td');
                nameCell.textContent = restaurant.name;

                const distanceCell = document.createElement('td');
                distanceCell.textContent = restaurant.distance;

                const priceCell = document.createElement('td');
                priceCell.textContent = restaurant.price;

                const starsCell = document.createElement('td');
                starsCell.textContent = restaurant.stars;

                const ratingCell = document.createElement('td');
                ratingCell.textContent = restaurant.rating;

                // Append cells to the row
                row.appendChild(nameCell);
                row.appendChild(distanceCell);
                row.appendChild(priceCell);
                row.appendChild(starsCell);
                row.appendChild(ratingCell);

                // Append the row to the table body
                tbody.appendChild(row);
            });

            // Make the table visible
            table.style.display = 'table';
        } else {
            // If no data, hide the table and show a message
            table.style.display = 'none';
            alert('No restaurants found for the given location and cuisine.');
        }
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching restaurant data:', error);
        alert('There was an error fetching restaurant data. Please try again.');
    }
});
