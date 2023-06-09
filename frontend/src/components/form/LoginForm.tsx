import React, { useRef } from 'react';
// import classes from './LoginForm.module.css';
import { Link, useNavigate, redirect } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/api/authApiSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser, setIsAuth } from '../../features/auth/authSlice';
import Loading from '../UI/Loading';
import { saveTokens } from '../../utils/saveTokens';

const LoginForm: React.FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.api.queries);
  const navigate = useNavigate();

  const [login, { data, isLoading, isError, isSuccess, error }] = useLoginMutation();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email: emailRef.current!.value, password: passwordRef.current!.value });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isAuth) {
    redirect('/');
  }
  if (isSuccess && data) {
    dispatch(setUser({ user: data.user }));
    dispatch(setIsAuth(true));
    saveTokens(data.aToken, data.rToken);
    navigate('/');
  }

  return (
    <div className="forma_div mt-24">
      <h1 className="text-center">Please Log in to continue</h1>
      {isError && (
        <p className="text-center" style={{ color: 'red' }}>
          {error?.message}
        </p>
      )}
      <form onSubmit={loginHandler} className="forma_user">
        <div className="w-full">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            ref={emailRef}
            className="w-full"
            // value={onLogin.email}
            // onChange={emailHandler}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="w-full">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            ref={passwordRef}
            className="w-full"
            // value={onLogin.password}
            // onChange={passwordHandler}
            type="password"
            id="password"
            placeholder="*********"
          />
        </div>
        <div className="">
          <button className="btn bg-blue-500 text-white">Submit</button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p>
          Not registered? click here to <Link to={'/register'}>register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
