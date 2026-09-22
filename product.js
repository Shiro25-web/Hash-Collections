/* ==========================================
   HASH COLLECTIONS
   PRODUCT DATA + SHOPPING BAG
========================================== */

const products = [
  {
    id: 1,
    category: "handbags",
    categoryLabel: "Handbag",
    name: "The Classic",
    description: "Everyday shoulder bag with a roomy interior.",
    image: "image.png",
    alt: "The Classic Handbag",
    price: 24000,
  },

  {
    id: 2,
    category: "handbags",
    categoryLabel: "Tote Bag",
    name: "Tote Bag",
    description: "Spacious everyday tote for your essentials.",
    image: "image copy.png",
    alt: "Tote Bag",
    price: 21500,
  },

  {
    id: 3,
    category: "handbags",
    categoryLabel: "Crossbody",
    name: "Men's Crossbody",
    description: "Compact crossbody with an adjustable strap.",
    image: "shopping (1).webp",
    alt: "Men's Crossbody Bag",
    price: 27000,
  },

  {
    id: 4,
    category: "school",
    categoryLabel: "School Bag",
    name: "The Rainbow Pack",
    description: "Practical backpack with plenty of storage.",
    image: "407515_12136_XL.jpg",
    alt: "Rainbow School Backpack",
    price: 14000,
  },

  {
    id: 5,
    category: "school",
    categoryLabel: "School Bag",
    name: "The Junior Pack",
    description: "Lightweight design for younger students.",
    image: "81VMBd9F8tL._AC_UY1000_.jpg",
    alt: "Junior School Backpack",
    price: 11500,
  },

  {
    id: 6,
    category: "travel",
    categoryLabel: "Travel Bag",
    name: "The Traveller",
    description: "Weekend-trip size with sturdy straps.",
    image: "travelling bag.png",
    alt: "Travel Bag",
    price: 32000,
  },

  {
    id: 7,
    category: "travel",
    categoryLabel: "Gym Bag",
    name: "The Gym Run",
    description: "Compact design for active everyday use.",
    image: "gym.jpeg",
    alt: "Gym Bag",
    price: 18000,
  },

  {
    id: 8,
    category: "everyday",
    categoryLabel: "Laptop Bag",
    name: "The Office Carry",
    description: "Protective everyday bag for work and study.",
    image: "laptop.png",
    alt: "Laptop Bag",
    price: 29000,
  },

  {
    id: 9,
    category: "everyday",
    categoryLabel: "Belt Pouch",
    name: "The Belt Pouch",
    description: "Compact hands-free storage for essentials.",
    image: "crossbag.jpeg",
    alt: "Belt Pouch",
    price: 9000,
  },

  {
    id: 10,
    category: "everyday",
    categoryLabel: "waist Bag",
    name: "The Side Sling",
    description: "Slim crossbody design with adjustable strap.",
    image: "waist bag.webp",
    alt: "waist bag",
    price: 13500,
  },
];

/* ==========================================
   PRODUCT DISPLAY
========================================== */

const productGrid = document.querySelector(".product-grid");

function formatPrice(price) {
  return `₦${Number(price).toLocaleString()}`;
}

