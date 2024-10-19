import React, { useState } from 'react';

const Survey = () => {
    const [location, setLocation] = useState('');
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [formData, setFormData] = useState({
        preferredCuisine: '',
        diningBudget: '',
        favoriteMealType: '',
        preferredAtmosphere: '',
        outdoorSeating: '',
        dietaryRestrictions: '',
        localCuisineImportance: '',
        diningExperience: '',
        restaurantWithView: '',
        travelDistance: ''
    });

    // Function to handle form inputs dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to capture user geolocation
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        // Add API call to fetch restaurants based on geolocation
    };

    // Function to handle form submission
    const handleSurveySubmit = (event) => {
        event.preventDefault();
        setShowRecommendations(true);

        // After collecting the form data, use it to recommend restaurants
        console.log('Form Data:', formData);

        // Example: You can make API calls based on formData here
    };

    return (
        <>
            <nav className="navbar navbar-expand bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Dine Smart</a>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="text-center text-white masthead" style={{ background: `url('assets/img/bg-masthead.jpg') no-repeat center center`, backgroundSize: 'cover' }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto position-relative">
                            <h1 className="mb-5">&lt;Dine Smarter/&gt;</h1>
                        </div>
                        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
                            <form id="locationForm">
                                <div className="row">
                                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                                        <input
                                            className="form-control form-control-lg"
                                            id="locationInput"
                                            type="text"
                                            placeholder="Enter your location..."
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <button className="btn btn-primary btn-lg" type="button" onClick={getLocation}>Use My Location</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <section className="text-center bg-light mt-5">
                <div className="container">
                    <h2 className="mb-5">Tell us about your dining preferences!</h2>
                    <form id="surveyForm" onSubmit={handleSurveySubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question1" className="form-label">1. Preferred Cuisine</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question1"
                                    name="preferredCuisine"
                                    value={formData.preferredCuisine}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Italian, Chinese, etc."
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question2" className="form-label">2. Dining Budget</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question2"
                                    name="diningBudget"
                                    value={formData.diningBudget}
                                    onChange={handleInputChange}
                                    placeholder="e.g., $$, $$$"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question3" className="form-label">3. Favorite Meal Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question3"
                                    name="favoriteMealType"
                                    value={formData.favoriteMealType}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Breakfast, Lunch, Dinner"
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question4" className="form-label">4. Preferred Atmosphere</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question4"
                                    name="preferredAtmosphere"
                                    value={formData.preferredAtmosphere}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Casual, Fine Dining"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question5" className="form-label">5. Interested in Outdoor Seating?</label>
                                <select
                                    className="form-select"
                                    id="question5"
                                    name="outdoorSeating"
                                    value={formData.outdoorSeating}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question6" className="form-label">6. Do you have dietary restrictions?</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question6"
                                    name="dietaryRestrictions"
                                    value={formData.dietaryRestrictions}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Vegan, Gluten-Free"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question7" className="form-label">7. How important is local cuisine?</label>
                                <select
                                    className="form-select"
                                    id="question7"
                                    name="localCuisineImportance"
                                    value={formData.localCuisineImportance}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="Very Important">Very Important</option>
                                    <option value="Somewhat Important">Somewhat Important</option>
                                    <option value="Not Important">Not Important</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question8" className="form-label">8. What type of dining experience do you prefer?</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question8"
                                    name="diningExperience"
                                    value={formData.diningExperience}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Family-style, Solo Dining"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question9" className="form-label">9. Do you prefer restaurants with a view?</label>
                                <select
                                    className="form-select"
                                    id="question9"
                                    name="restaurantWithView"
                                    value={formData.restaurantWithView}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="question10" className="form-label">10. How far are you willing to travel for food?</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question10"
                                    name="travelDistance"
                                    value={formData.travelDistance}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5 miles, 10 miles"
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            </section>

            {showRecommendations && (
                <section className="bg-light text-center">
                    <div className="container">
                        <h2 className="mb-5">Your Personalized Restaurant Recommendations</h2>
                        {/* Display the recommended restaurants here */}
                    </div>
                </section>
            )}
        </>
    );
}

export default Survey;
