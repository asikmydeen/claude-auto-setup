var LOCAL_STORAGE_WISHLIST_KEY = 'shopify-wishlist';
var LOCAL_STORAGE_DELIMITER = ',';
var BUTTON_ACTIVE_CLASS = 'text-primary';
var GRID_LOADED_CLASS = 'loaded';

var selectors = {
  button: '[ct-button-wishlist]',
  grid: '[ct-grid-wishlist]',
};

document.addEventListener('DOMContentLoaded', function () {
  ctWishlistInitButtons();
  ctWishlistInitGrid();
});

document.addEventListener('shopify-wishlist:updated', function (event) {
  console.log('[Shopify Wishlist] Wishlist Updated ✅', event.detail.wishlist);
  ctWishlistInitGrid();
});

document.addEventListener('shopify-wishlist:init-product-grid', function (event) {
  console.log('[Shopify Wishlist] Wishlist Product List Loaded ✅', event.detail.wishlist);
});

document.addEventListener('shopify-wishlist:init-buttons', function (event) {
  console.log('[Shopify Wishlist] Wishlist Buttons Loaded ✅', event.detail.wishlist);
});

var ctWishlistSetupGrid = function (grid) {
  var ctWishlist = getWishlist();
  var requests = ctWishlist.map(function (handle) {
    var productTileTemplateUrl = '/products/' + handle + '?view=card';
    return fetch(productTileTemplateUrl).then(function (res) {
      return res.text();
    });
  });
  Promise.all(requests).then(function (responses) {
    var ctWishlistProductCards = responses.join('');
    if(ctWishlistProductCards){
	    grid.innerHTML = ctWishlistProductCards;
    } else {
      grid.innerHTML = '<div class="text-center my-6">You have no products added to your wishlist</div>';
    }
    grid.classList.add(GRID_LOADED_CLASS);
    ctWishlistInitButtons();

    var event = new CustomEvent('shopify-wishlist:init-product-grid', {
      detail: { wishlist: ctWishlist }
    });
    document.dispatchEvent(event);
  });
};

var ctWishlistSetupButtons = function (buttons) {
  buttons.forEach(function (button) {
    var productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
    button.addEventListener('click', function () {
      console.log('clicked');
      updateWishlist(productHandle);
      button.classList.toggle(BUTTON_ACTIVE_CLASS);
    });
  });
};

var ctWishlistInitGrid = function () {
  var grid = document.querySelector(selectors.grid) || false;
  if (grid) ctWishlistSetupGrid(grid);
};

var ctWishlistInitButtons = function () {
  var buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) ctWishlistSetupButtons(buttons);
  else return;
  var event = new CustomEvent('shopify-wishlist:init-buttons', {
    detail: { ctWishlist: getWishlist() }
  });
  document.dispatchEvent(event);
};

var getWishlist = function () {
  var ctWishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  if (ctWishlist) return ctWishlist.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

var setWishlist = function (array) {
  var ctWishlist = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, ctWishlist);
  else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

  var event = new CustomEvent('shopify-wishlist:updated', {
    detail: { ctWishlist: array }
  });
  document.dispatchEvent(event);

  return ctWishlist;
};

var updateWishlist = function (handle) {
  var ctWishlist = getWishlist();
  var indexInWishlist = ctWishlist.indexOf(handle);
  if (indexInWishlist === -1) ctWishlist.push(handle);
  else ctWishlist.splice(indexInWishlist, 1);
  return setWishlist(ctWishlist);
};

var wishlistContains = function (handle) {
  var ctWishlist = getWishlist();
  return ctWishlist.indexOf(handle) !== -1;
};

var resetWishlist = function () {
  return setWishlist([]);
};