from flask import Flask, request, jsonify
import os
import requests
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)



def get_api_key():
    """Fetch the Google API key from environment variables."""
    api_key = os.getenv('GOOGLE_API_KEY', 'AIzaSyC4DzQ-Pqsou_7GZfprZiw_-mJRpAi9akE') 
    return api_key


def get_location_coordinates(location, api_key):
    """Convert a city, state to coordinates (lat, lon) using Google Geocoding API."""
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

def fetch_restaurants(location, radius, search_type, api_key):
    """Fetch restaurants near a given location using Google Places API."""
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius={radius}&type={search_type}&key={api_key}"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    if data['status'] == 'OK':
        return data['results']
    else:
        raise ValueError(f"Failed to fetch data from the API. Error: {data.get('status')}")
def map_rating_to_stars(rating):
    if rating is None:
        return "N/A"  # Handle cases where rating is None
    if rating >= 4.5:
        return "★★★★★"  # 5 stars
    elif rating >= 4.0:
        return "★★★★☆"  # 4.5 stars
    elif rating >= 3.5:
        return "★★★★"  # 4 stars
    elif rating >= 3.0:
        return "★★★☆☆"  # 3.5 stars
    elif rating >= 2.5:
        return "★★★"  # 3 stars
    elif rating >= 2.0:
        return "★★☆☆☆"  # 2.5 stars
    elif rating >= 1.5:
        return "★★"  # 2 stars
    elif rating >= 1.0:
        return "★☆☆☆☆"  # 1.5 stars
    else:
        return "★"  # 1 star
@app.route('/get_restaurants', methods=['GET'])
def get_restaurants():
    city = request.args.get('city')
    state = request.args.get('state')
    cuisine = request.args.get('cuisine')

    # Ensure the required parameters are provided
    if not city or not state or not cuisine:
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        # Use your existing logic to fetch restaurant data
        location = f"{city}, {state}"
        api_key = 'YOUR_GOOGLE_API_KEY'  # Add your Google API key here or use an environment variable
        user_lat, user_lon = get_location_coordinates(location, api_key)
        
        # Fetch restaurants
        radius = 5000  # 5 km radius
        search_type = 'restaurant'
        restaurants = fetch_restaurants(f"{user_lat},{user_lon}", radius, search_type, api_key)

        # Format the response for the frontend
        restaurant_data = []
        for restaurant in restaurants:
            restaurant_data.append({
                'name': restaurant.get('name', 'N/A'),
                'distance': haversine_distance(user_lat, user_lon, restaurant['geometry']['location']['lat'], restaurant['geometry']['location']['lng']),
                'price': restaurant.get('price_level', 'N/A'),
                'stars': map_rating_to_stars(restaurant.get('rating', 'N/A')),
                'rating': restaurant.get('rating', 'N/A')
            })

        return jsonify(restaurant_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
