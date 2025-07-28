let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function addToCart(button) {
  const productDiv = button.closest('.product');
  const name = productDiv.querySelector('.productName').innerText
  const price = parseFloat(productDiv.querySelector('.price').innerText)
  const img = productDiv.querySelector('.Pimg').src
  const id = Math.random()
  const product = {
    id: id,
    name: name,
    price: price,
    img: img
  }
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));

  updateTotals();

  console.log(`${product.name} נוסף לעגלה. ${product.id}`);

}
document.addEventListener('DOMContentLoaded', function () {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const totalPriceElem = document.getElementById('totalPrice');
  if (totalPriceElem) {
    totalPriceElem.innerText = "סה״כ לתשלום: " + total + " ₪";
  }

});



document.addEventListener('DOMContentLoaded', () => {
  updateTotals();
  const cart = JSON.parse(sessionStorage.getItem('cart')) || []; // שחק את העגלה מה-local storage, או ריק
  const cartItemsContainer = document.getElementById('cartItems');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = ''; // לנקות את התצוגה הקודמת

    cart.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('cartItem');
      productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="50" height="50">
            <span>${product.name} - ${product.price} ש"ח</span><div id="icon"><img src="../image/trash.svg" data-id="${product.id}"></div>
        `;
      cartItemsContainer.appendChild(productElement);
    });
  }
});

document.addEventListener('click', function (e) {
  const itemId = e.target.dataset.id;
  deleteItem(itemId);
});

function deleteItem(itemId) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart = cart.filter(product => product.id != parseFloat(itemId));
  sessionStorage.setItem('cart', JSON.stringify(cart));
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  document.getElementById('totalPrice').innerText = "סה״כ לתשלום: " + total + " ₪"
  // מציאת האלמנט DOM עם המזהה המתאים
  const allItems = document.querySelectorAll('[data-id]');
  allItems.forEach(img => {
    if (parseFloat(img.dataset.id) === parseFloat(itemId)) {
      const cartItem = img.closest('.cartItem');
      cartItem.classList.add('fade-out');

      // מחיקה לאחר סיום האנימציה
      setTimeout(() => {
        cartItem.remove();
      }, 500); // תואם ל־transition של CSS
    }
  });

  updateTotals();
}
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", ToPay);
}

// document.getElementById("checkout-btn").addEventListener("click", ToPay);

function ToPay() {
  if (document.getElementById("popup")) {
    document.getElementById("popup").classList.remove("hidden");
    return;
  }

  const Pay = document.createElement('div');
  Pay.innerHTML = `
    <div id="popup">
      <div class="popup-content">
        <span id="close-btn">&times;</span>
        <div id="popup-body">
          <form id="payment-form">
            <h2>פרטי תשלום</h2>
            <label>שם מלא:</label>
            <input type="text" placeholder="ישראל ישראלי" required>
            <label>מספר כרטיס:</label>
            <input type="text" placeholder="1234 5678 9012 3456" required>
            <label>תוקף:</label>
            <input type="text" placeholder="MM/YY" required>
            <label>CVV:</label>
            <input type="text" placeholder="123" required>
            <label>אימייל:</label>
            <input type="email" placeholder="example@mail.com" required>
            <button type="submit" >שלם עכשיו</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(Pay);

  // סוגר את הפופאפ בלחיצה על X
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
  });

  // סוגר בלחיצה על הרקע
  document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target.id === "popup") {
      document.getElementById("popup").style.display = "none";
    }
  });

  // שליחת הטופס
  document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("התשלום התקבל בהצלחה!");
    window.location.href = "Main.html"; // מעבר לדף אחר
    document.getElementById("popup").classList.add("hidden");
  });

}




const deliveryIcon = document.querySelector('.icont');
if (deliveryIcon) {
  deliveryIcon.addEventListener("click", () => {
    console.log("לחצת על האייקון");
    delivery();
  });
}

