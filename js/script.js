let assets = [];

// Load asset data from JSON
function loadAssetData(callback) {
  fetch('assets.json')
    .then(response => response.json())
    .then(data => {
      assets = data.assets;
      loadAssetState();
      callback(assets);
    })
    .catch(error => console.error('Error loading asset data:', error));
}

function createAssetElement(asset) {
  const assetElement = document.createElement('div');
  assetElement.classList.add('asset');

  const imageElement = document.createElement('img');
  imageElement.src = asset.source;
  assetElement.appendChild(imageElement);

  const titleElement = document.createElement('h2');
  titleElement.innerText = asset.title;
  assetElement.appendChild(titleElement);

  const downloadButton = document.createElement('a');
  downloadButton.classList.add('download-button');
  downloadButton.href = asset.downloadUrl;
  downloadButton.innerText = 'Download';
  assetElement.appendChild(downloadButton);

  const likeButton = document.createElement('button');
  likeButton.innerText = 'Like';
  likeButton.addEventListener('click', () => {
    likeAsset(asset);
  });
  assetElement.appendChild(likeButton);

  const dislikeButton = document.createElement('button');
  dislikeButton.innerText = 'Dislike';
  dislikeButton.addEventListener('click', () => {
    dislikeAsset(asset);
  });
  assetElement.appendChild(dislikeButton);

  const likesElement = document.createElement('p');
  likesElement.innerText = `Likes: ${asset.likes}`;
  assetElement.appendChild(likesElement);

  const dislikesElement = document.createElement('p');
  dislikesElement.innerText = `Dislikes: ${asset.dislikes}`;
  assetElement.appendChild(dislikesElement);

  return assetElement;
}


// Function to populate assets
function populateAssets(assets) {
  const assetsContainer = document.getElementById('assets');
  assetsContainer.innerHTML = '';

  assets.forEach(asset => {
    const assetElement = createAssetElement(asset);
    assetsContainer.appendChild(assetElement);
  });
}

// Function to handle asset like event
function likeAsset(asset) {
  if (!asset.liked) {
    asset.likes++;
    asset.liked = true;
    saveAssetState();
    populateAssets(assets);
  }
}

// Function to handle asset dislike event
function dislikeAsset(asset) {
  if (!asset.disliked) {
    asset.dislikes++;
    asset.disliked = true;
    saveAssetState();
    populateAssets(assets);
  }
}

// Function to save asset state in localStorage
function saveAssetState() {
  localStorage.setItem('assetState', JSON.stringify(assets));
}

// Function to load asset state from localStorage
function loadAssetState() {
  const assetState = localStorage.getItem('assetState');
  if (assetState) {
    const savedAssets = JSON.parse(assetState);
    assets.forEach(asset => {
      const savedAsset = savedAssets.find(saved => saved.title === asset.title);
      if (savedAsset) {
        asset.likes = savedAsset.likes;
        asset.dislikes = savedAsset.dislikes;
        asset.liked = savedAsset.liked;
        asset.disliked = savedAsset.disliked;
      }
    });
  }
}

// Function to perform search
function performSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredAssets = assets.filter(asset => asset.title.toLowerCase().includes(searchTerm));

  populateAssets(filteredAssets);
}

// Load and populate assets
loadAssetData(assets => {
  populateAssets(assets);
});

// Add event listener to search input
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', performSearch);
