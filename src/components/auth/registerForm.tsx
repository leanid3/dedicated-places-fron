"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/lib/providers/AuthProvider';

const RegisterForm = () =>{
    const auth = useAuth();
    if (!auth) {
      return <div>Loading...</div>;
    }
    const { register, error } = auth;
    const router = useRouter();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const success = await register(formData);
      if (success) router.push('/profile');
    };

    if(error) console.error(error)
        
    return (
      <form onSubmit={handleSubmit} className='flex flex-col p-3 border-2 gap-4'>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.passwordConfirmation}
          onChange={(e) => setFormData({...formData, passwordConfirmation: e.target.value})}
        />
        
        {error && (
          <div className="errors">            
            {/* {Object.entries(error).map(([field, messages]) => (
              <div key={field}>
                <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
              </div>
            ))} */}
          </div>
        )}
        
        <button type="submit">Register</button>
      </form>
    );
}

export default RegisterForm