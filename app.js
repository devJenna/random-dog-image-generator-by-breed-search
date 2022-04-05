const generateButton = document.querySelector(".generate-button");
const imageContainer = document.querySelector(".image-container");
const breedInput = document.querySelector(".breed-input");
const errorContainer = document.querySelector(".error-container");
const imageNumber = document.querySelector(".image-number");

generateButton.addEventListener("click", fetchImages);

// make enter key to generate the images
breedInput.addEventListener("keydown", enterKey);
imageNumber.addEventListener("keydown", enterKey);

function enterKey(e) {
    if (e.key == "-") {
        e.preventDefault();
        return false;
    }
    if (e.keyCode === 13) {
        // if (e.keyCode === 13 && imageNumber.value > 0) {
        e.preventDefault();
        fetchImages();
    }
}

// fetch images
function fetchImages() {
    // if (imageNumber.value != 0) {

    // get the number of images
    let imageNum = imageNumber.value;
    // get the dogBreed value and make it lowercase
    let dogBreed = (breedInput.value).toLowerCase();
    console.log(dogBreed);
    // empty the error message for new entry
    errorContainer.innerHTML = "";
    // fetch("https://dog.ceo/api/breed/hound/images/random") // original url
    // fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`) // based on dogBreed
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/${imageNum}`) // based on dogBreed and the number of images from input
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            displayImages(data);
        })
        .catch(function (error) {
            console.log(error);
        })
    // imageContainer.innerHTML = "Loading...";
    // document.querySelectorAll(".generated").innerHTML = "Loading...";

    // }
}
// fetchImages();

// display images
function displayImages(data) {
    imageContainer.innerHTML = "";
    // if the entered breed type doesn't exist in api, populate the error message and display the default dog icon
    if (data.status === "error") {
        // imageContainer.innerHTML = `<div>${data.message}</div>`; // original message
        // console.log(data.message);
        let dogBreed = breedInput.value;

        errorContainer.innerHTML = `<div class="not-found-message"><span class="dog-breed">${dogBreed}</span> is not found. <br>Please enter a different breed!</div>`;

        imageContainer.innerHTML = `<img class="default-image" src="./src/dog-face-android8.0.png" alt="Dog Icon"></img>`;

        // if the entered number is 0, populate the error message as well
        if (imageNumber.value == 0) {
            // return false;
            imageContainer.innerHTML = `<img class="default-image" src="./src/dog-face-android8.0.png" alt="Dog Icon"></img>`;
            errorContainer.innerHTML = `<div class="not-found-message"><span class="dog-breed">${dogBreed}</span> is not found. <br>Please enter a different breed!</div><div class="error-message-number">Please enter a number greater than 0!</div>`;
        }

    } else { // if the breed type from api is entered
        // console.log(data.message);
        // console.log(imageNumber.value);
        let image = data.message;

        // // create div for image or
        // let imageDiv = document.createElement("div");
        // imageDiv.innerHTML = `<img src="${image}"></img>`;
        // imageContainer.append(imageDiv);

        // // put it directly to container
        // imageContainer.innerHTML = `<img src="${image}" class="generated"></img>`;

        // if entered number is 0, populate the error message
        if (imageNumber.value == 0) {
            // return false;
            imageContainer.innerHTML = `<img class="default-image" src="./src/dog-face-android8.0.png" alt="Dog Icon"></img>`;
            errorContainer.innerHTML = `<div class="error-message-number">Please enter a number greater than 0!</div>`;

        } else { // if entered number is greater than 0, populate the number of images

            for (let i = 0; i < image.length; i++) {
                console.log(image);
                // const imageElement = document.createElement("img");
                // const images = document.querySelectorAll("img");
                // imageElement[i].src = image[i];
                // imageContainer.append(images);
                imageContainer.innerHTML += `<img src="${image[i]}" class="generated"></img>`;
            }
        }

    }

}