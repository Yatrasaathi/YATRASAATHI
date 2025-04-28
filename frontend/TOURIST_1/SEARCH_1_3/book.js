// This function runs after the page loads
window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    if (city) {
        const cityInput = document.getElementById("city");
        const durationInput = document.getElementById("duration");

        const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        cityInput.value = formattedCity;

        const durations = {
            bhubaneswar: "6hr 30min",
            cuttack: "4hr 30min",
            puri: "8hr"
        };
        durationInput.value = durations[city.toLowerCase()] || "";

        try {
            const res = await fetch(`http://localhost:7000/api/guides?city=${city}`);
            const guides = await res.json();
            renderGuides(guides);
        } catch (err) {
            console.error("Failed to load guides:", err);
        }
    }
});

// Render the guide cards dynamically
function renderGuides(guides) {
    const container = document.querySelector(".guides-container");
    container.innerHTML = "";
    guides.forEach(guide => {
        const guideCard = document.createElement("div");
        guideCard.classList.add("guide-card");
        guideCard.innerHTML = `
            <img src="${guide.image || '/default.jpg'}" alt="${guide.name}">
            <div class="guide-info">
                <h3 class="guide-name">${guide.name}</h3>
                <p class="guide-location">${guide.city}, Odisha</p>
                <div class="guide-rating" data-rating="4">
                    <span class="stars">★ ★ ★ ★ ☆</span>
                    <span class="rating-value">${guide.rating}</span>
                </div>
                <div class="guide-extra">
                    <p><strong>Languages:</strong> ${guide.languages}</p>
                </div>
                <div class="guide-actions">
                    <span class="charges">₹${guide.charge}/day</span>
                    <button class="add-btn" onclick="selectGuide('${guide._id}', '${guide.name}', ${guide.charge})">Add</button>
                </div>
            </div>`;
        container.appendChild(guideCard);
    });
}

// When a guide is selected
function selectGuide(id, name, charge) {
    document.getElementById('selectedguide').value = name;
    document.getElementById('guideCharges').value = charge;
    console.log(`Guide selected: ${name}, ₹${charge}`);
}

// Submit the trip data to the backend
async function submitTrip() {
    let userId = localStorage.getItem('userId');

    if (!userId) {
        alert("User not logged in. Please login first.");
        return;
    }
    
    const city = document.getElementById("city").value;
    const guide = document.getElementById('selectedguide').value;
    const guideCharges = document.getElementById('guideCharges').value;
    const tripdate = document.getElementById('tripdate').value;
    const duration = document.getElementById('duration').value;
    const starttime = document.getElementById('starttime').value;
    const members = document.getElementById('members').value;

   
    console.log("DEBUG: Trip Data");
    console.log("userId:", userId);
    console.log("guide:", guide);
    console.log("city:", city);
    console.log("guideCharges:", guideCharges);
    console.log("tripdate:", tripdate);
    console.log("duration:", duration);
    console.log("starttime:", starttime);
    console.log("members:", members);


    if (!userId || !guide || !tripdate || !duration || !starttime || !members) {
        alert("Please fill all required fields and select a guide.");
        return;
    }

    const tripData = {
        userId,
        guide,
        guideCharges,
        tripdate,
        duration,
        starttime,
        members
    };

    try {
        const res = await fetch('http://localhost:7000/api/TripDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tripData)
        });

        const result = await res.json();
        if (res.ok) {
            alert('Trip booked successfully!');
            // Add this block to build the query string properly
            //console.log("City:", city);
            //console.log("Query Params:", queryParams);

            const city = document.getElementById('city').value; // assuming city input is present
        //     const queryParams = new URLSearchParams({
        //     city,
        //     guide,
        //     guideCharges,
        //     tripdate,
        //     duration,
        //     starttime,
        //     members
        //  }).toString();
         
         console.log("Redirecting to summary page with query params:");
         //console.log(queryParams);
         const queryParams = `city=${city}&members=${members}&tripdate=${tripdate}&guide=${guide}&guideCharges=${guideCharges}&starttime=${starttime}&duration=${duration}`;
        window.location.href = `http://localhost:7000/TOURIST_1/SEARCH_1_3/trip_summ.html?${queryParams}`;
        
        //console.log("Redirecting to:", url);
        } else {
            alert('Failed: ' + result.message);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong');
    }
}
