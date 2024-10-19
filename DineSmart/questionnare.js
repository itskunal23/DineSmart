document.getElementById('restaurant-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    fetch('/get_restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, state })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (data.error) {
            resultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Distance (miles)</th>
                <th>Stars</th>
                <th>Timings</th>
                <th>Bar Included</th>
            </tr>
        `;

        data.forEach(restaurant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${restaurant.Name}</td>
                <td>${restaurant['Distance (miles)']}</td>
                <td>${restaurant.Stars}</td>
                <td>${restaurant.Timings}</td>
                <td>${restaurant['Bar Included']}</td>
            `;
            table.appendChild(row);
        });

        resultsDiv.appendChild(table);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
