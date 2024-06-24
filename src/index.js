// Adding an event listener to the DOMContentLoaded event of the document
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    loadBreed();
    const dropdown = document.querySelector('select#breed-dropdown');
    const ul = document.querySelector('ul#dog-breeds');

    // Filtering and displaying dog breeds based on the user's selection from a dropdown menu.
    dropdown.addEventListener('change', (e) => {
      ul.innerHTML = '';
      const choice = e.target.value;
      breeds.filter(breed => {
        if (breed[0] === choice) {
          const li = document.createElement('li');
          li.id = breed;
          li.textContent = breed;
          changeColor(li);
          ul.appendChild(li);
        }
      });
    });

    // Function to fetch random dog images from the API 
    function loadImages() {
      const url = 'https://dog.ceo/api/breeds/image/random/4';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const images = data.message;
          for (let image of images) {
            addImage(image);
          }
        });
    }

    // Function to append the <img> to a container element displaying it in the specified container
    function addImage(imageUrl) {
      const container = document.getElementById('dog-image-container');
      const img = document.createElement('img');
      img.src = imageUrl;
      container.appendChild(img);
    }

    // Function to fetch a list of dog breeds from the API 
    function loadBreed() {
      const url = 'https://dog.ceo/api/breeds/list/all';
      fetch(url)
        .then(res => res.json())
        .then(data => {
          breeds = Object.keys(data.message);
          for (let breed of breeds) {
            addBreed(breed);
          }
        });
    }

    // Function to create a new list item, set its className and textContent, apply color change and append it to an ul
    function addBreed(el) {
      const li = document.createElement('li');
      li.className = 'dogBreed';
      li.textContent = el;
      changeColor(li);
      ul.appendChild(li);
    }

    // Function to add a click event listener to (el).
    function changeColor(el) {
      el.addEventListener('click', () => {
        el.style.color = '#9C51E0';
      });
    }
  });

  console.log('%c HI', 'color: firebrick');

  // Function to fetch 4 random dog images from the API 
  function fetchImage() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
      .then(res => res.json())
      .then(dogs => {
        dogs.message.forEach(dog => {
          const image = document.createElement('img');
          image.src = dog;
          document.getElementById('dog-image-container').appendChild(image);
        });
      });
  }

  // Function to fetch a list of all dog breeds from the API 
  function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    return fetch(breedUrl)
      .then(res => res.json())
      .then(data => Object.keys(data.message));
  }

  // Waiting for the webpage to fully load, then fetch and display dog images and a list of dog breeds
  window.addEventListener('load', () => {
    fetchImage();
    fetchBreeds().then(breeds => {
      const breedList = document.getElementById('dog-breeds');
      breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        breedList.appendChild(li);
      });
    });
  });