function delivery() {
  if (document.getElementById("popupdel")) {
    document.getElementById("popupdel").classList.remove("hidden");
    return;
  }

  const deliver = document.createElement('div');
  deliver.innerHTML = `
    <div id="popupdel">
      <div class="popupt-content">
        <span id="close-del-btn">&times;</span>
        <div id="popupt-body">
          <form id="del-form">
            <h2>שיטת משלוח</h2>
            <button type="button" id="pickup">איסוף עצמי </button>
            <button type="button" id="delivery" >משלוח</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(deliver);

  // כפתור סגירה
  document.getElementById("close-del-btn").addEventListener("click", () => {
    document.getElementById("popupdel").style.display = "none";
  });

  document.getElementById("popupdel").addEventListener("click", (e) => {
    if (e.target.id === "popupdel") {
      document.getElementById("popupdel").style.display = "none";
    }
  });

  // בחירת שיטת משלוח
  document.getElementById("pickup").addEventListener("click", () => {
    saveShipping("איסוף עצמי", 0);
  });

  document.getElementById("delivery").addEventListener("click", () => {
    saveShipping("משלוח", 25);
  });

}
function saveShipping(method, price) {
  sessionStorage.setItem("shippingMethod", method);
  sessionStorage.setItem("shippingPrice", price);

  alert(`נבחרה שיטת משלוח: ${method} (עלות: ${price} ₪)`);

  document.getElementById("popupdel").remove();

  updateTotals();
}



function updateTotals() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const shippingPrice = parseFloat(sessionStorage.getItem('shippingPrice')) || 0;

  const productsTotal = cart.reduce((sum, product) => sum + product.price, 0);
  const finalTotal = productsTotal + shippingPrice;

  const totalPriceElem = document.getElementById('totalPrice');
  const shippingCostElem = document.getElementById('shippingCost');
  const finalTotalElem = document.getElementById('finalTotal');

  if (totalPriceElem) {
    totalPriceElem.innerText = `סה״כ מוצרים: ${productsTotal} ₪`;
  }
  if (shippingCostElem) {
    shippingCostElem.innerText = shippingPrice > 0 ? `עלות משלוח: ${shippingPrice} ₪` : 'איסוף עצמי - ללא עלות משלוח';
  }
  if (finalTotalElem) {
    finalTotalElem.innerText = `סה״כ לתשלום כולל משלוח: ${finalTotal} ₪`;
  }
}


let pro = JSON.parse(localStorage.getItem('pro')) || [];

function addNewProduct() {
  const name = document.getElementById("inputProductName").value.trim();
  const price = document.getElementById("inputProductPrice").value.trim();
  const imageUrl = document.getElementById("inputProductImage").value.trim();

  if (!name || !price || !imageUrl) {
    alert("אנא מלאי את כל השדות");
    return;
  }

  const obj = {
    name: name,
    price: price,
    imageUrl: imageUrl
  };

  pro.push(obj);
  localStorage.setItem('pro', JSON.stringify(pro));

  addProductToDOM(obj);

  // ניקוי השדות
  document.getElementById("inputProductName").value = "";
  document.getElementById("inputProductPrice").value = "";
  document.getElementById("inputProductImage").value = "";

  window.location.href="Main.html"
}

function addProductToDOM(product) {
  const contain = document.getElementById("container");

  contain.innerHTML += `
    <div class="product">
      <div class="img">
        <a><img src="${product.imageUrl}" width="65%" height="auto" alt="${product.name}" class="Pimg"></a>
        <div>
          <h3 class="productName">${product.name}</h3>
          <h4 class="price">${product.price}</h4>
        </div>
        <div>
          <button onclick="addToCart(this)">הוספה לסל</button>
        </div>
      </div>
    </div>`;
}

// פונקציה לטעינת כל המוצרים מה-localStorage בעת טעינת הדף
function loadProducts() {
  pro.forEach(product => {
    addProductToDOM(product);
  });
}

// לקרוא את loadProducts אחרי טעינת הדף
window.onload = loadProducts;
