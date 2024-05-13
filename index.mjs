import * as Carousel from "./carousel.mjs";

// Define the breed selection input element
const breedSelect = document.getElementById("breedSelect");
// Define the information section div element
const infoDump = document.getElementById("infoDump");
// Define the progress bar div element
const progressBar = document.getElementById("progressBar");
// Define the get favourites button element
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_2PAq2jLoyecvPV9Y6guLVG2RpY7Z4FCEU7Wzl2XLedWtFCgXfKgAvOBr5GslAIPi";

// Define the initialLoad function
async function initialLoad() {
try {
// Fetch the list of cat breeds from the Cat API
const response = await fetch('https://api.thecatapi.com/v1/breeds');
const breedsData = await response.json(); // Convert the response to JSON format

// Iterate over the list of breeds and create options for each breed
breedsData.forEach(breed => {
const option = document.createElement('option');
option.value = breed.id; // Set the value attribute to the breed ID
option.textContent = breed.name; // Set the text content to the breed name
breedSelect.appendChild(option); // Append the option to the breed selection dropdown
});
} catch (error) {
console.error('Error loading breeds:', error);
}
}

// Call the initialLoad function immediately when the page loads
initialLoad();
console.log("Script loaded")

// Add an event listener to breedSelect
breedSelect.addEventListener('change', async () => {
  try {
    // Clear the carousel
    Carousel.clear();

    // Retrieve the selected breed ID
    const selectedBreedId = breedSelect.value;

    // Fetch information on the selected breed from the Cat API
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=3`);

    // Convert the response to JSON format
    const breedInfo = await response.json();

    // Iterate over the breedInfo array and create carousel elements
    breedInfo.forEach(cat => {
      // Create a new carousel item
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      carouselItem.innerHTML = `
        <div class="card">
            <div class="img-wrapper">
                <img src="${cat.url}" class="d-block w-100" alt="Cat Image"/>
                <div data-img-id="${cat.id}" class="favourite-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
                </div>
            </div>
            <div class="breed-info">
                <h2>Breed ID: ${cat.id}</h2>
                <p><strong>URL:</strong> <a href="${cat.url}" target="_blank">${cat.url}</a></p>
                <p><strong>Width:</strong> ${cat.width}</p>
                <p><strong>Height:</strong> ${cat.height}</p>
            </div>
        </div>
      `;

      // Append the new carousel item to the carousel
      document.getElementById('carouselInner').appendChild(carouselItem);
    });
  } catch (error) {
    console.error('Error retrieving breed information:', error);
  }
});


/**
* 1. Create an async function "initialLoad" that does the following:
* - Retrieve a list of breeds from the cat API using fetch().
* - Create new <options> for each of these breeds, and append them to breedSelect.
* - Each option should have a value attribute equal to the id of the breed.
* - Each option should display text equal to the name of the breed.
* This function should execute immediately.
*/
/**
* 2. Create an event handler for breedSelect that does the following:
* - Retrieve information on the selected breed from the cat API using fetch().
* - Make sure your request is receiving multiple array items!
* - Check the API documentation if you're only getting a single object.
* - For each object in the response array, create a new element for the carousel.
* - Append each of these new elements to the carousel.
* - Use the other data you have been given to create an informational section within the infoDump element.
* - Be creative with how you create DOM elements and HTML.
* - Feel free to edit index.html and styles.css to suit your needs, but be careful!
* - Remember that functionality comes first, but user experience and design are important.
* - Each new selection should clear, re-populate, and restart the Carousel.
* - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
*/
/**
* 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
*/
/**
* 4. Change all of your fetch() functions to axios!
* - axios has already been imported for you within index.js.
* - If you've done everything correctly up to this point, this should be simple.
* - If it is not simple, take a moment to re-evaluate your original code.
* - Hint: Axios has the ability to set default headers. Use this to your advantage
* by setting a default header with your API key so that you do not have to
* send it manually with all of your requests! You can also set a default base URL!
*/
/**
* 5. Add axios interceptors to log the time between request and response to the console.
* - Hint: you already have access to code that does this!
* - Add a console.log statement to indicate when requests begin.
* - As an added challenge, try to do this on your own without referencing the lesson material.
*/
/**
* 6. Next, we'll create a progress bar to indicate the request is in progress.
* - The progressBar element has already been created for you.
* - You need only to modify its "width" style property to align with the request progress.
* - In your request interceptor, set the width of the progressBar element to 0%.
* - This is to reset the progress with each request.
* - Research the axios onDownloadProgress config option.
* - Create a function "updateProgress" that receives a ProgressEvent object.
* - Pass this function to the axios onDownloadProgress config option in your event handler.
* - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
* - Update the progress of the request using the properties you are given.
* - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
* once or twice per request to this API. This is still a concept worth familiarizing yourself
* with for future projects.
*/
/**
* 7. As a final element of progress indication, add the following to your axios interceptors:
* - In your request interceptor, set the body element's cursor style to "progress."
* - In your response interceptor, remove the progress cursor style from the body element.
*/
/**
* 8. To practice posting data, we'll create a system to "favourite" certain images.
* - The skeleton of this function has already been created for you.
* - This function is used within Carousel.js to add the event listener as items are created.
* - This is why we use the export keyword for this function.
* - Post to the cat API's favourites endpoint with the given ID.
* - The API documentation gives examples of this functionality using fetch(); use Axios!
* - Add additional logic to this function such that if the image is already favourited,
* you delete that favourite using the API, giving this function "toggle" functionality.
* - You can call this function by clicking on the heart at the top right of any image.
*/
export async function favourite(imgId) {
// your code here
}
/**
* 9. Test your favourite() function by creating a getFavourites() function.
* - Use Axios to get all of your favourites from the cat API.
* - Clear the carousel and display your favourites when the button is clicked.
* - You will have to bind this event listener to getFavouritesBtn yourself.
* - Hint: you already have all of the logic built for building a carousel.
* If that isn't in its own function, maybe it should be so you don't have to
* repeat yourself in this section.
*/
/**
* 10. Test your site, thoroughly!
* - What happens when you try to load the Malayan breed?
* - If this is working, good job! If not, look for the reason why and fix it!
* - Test other breeds as well. Not every breed has the same data available, so
* your code should account for this.
*/