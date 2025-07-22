const backdrop = document.getElementById('modalBackdrop');
const closeBth = document.getElementById('closeBtn');
const newBtn = document.getElementById('newUserBtn');
const existBtn = document.getElementById('existingUserBtn');
const loginForm = document.getElementById('loginForm');
const manager = document.getElementById('manager')

if (backdrop && closeBth) {
  closeBth.onclick = () => { backdrop.style.display = 'none'; };
  backdrop.onclick = e => {
    if (e.target === backdrop) backdrop.style.display = 'none';
  };
}
/***אם הוא יכנס כמנהל שליחה לכניסה כמנהל */
if (manager) {                       // סוגר מסולסל
  manager.addEventListener('click', () => {
    window.location.href = 'manager.html';  // או window.location.assign(...)
  });
}                                    // סוגר מסולסל

// משתמש חדש
if (newBtn) {
  newBtn.onclick = () => window.location.href = 'new.html';
}

if (existBtn && loginForm) {
  existBtn.onclick = () => {
    newBtn.style.display = 'none';
    existBtn.style.display = 'none';
    manager.style.display='none';
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
      window.location.href = 'index.html';
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
    const exUser = document.getElementById('username')
    const exPass = document.getElementById('password')
    const check = checkEx(exUser.value, exPass.value);
    switch (check) {
      case true:
        {
          alert('זוהיתם בהצלחה מייד תועברו למסך הבית');
          window.location.href = 'index.html';
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




