const backdrop = document.getElementById('modalBackdrop');
const closeBth = document.getElementById('closeBtn');
const newBtn = document.getElementById('newUserBtn');
const existBtn = document.getElementById('existingUserBtn');
const loginForm = document.getElementById('loginForm');
const managerE = document.getElementById('managerbutt')

if (backdrop && closeBth) {
  closeBth.onclick = () => { backdrop.style.display = 'none'; };
  backdrop.onclick = e => {
    if (e.target === backdrop) backdrop.style.display = 'none';
  };
}
/***אם הוא יכנס כמנהל שליחה לכניסה כמנהל */
if (managerE) {                      
  managerE.addEventListener('click', () => {
    window.location.href = 'manager.html';  
  });
}                                    

// משתמש חדש
if (newBtn) {
  newBtn.onclick = () => window.location.href = 'new.html';
}

if (existBtn && loginForm) {
  existBtn.onclick = () => {
    newBtn.style.display = 'none';
    existBtn.style.display = 'none';
    managerE.style.display = 'none';
    loginForm.style.display = 'block';
  };
}

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    { username: 'admin', password: '1234' },
    { username: 'demo', password: 'abcd' }
  ]));
}

const signupForm = document.getElementById('loginFormNew');
const inpUsername = document.getElementById('username');
const inpPassword = document.getElementById('password');
const inpPhone = document.getElementById('phone');
const inpAddress = document.getElementById('address');
const inpEmail = document.getElementById('email');


if (signupForm) {
  signupForm.onsubmit = e => {
    e.preventDefault();
    const ok = saveUser(
      inpUsername.value.trim(),
      inpPassword.value,
      inpPhone.value.trim(),
      inpAddress.value.trim(),
      inpEmail.value.trim()

    );
    if (ok) {
      alert('נרשמת בהצלחה!');
      window.location.href = 'connection.html';
    }
  };
}

function saveUser(username, password, phone, address, email) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // בדיקת כפילות
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      alert('שם המשתמש כבר קיים');
      return false;
    }
  }
  users.push({ username, password, phone, address, email, joined: Date.now() });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

function login(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  let found = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      found = users[i];
      break;
    }
  }
  if (!found) { alert('שם משתמש לא קיים'); return false; }
  if (found.password !== password) { alert('סיסמא שגויה'); return false; }

  localStorage.setItem('currentUser', found.username);
  return true;
}

if (loginForm) {
  loginForm.onsubmit = M => {
    M.preventDefault();

    // משתמש קיים
    const exUser = document.getElementById('username').value;
    const exPass = document.getElementById('password').value;
    const check = checkEx(exUser, exPass);
    switch (check) {
      case true:
        {
          alert('זוהיתם בהצלחה מייד תועברו למסך הבית');
          localStorage.setItem('currentUser', exUser); // זו השורה שצריך להוסיף/לוודא קיומה
          window.location.href = 'Main.html';

          break;
        }
      case false:
        {
          alert('שם משתמש או סיסמא שגויים');
          break;
        }
      case -1:
        {
          alert('  שם משתמש לא קיים אנא צור משתמש חדש  ');
          window.location.href = 'new.html';
          break;
        }

    }
  }
}


function checkEx(exUser, exPass) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  for (let i = 0; i < users.length; i++) {

    if (users[i].username === exUser) {
      return users[i].password === exPass ? true : false;
    }
  }

  return -1;
}
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('manager'); 

  if (!form) return; 

  form.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = document.getElementById('usernameManager').value.trim(); 
    const password = document.getElementById('passwordManager').value; 

    if (username !== "admin") { 
      alert("שם משתמש לא נכון"); 
      return; 
    }

    if (password !== "1234") { 
      alert("סיסמה שגויה"); 
      return; 
    }

    alert("זוהית בהצלחה!"); 
    window.location.href = "manager_Add.html";
  });
});
 
window.addEventListener("DOMContentLoaded", () => {
    // משיכת שם המשתמש מ-localStorage, אם קיים. אם לא, מציג "אורח".
    const usernameOr = localStorage.getItem("currentUser") || "אורח";
    const usernameOrElement = document.getElementById("usernameOR"); // קבלת האלמנט פעם אחת
    usernameOrElement.textContent = usernameOr;

    const orders = [
        // מערך ההזמנות שלך, אם קיים, ילך לכאן
    ];

    const list = document.getElementById("orderList");
    orders.forEach(order => {
        const li = document.createElement("li");
        li.textContent = order;
        list.appendChild(li);
    });

    // --- לוגיקת התנתקות/הפניה חדשה ---
    // קבלת דיב הכותרת של המשתמש, או ישירות את הספאן של האייקון/שם המשתמש
    const userHeader = document.getElementById("userHeader");
    if (userHeader) {
        userHeader.style.cursor = "pointer"; // הפוך את הסמן ליד כדי שיהיה ברור שזה לחיץ

        userHeader.addEventListener("click", () => {
            if (localStorage.getItem("currentUser")) { // אם משתמש מחובר
                const confirmLogout = confirm("האם ברצונך להתנתק?"); // שאל אישור
                if (confirmLogout) {
                    localStorage.removeItem("currentUser"); // נקה את נתוני המשתמש (שם המשתמש)
                    // אופציונלי, נקה נתונים ספציפיים אחרים למשתמש מ-localStorage אם קיימים
                    // localStorage.removeItem("userOrders");
                    alert("התנתקת בהצלחה.");
                    window.location.href = "connection.html"; // הפנה לדף ההתחברות
                }
            } else { // אם אין משתמש מחובר (usernameOr הוא "אורח")
                window.location.href = "connection.html"; // הפנה ישירות לדף ההתחברות
            }
        });
    }
});


