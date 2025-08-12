import { useState } from 'react';

interface FormProps {
  label: string;
  handleClick: (email: string, password: string) => void;
  firebaseError?: string;
}

function Form({ label, handleClick, firebaseError }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    // Reset local validation error
    setError('');

    // ✅ Validation logic
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // ✅ If all good, call the handler
    handleClick(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="block text-[#555] text-[14px] leading-[48px] px-[30px] h-[50px] w-full border-[1px] border-[#eee] rounded-[26px] mt-[20px]"
        required
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="block text-[#555] text-[14px] leading-[48px] px-[30px] h-[50px] w-full border-[1px] border-[#eee] rounded-[26px] mt-[20px]"
        required
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <button type="submit" className="block w-full text-white text-[11px] leading-[18px] text-center">
        {label}
      </button>

      {/* Local validation error */}
      {error && <p className="error">{error}</p>}

      {/* Firebase error passed from parent */}
      {firebaseError && <p className="error">{firebaseError}</p>}
    </form>
  );
}

export default Form;
