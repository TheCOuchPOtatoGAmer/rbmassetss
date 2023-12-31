const searchInput = document.getElementById('search-input');
const assetsContainer = document.getElementById('assets');

let assets = []; // Array to store the assets

// Function to create an asset element
function createAssetElement(asset) {
  const assetElement = document.createElement('div');
  assetElement.classList.add('asset');
  assetElement.dataset.category = asset.category.toLowerCase();

  const imageElement = document.createElement('img');
  imageElement.src = asset.source;
  assetElement.appendChild(imageElement);

  const titleElement = document.createElement('h2');
  titleElement.innerText = asset.title;
  assetElement.appendChild(titleElement);

  const likeButton = document.createElement('button');
  likeButton.classList.add('like-button');
  likeButton.innerText = 'Like';
  assetElement.appendChild(likeButton);

  const dislikeButton = document.createElement('button');
  dislikeButton.classList.add('dislike-button');
  dislikeButton.innerText = 'Dislike';
  assetElement.appendChild(dislikeButton);

  let isLiked = false;
  let isDisliked = false;

  likeButton.addEventListener('click', () => {
    if (!isLiked) {
      isLiked = true;
      likeButton.classList.add('liked');
      dislikeButton.classList.remove('disliked');
    } else {
      isLiked = false;
      likeButton.classList.remove('liked');
    }
  });

  dislikeButton.addEventListener('click', () => {
    if (!isDisliked) {
      isDisliked = true;
      dislikeButton.classList.add('disliked');
      likeButton.classList.remove('liked');
    } else {
      isDisliked = false;
      dislikeButton.classList.remove('disliked');
    }
  });

  return assetElement;
}


// Function to update the like and dislike counts
function updateLikes(asset) {
  const assetElement = document.getElementById(`asset-${asset.id}`);
  const likeButton = assetElement.querySelector('.like-button');
  const dislikeButton = assetElement.querySelector('.dislike-button');
  const likesCount = assetElement.querySelector('.likes-count');
  const dislikesCount = assetElement.querySelector('.dislikes-count');
  
  likesCount.innerText = asset.likes;
  dislikesCount.innerText = asset.dislikes;
  
  if (asset.liked) {
    likeButton.disabled = true;
    dislikeButton.disabled = false;
  } else if (asset.disliked) {
    likeButton.disabled = false;
    dislikeButton.disabled = true;
  }
  
  saveAssets();
}

// Function to filter assets based on the search query
function filterAssets(query) {
  const filteredAssets = assets.filter(asset => asset.title.toLowerCase().includes(query.toLowerCase()));
  renderAssets(filteredAssets);
}

// Function to render the assets on the page
function renderAssets(assetsToRender) {
  assetsContainer.innerHTML = '';
  
  if (assetsToRender.length > 0) {
    assetsToRender.forEach(asset => {
      const assetElement = createAssetElement(asset);
      assetElement.id = `asset-${asset.id}`;
      assetsContainer.appendChild(assetElement);
    });
  } else {
    const noResultsElement = document.createElement('p');
    noResultsElement.innerText = 'No results found.';
    assetsContainer.appendChild(noResultsElement);
  }
}

// Function to save the assets to local storage
function saveAssets() {
  localStorage.setItem('assets', JSON.stringify(assets));
}

// Function to load the assets from local storage
function loadAssets() {
  const savedAssets = localStorage.getItem('assets');
  if (savedAssets) {
    assets = JSON.parse(savedAssets);
    renderAssets(assets);
  }
}

// Event listener for search input
searchInput.addEventListener('input', event => {
  const query = event.target.value.trim();
  filterAssets(query);
});

// Initialize the assets
loadAssets();

