
import * as Carousel from "./carousel.mjs";
import axios from 'axios'; // Import Axios

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
    // Fetch the list of cat breeds from the Cat API using Axios
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breedsData = response.data; // Extract the data from the response

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

    // Log the start of the request
    console.log('Request started...');

    // Fetch information on the selected breed from the Cat API using Axios
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=3`);

    // Log the end of the request
    console.log('Request ended.');

    // Extract the data from the response
    const breedInfo = response.data;

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

// Add Axios request interceptor
axios.interceptors.request.use(config => {
  // Log the start time of the request
  config.metadata = { startTime: new Date() };
  return config;
}, error => {
  return Promise.reject(error);
});

// Add Axios response interceptor
axios.interceptors.response.use(response => {
  // Calculate the time difference between request and response
  const endTime = new Date();
  const startTime = response.config.metadata.startTime;
  const timeDifference = endTime - startTime;
  console.log(`Time taken for request: ${timeDifference} ms`);
  return response;
}, error => {
  return Promise.reject(error);
});

// Define the progress bar div element
const progressBar1 = document.getElementById("progressBar");

// Request interceptor
axios.interceptors.request.use(config => {
    // Set the body element's cursor style to "progress"
    document.body.style.cursor = 'progress';
    // Reset the progress bar
    progressBar1.style.width = '0%';
    return config;
});

// Response interceptor
axios.interceptors.response.use(response => {
    // Set the body element's cursor style to "default"
    document.body.style.cursor = 'default';
    return response;
}, error => {
    // Set the body element's cursor style to "default" in case of error
    document.body.style.cursor = 'default';
    return Promise.reject(error);
});

// Define the updateProgress function
function updateProgress(progressEvent) {
    const progress = (progressEvent.loaded / progressEvent.total) * 100;
    progressBar1.style.width = `${progress}%`;
}

// Add the updateProgress function to the onDownloadProgress option
axios.get(url, {
    onDownloadProgress: updateProgress
})
.then(response => {
    // Handle response
})
.catch(error => {
    // Handle error
});


// Define the favourite function
export async function favourite(imgId) {
    try {
        // Check if the image is already favourited
        const response = await axios.get(`https://api.thecatapi.com/v1/favourites?image_id=${imgId}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        // If the image is already favourited, delete the favourite
        if (response.data.length > 0) {
            const favouriteId = response.data[0].id;
            await axios.delete(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, {
                headers: {
                    'x-api-key': API_KEY
                }
            });
            console.log(`Unfavourited image with ID: ${imgId}`);
        } else {
            // If the image is not favourited, favourite it
            await axios.post('https://api.thecatapi.com/v1/favourites', { image_id: imgId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                }
            });
            console.log(`Favourited image with ID: ${imgId}`);
        }
    } catch (error) {
        console.error('Error toggling favourite:', error);
    }
}