function createProductCard(product) {
  const card = document.createElement("article");

  card.className = "product-card";
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="product-image-wrap">

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.alt}"
        loading="lazy"
      />

    </div>

    <div class="product-info">

      <p class="product-category">
        ${product.categoryLabel}
      </p>

      <h3 class="product-name heading">
        ${product.name}
      </h3>

      <p class="product-description">
        ${product.description}
      </p>

      <div class="product-bottom">

        <span class="price">
          ${formatPrice(product.price)}
        </span>

        <button
          type="button"
          class="add-to-bag"
          data-id="${product.id}"
        >
          Add to Bag
        </button>

      </div>

    </div>
  `;

  return card;
}

function displayProducts(productList) {
  productGrid.innerHTML = "";

  productList.forEach((product) => {
    productGrid.appendChild(createProductCard(product));
  });
}

/* ==========================================
   PRODUCT FILTER
========================================== */

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    if (filter === "all") {
      displayProducts(products);

      return;
    }

    const filteredProducts = products.filter((product) => {
      return product.category === filter;
    });

    displayProducts(filteredProducts);
  });
});

/* ==========================================
   SHOPPING BAG
========================================== */

const BAG_STORAGE_KEY = "hash-collections-bag";

let bag = loadBag();

function loadBag() {
  try {
    const saved = localStorage.getItem(BAG_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not load shopping bag:", error);

    return [];
  }
}

function saveBag() {
  localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bag));
}

/* ==========================================
   ADD TO BAG
========================================== */

function addToBag(productId) {
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return;
  }

  const existingItem = bag.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    bag.push({
      id: product.id,

      name: product.name,

      price: product.price,

      quantity: 1,
    });
  }

  saveBag();

  updateBag();

  showToast(`${product.name} added to your bag`);
}

/* ==========================================
   CHANGE QUANTITY
========================================== */

function increaseQuantity(productId) {
  const item = bag.find((product) => product.id === Number(productId));

  if (!item) {
    return;
  }

  item.quantity += 1;

  saveBag();

  updateBag();
}

function decreaseQuantity(productId) {
  const item = bag.find((product) => product.id === Number(productId));

  if (!item) {
    return;
  }

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    bag = bag.filter((product) => product.id !== Number(productId));
  }

  saveBag();

  updateBag();
}

/* ==========================================
   REMOVE ITEM
========================================== */

function removeFromBag(productId) {
  const item = bag.find((product) => product.id === Number(productId));

  bag = bag.filter((product) => product.id !== Number(productId));

  saveBag();

  updateBag();

  if (item) {
    showToast(`${item.name} removed from your bag`);
  }
}

/* ==========================================
   BAG TOTALS
========================================== */

function getBagItemCount() {
  return bag.reduce((total, item) => total + item.quantity, 0);
}

function getBagTotal() {
  return bag.reduce((total, item) => total + item.price * item.quantity, 0);
}

/* ==========================================
   UPDATE BAG UI
========================================== */

function updateBag() {
  const bagCount = document.getElementById("bag-count");

  const bagItemsElement = document.getElementById("bag-items");

  const whatsappSend = document.getElementById("whatsapp-send");

  if (!bagCount || !bagItemsElement) {
    return;
  }

  /* BAG COUNT */

  bagCount.textContent = getBagItemCount();

  /* EMPTY BAG */

  if (bag.length === 0) {
    bagItemsElement.innerHTML = `

      <div class="empty-bag">

        <i
          data-lucide="shopping-bag"
          width="30"
        ></i>

        <p>
          Your bag is currently empty.
        </p>

        <p>
          Add a bag from the collection
          and it will appear here.
        </p>

      </div>

    `;

    if (whatsappSend) {
      whatsappSend.href = createWhatsAppLink(
        "Hi Hash Collections, I'd like to make an enquiry about your bags.",
      );
    }

    refreshIcons();

    return;
  }

  /* BAG ITEMS */

  bagItemsElement.innerHTML = bag
    .map((item) => {
      const itemTotal = item.price * item.quantity;

      return `

        <div
          class="bag-item"
          data-id="${item.id}"
        >

          <div class="bag-item-details">

            <p class="bag-item-name">
              ${escapeHTML(item.name)}
            </p>

            <p class="bag-item-price">
              ${formatPrice(item.price)}
            </p>

            <div class="quantity-controls">

              <button
                type="button"
                class="quantity-button decrease-quantity"
                data-id="${item.id}"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span class="quantity">
                ${item.quantity}
              </span>

              <button
                type="button"
                class="quantity-button increase-quantity"
                data-id="${item.id}"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>


          <div class="bag-item-actions">

            <strong class="bag-item-total">
              ${formatPrice(itemTotal)}
            </strong>

            <button
              type="button"
              class="remove-item"
              data-id="${item.id}"
            >
              Remove
            </button>

          </div>

        </div>

      `;
    })
    .join("");

  /* TOTAL */

  const total = getBagTotal();

  bagItemsElement.insertAdjacentHTML(
    "beforeend",
    `

      <div class="bag-total">

        <span>
          Total
        </span>

        <strong>
          ${formatPrice(total)}
        </strong>

      </div>

    `,
  );

  /* WHATSAPP */

  if (whatsappSend) {
    whatsappSend.href = createWhatsAppLink(createOrderMessage());
  }

  refreshIcons();
}

/* ==========================================
   WHATSAPP ORDER
========================================== */

const WHATSAPP_NUMBER = "2349064007975";

function createOrderMessage() {
  const lines = ["Hi Hash Collections, I'd like to order:", ""];

  bag.forEach((item) => {
    const itemTotal = item.price * item.quantity;

    lines.push(`• ${item.name} x${item.quantity} - ${formatPrice(itemTotal)}`);
  });

  lines.push("");

  lines.push(`Total: ${formatPrice(getBagTotal())}`);

  lines.push("");

  lines.push("Please let me know the next steps.");

  return lines.join("\n");
}

function createWhatsAppLink(message) {
  return (
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
  );
}

/* ==========================================
   BUTTON EVENTS
========================================== */

document.addEventListener("click", (event) => {
  /* ADD TO BAG */

  const addButton = event.target.closest(".add-to-bag");

  if (addButton) {
    addToBag(addButton.dataset.id);

    return;
  }

  /* INCREASE */

  const increaseButton = event.target.closest(".increase-quantity");

  if (increaseButton) {
    increaseQuantity(increaseButton.dataset.id);

    return;
  }

  /* DECREASE */

  const decreaseButton = event.target.closest(".decrease-quantity");

  if (decreaseButton) {
    decreaseQuantity(decreaseButton.dataset.id);

    return;
  }

  /* REMOVE */

  const removeButton = event.target.closest(".remove-item");

  if (removeButton) {
    removeFromBag(removeButton.dataset.id);

    return;
  }
});

/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}

/* ==========================================
   TOAST
========================================== */

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.hashToastTimer);

  window.hashToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* ==========================================
   LUCIDE ICONS
========================================== */

function refreshIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/* ==========================================
   CART CSS
   Injected automatically
========================================== */

const cartStyle = document.createElement("style");

cartStyle.textContent = `

  .bag-item {
    align-items: flex-start;
  }

  .bag-item-details {
    flex: 1;
    min-width: 0;
  }

  .bag-item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .bag-item-total {
    font-size: 12px;
    white-space: nowrap;
  }

  .quantity-controls {
    display: inline-flex;
    align-items: center;
    margin-top: 10px;
    border: 1px solid var(--border);
    background: white;
  }

  .quantity-button {
    width: 30px;
    height: 28px;
    border: 0;
    background: transparent;
    color: var(--black);
    cursor: pointer;
    font-size: 17px;
    line-height: 1;
  }

  .quantity-button:hover {
    background: var(--cream);
  }

  .quantity {
    min-width: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
  }

  .bag-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
    font-size: 15px;
  }

  .bag-total strong {
    font-size: 18px;
  }

  @media (max-width: 420px) {

    .bag-items {
      padding: 18px;
    }

    .drawer-footer {
      padding: 18px;
    }

    .bag-item {
      gap: 10px;
    }

    .bag-item-actions {
      align-items: flex-end;
    }

  }

`;

document.head.appendChild(cartStyle);

/* ==========================================
   INITIALISE
========================================== */

displayProducts(products);

updateBag();

refreshIcons();
