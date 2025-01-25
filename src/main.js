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

const { email, password } = loginFormEl.elements;

loginFormEl.addEventListener('submit', evt => {
  evt.preventDefault();
  if (btnEl.textContent === 'Logout') {
    localStorage.removeItem(localStorageKey);
    loginFormEl.reset();
    email.removeAttribute('readonly');
    password.removeAttribute('readonly');
    btnEl.textContent = 'Login';
    return;
  }

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === '' || passwordValue === '') {
    alert('Fill all fields!');
    return;
  }
  if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
    alert('Wrong data!');
    return;
  }
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({ email: emailValue, password: passwordValue })
  );

  btnEl.textContent = 'Logout';
  email.setAttribute('readonly', true);
  password.setAttribute('readonly', true);
});

const savedData = localStorage.getItem(localStorageKey);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  email.value = parsedData.email;
  password.value = parsedData.password;
  btnEl.textContent = 'Logout';
  email.setAttribute('readonly', true);
  password.setAttribute('readonly', true);
}

// Додай відображення дати і часу в реальному часі

const dateTime = document.querySelector('.date span');

dateTime.textContent = new Date().toLocaleString();

console.log(new Date());
console.log(new Date().toLocaleString());

setInterval(() => {
  dateTime.textContent = new Date().toLocaleString();
}, 1000);

// Перероби функцію на проміс таким чином, щоб проміс повертав значення
// через 2 секунди після виклику функції

// function greet() {
//   return 'hello world';
// }

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hello world');
//   }, 2000);
// });

// promise.then(response => {
//     console.log(response);
// });

// - Використовуй prompt та повертай значення звідти.
// - Створи функцію, яка буде набувати значення з prompt і повертатиме проміс.
// Якщо значення не є числом, відхиляй проміс та логіруй "error".
// Якщо значення парне, вирішуй проміс та повертай "even" через 1 секунду.
// Якщо значення не парне, вирішуй проміс та повертай "odd" через 2 секунди.

// const userData = prompt('Enter somthing!');
// fun(userData)
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => console.log(err));

// function fun(data) {
//   return new Promise((res, rej) => {
//     if (Number.isNaN(Number(data))) {
//       rej('error');
//     } else if (data % 2 === 0) {
//       setTimeout(() => {
//         res('even');
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         res('odd');
//       }, 2000);
//     }
//   });
// }

// // Напишіть функцію calculateAge(birthDate), яка приймає дату народження у форматі YYYY-MM-DD і повертає поточний вік.
// // Підказка: Використайте об'єкт Date для обчислення різниці між сьогоднішньою датою і датою народження

// const calculateAge = birthDate => {
//   const userDate = new Date(birthDate);

//   const birthdayYear = userDate.getFullYear();
//   const birthdayMonth = userDate.getMonth();
//   const birthdayDay = userDate.getDate();

//   let diffYear = new Date().getFullYear() - birthdayYear;

//   const diffMouth = new Date().getMonth() - birthdayMonth;

//   const diffDay = new Date().getDate() - birthdayDay;

//   if (diffMouth < 0 || (diffDay < 0 && diffMouth === 0)) {
//     diffYear -= 1;
//   }

//   return diffYear;
// };

// console.log(calculateAge('2000-01-07'));
// console.log(calculateAge('2000-01-17'));
// console.log(calculateAge('2000-07-17'));



