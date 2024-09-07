const generateMemeBtn = document.querySelector(".generate-meme-btn");
const memeImage = document.querySelector(".meme-content img");
const memeTitle = document.querySelector(".meme-title");
const memeAuthor = document.querySelector(".meme-author");

const updateDetails = (url, title, author) => {
  memeImage.setAttribute("src", url);
  memeTitle.textContent = title;
  memeAuthor.textContent = `Meme by: ${author}`;

  // Apply fade-in effect to image
  memeImage.onload = () => {
    memeImage.classList.add("fade-in");
  };
};

const generateMeme = () => {
  // Remove fade-in class before generating a new meme
  memeImage.classList.remove("fade-in");
  memeImage.style.opacity = 0;

  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) => {
      updateDetails(data.url, data.title, data.author);
    })
    .catch((error) => {
      memeTitle.textContent = "Failed to load meme!";
      memeAuthor.textContent = "";
      memeImage.setAttribute("src", ""); // Clear image on error
      console.error("Error fetching meme:", error);
    });
};

generateMemeBtn.addEventListener("click", generateMeme);

generateMeme(); // Load a meme when the page loads
