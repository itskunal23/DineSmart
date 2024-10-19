from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS import
import requests
import pandas as pd
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set your Google Maps API key here
API_KEY = 'AIzaSyC4DzQ-Pqsou_7GZfprZiw_-mJRpAi9akE'

def get_location_coordinates(location, api_key):
    """Converts a city, state to coordinates (lat, lon) using Google Geocoding API."""
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={api_key}"
    response = requests.get(geocode_url)
    data = response.json()

    if data['status'] == 'OK':
        lat_lng = data['results'][0]['geometry']['location']
        return lat_lng['lat'], lat_lng['lng']
    else:
        raise ValueError(f"Failed to get coordinates for {location}. Error: {data.get('status')}")

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate the great-circle distance between two points using the Haversine formula."""
    R = 6371  # Earth radius in kilometers
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c  # Distance in kilometers

def fetch_restaurants(location, radius, search_type, cuisine, api_key):
    """Fetches restaurants near a given location using Google Places API with cuisine filtering."""
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type={search_type}&keyword={cuisine}&key={api_key}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    if data['status'] == 'OK':
        return data['results']
    else:
        raise ValueError(f"Failed to fetch data from the API. Error: {data.get('status')}")

def fetch_restaurant_details(place_id, api_key):
    """Fetches detailed information about a restaurant using its Place ID."""
    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key}"
    response = requests.get(details_url)
    response.raise_for_status()
    data = response.json()

    if data['status'] == 'OK':
        return data['result']
    else:
        raise ValueError(f"Failed to fetch restaurant details. Error: {data.get('status')}")

def map_rating_to_stars(rating):
    """Map Google Places rating (0-5) to a star rating (out of 5)."""
    if rating == 'N/A':
        return 'No Stars'
    elif float(rating) >= 4.5:
        return '★★★★★'
    elif float(rating) >= 4.0:
        return '★★★★'
    elif float(rating) >= 3.5:
        return '★★★'
    elif float(rating) >= 3.0:
        return '★★'
    else:
        return '★'

def map_price_level_to_dollar_signs(price_level):
    """Map price level to dollar signs."""
    price_map = {1: "$", 2: "$$", 3: "$$$", 4: "$$$$"}
    return price_map.get(price_level, "Free/No Info")

@app.route('/get_restaurants', methods=['POST'])
def get_restaurants():
    try:
        data = request.json
        location = f"{data['city']}, {data['state']}"
        cuisine = data['cuisine']

        # Get latitude and longitude for the city, state
        user_lat, user_lon = get_location_coordinates(location, API_KEY)

        # Define search parameters
        radius = 5000  # 5 km radius
        search_type = 'restaurant'

        # Fetch restaurants near the location that match the chosen cuisine
        restaurants = fetch_restaurants(f"{user_lat},{user_lon}", radius, search_type, cuisine, API_KEY)

        restaurant_list = []
        for restaurant in restaurants:
            name = restaurant.get('name', 'N/A')
            rating = restaurant.get('rating', 'N/A')
            place_id = restaurant.get('place_id')

            # Fetch detailed restaurant info
            details = fetch_restaurant_details(place_id, API_KEY)

            # Restaurant's location (for distance calculation)
            restaurant_lat = restaurant['geometry']['location']['lat']
            restaurant_lon = restaurant['geometry']['location']['lng']

            # Calculate distance from user location to the restaurant
            distance = haversine_distance(user_lat, user_lon, restaurant_lat, restaurant_lon)

            # Map rating to stars
            stars = map_rating_to_stars(rating)

            # Get price level
            price_level = details.get('price_level', 'N/A')
            price = map_price_level_to_dollar_signs(price_level)

            # Append details to the list
            restaurant_list.append({
                'name': name,
                'distance': f"{distance * 0.621371:.2f}",  # Convert km to miles
                'price': price,
                'stars': stars,
                'rating': rating
            })

        return jsonify(restaurant_list)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)