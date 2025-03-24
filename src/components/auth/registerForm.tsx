"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import useAuth from '@/lib/hooks/useAuth';

const RegisterForm = () => {
  const { register, error, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // Перенаправление если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Проверка совпадения паролей на клиенте
    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match!');
      return;
    }
    
try {
  
  const status = await register({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.password_confirmation
  });

    console.log('register success')
    router.push('/login');
  
} catch (error) {
  console.error(error)
}
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col p-3 border-2 gap-4'>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
        minLength={6}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
        required
        minLength={6}
      />
      
      {error && (
        <div className="text-red-500">
          {typeof error === 'string' 
            ? error 
            : Object.entries(error).map(([field, messages]) => (
              <div key={field}>
                <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : String(messages)}
              </div>
            ))
          }
        </div>
      )}
      
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;