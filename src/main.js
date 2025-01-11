// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми при сабміті
// у локальне сховище і змінюй кнопку Login на Logout і роби поля введення
// Недоступними для змін.

// При перезавантаженні сторінки, якщо користувач залогінений, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// З локального сховища.
// Якщо введені дані не збігаються з потрібними даними, викликати аlert і
// повідомляти про помилку.

const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};

const localStorageKey = 'user-data';

const loginFormEl = document.querySelector('.login-form');
const btnEl = document.querySelector('[name="button"]');


loginFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const { email, password } = loginFormEl.elements;
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    if (emailValue === "" || passwordValue === "") {
        alert('Fill all fields!');
        return;
    } 
    if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
        alert('Wrong data!');
        return;
    }
    localStorage.setItem(localStorageKey, JSON.stringify({ email: emailValue, password: passwordValue }));
    
    btnEl.textContent = 'Logout';
    email.setAttribute('readonly', true);
    password.setAttribute('readonly', true);
})