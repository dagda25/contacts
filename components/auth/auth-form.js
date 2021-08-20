import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  function switchAuthModeHandler() {
    setError(false);
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      setError(false);
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace('/contacts');
      } else {
        setError(true);
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
      } catch (error) {
        setError(true);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Введите Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Введите пароль</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            minLength="3"
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? 'Создать новый аккаунт'
              : 'Войти с существующим аккаунтом'}
          </button>
        </div>
      </form>
      {error && (
        <div className={classes.error}>Произошла ошибка! Попробуйте снова.</div>
      )}
    </section>
  );
}

export default AuthForm;
