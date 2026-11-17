# DineSmart

Enhance Marriott's guest experience by offering curated nearby restaurant recommendations using Hilton's location-based API data. By leveraging this API, Marriott can provide relevant dining suggestions, creating an enhanced guest experience and increasing satisfaction without compromising loyalty to Marriott's brand.

## Problem
Hotel guests often struggle to find quality dining options near their hotel. Concierge recommendations are limited and may not match guest preferences. Marriott wanted to enhance guest experience by providing personalized, data-driven restaurant recommendations without building their own location database.

## Solution
DineSmart integrates Hilton's location-based API to fetch nearby restaurants, filters and ranks them by relevance (cuisine, distance, ratings, price), and presents curated recommendations through a clean interface. Guests get personalized dining options; Marriott enhances experience without compromising brand loyalty.

## Tech Stack
- **Language**: JavaScript (ES6+)
- **API Integration**: Hilton Location-Based API (REST)
- **Data Processing**: Client-side filtering, sorting, ranking algorithms
- **UI**: Vanilla JS + CSS (lightweight, no framework)
- **Deployment**: Static hosting (GitHub Pages / Netlify / Vercel)

## Demo
*Demo environment requires Hilton API credentials. Contact for access.*

## Installation
```bash
git clone https://github.com/itskunal23/DineSmart.git
cd DineSmart
# Open index.html in browser or serve locally
npx serve .
# or
python3 -m http.server 8000
```

## Usage
```bash
# Configure API credentials
cp config.example.js config.js
# Edit config.js with your Hilton API key

# Serve locally
npx serve .
# Visit http://localhost:3000
```

## Architecture
```
├── index.html          # Main entry point
├── css/
│   └── styles.css      # Responsive styling
├── js/
│   ├── api.js          # Hilton API client
│   ├── filters.js      # Cuisine, distance, rating filters
│   ├── ranking.js      # Recommendation scoring algorithm
│   ├── ui.js           # DOM rendering, user interactions
│   └── main.js         # App initialization
├── config.example.js   # Template for API credentials
└── assets/             # Images, icons
```

## API Integration
- **Endpoint**: `https://api.hilton.com/v1/locations/nearby`
- **Auth**: API Key (header: `X-API-Key`)
- **Params**: `lat`, `lng`, `radius`, `categories`
- **Response**: Restaurant objects with name, address, cuisine, rating, price level, distance

## Ranking Algorithm
```
score = (rating_weight * normalized_rating) 
      + (distance_weight * inverse_distance) 
      + (popularity_weight * review_count)
      + (cuisine_match_weight * cuisine_preference)
```

## Contributing
PRs welcome for algorithm improvements, UI enhancements, or additional data sources. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
MIT © Kunal Goenka