import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (values) => {
    // For now, simulate auth. Replace with real API call later.
    const user = { id: Date.now(), username: values.username };
    login(user);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page container mx-auto px-4 py-12 max-w-md">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <input id="username" {...register('username', { required: 'Username required' })} aria-invalid={errors.username ? 'true' : 'false'} />
        {errors.username && <p role="alert" className="form-error">{errors.username.message}</p>}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: 'Password required', minLength: { value: 6, message: 'At least 6 characters' } })} aria-invalid={errors.password ? 'true' : 'false'} />
        {errors.password && <p role="alert" className="form-error">{errors.password.message}</p>}

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Login</button>

        <p style={{marginTop:'.5rem'}}>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
