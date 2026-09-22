// ==========================================
// HASH COLLECTIONS
// PRODUCT DATA
// ==========================================

const products = [
  {
    id: 1,
    name: "The Classic",
    category: "handbags",
    categoryName: "Handbag",
    price: 24000,
    description: "Everyday shoulder bag with a roomy interior.",
    image: "image.png",
  },

  {
    id: 2,
    name: "Tote Bag",
    category: "handbags",
    categoryName: "Tote Bag",
    price: 21500,
    description: "Spacious everyday tote for your essentials.",
    image: "image copy.png",
  },

  {
    id: 3,
    name: "Men's Crossbody",
    category: "handbags",
    categoryName: "Crossbody",
    price: 27000,
    description: "Compact crossbody with an adjustable strap.",
    image: "shopping (1).webp",
  },

  {
    id: 4,
    name: "The Rainbow Pack",
    category: "school",
    categoryName: "School Bag",
    price: 14000,
    description: "Colorful backpack for school and everyday use.",
    image: "407515_12136_XL.jpg",
  },

  {
    id: 5,
    name: "The Junior Pack",
    category: "school",
    categoryName: "School Bag",
    price: 11500,
    description: "Simple and practical backpack for everyday use.",
    image: "81VMBd9F8tL._AC_UY1000_.jpg",
  },

  {
    id: 6,
    name: "The Traveller",
    category: "travel",
    categoryName: "Travel Bag",
    price: 32000,
    description: "Spacious travel bag built for longer journeys.",
    image: "travelling bag.png",
  },

  {
    id: 7,
    name: "The Gym Run",
    category: "travel",
    categoryName: "Gym Bag",
    price: 18000,
    description: "Practical bag for your gym and workout essentials.",
    image: "gym.jpeg",
  },

  {
    id: 8,
    name: "The Office Carry",
    category: "everyday",
    categoryName: "Laptop Bag",
    price: 29000,
    description: "Protective everyday bag for work and study.",
    image: "laptop.png",
  },

  {
    id: 9,
    name: "The Waist Bag",
    category: "everyday",
    categoryName: "waist bag",
    price: 9000,
    description: "Compact hands-free storage for essentials.",
    image: "waist bag.webp",
  },

  {
    id: 10,
    name: "The Side Sling",
    category: "everyday",
    categoryName: "Side Bag",
    price: 13500,
    description: "Slim crossbody design with adjustable strap.",
    image: "shopping.webp",
  },
];

// ==========================================
// PRODUCT CONTAINER
// ==========================================

const productGrid = document.querySelector(".product-grid");

// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCard(product) {
  const card = document.createElement("article");

  card.className = "product-card";

  card.dataset.category = product.category;

  card.innerHTML = `
    
    <div class="product-image-wrap">

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      />

    </div>


    <div class="product-info">

      <p class="product-category">
        ${product.categoryName}
      </p>


      <h3 class="product-name heading">
        ${product.name}
      </h3>


      <p class="product-description">
        ${product.description}
      </p>


      <div class="product-bottom">

        <span class="price">
          ₦${product.price.toLocaleString()}
        </span>


        <button
          type="button"
          class="add-to-bag"
          data-product="${product.name}"
          data-price="${product.price}"
          data-id="${product.id}"
        >
          Add to Bag
        </button>

      </div>

    </div>

  `;

  return card;
}

// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {
  productGrid.innerHTML = "";

  productList.forEach((product) => {
    const card = createProductCard(product);

    productGrid.appendChild(card);
  });
}

// ==========================================
// FILTER PRODUCTS
// ==========================================

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Change active button

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    // Show all products

    if (filter === "all") {
      displayProducts(products);

      return;
    }

    // Filter products

    const filteredProducts = products.filter((product) => {
      return product.category === filter;
    });

    displayProducts(filteredProducts);
  });
});

// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts(products);
