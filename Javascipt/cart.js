let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    localStorage.setItem('cart', JSON.stringify(cart));


    console.log(`${product.name} נוסף לעגלה. ${product.id}`);

}
document.addEventListener('DOMContentLoaded', function () {
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('totalPrice').innerText = "סה״כ לתשלום: " + total + " ₪"
});



document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // שחק את העגלה מה-local storage, או ריק

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
});

document.addEventListener('click', function (e) {
    const itemId = e.target.dataset.id;
    deleteItem(itemId);
});

function deleteItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id != parseFloat(itemId));
    localStorage.setItem('cart', JSON.stringify(cart));
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

}
document.getElementById("checkout-btn").addEventListener("click", ToPay);

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

  // ← לא צריך DOMContentLoaded כי את יוצרת את האלמנטים עכשיו

  // סוגר את הפופאפ בלחיצה על X
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
  });

  // סוגר בלחיצה על הרקע
  document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target.id === "popup") {
      document.getElementById("popup").classList.add("hidden");
    }
  });

  // שליחת הטופס
  document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("התשלום התקבל בהצלחה!");
    window.location.href = "thanks.html"; // מעבר לדף אחר
    document.getElementById("popup").classList.add("hidden");
  });

}







