import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '../login/modal.css';
import Form from '../login/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

const Register = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');

  const goToLogin = () => {
    navigate(location.pathname, { state: { modal: 'login' } });
  };

  const handleRegister = async (email: string, password: string) => {
    const auth = getAuth();
    setFirebaseError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth);
      onClose();
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const e = error as FirebaseError;
        switch (e.code) {
          case 'auth/email-already-in-use':
            setFirebaseError('This email is already in use.');
            break;
          case 'auth/invalid-email':
            setFirebaseError('Invalid email format.');
            break;
          case 'auth/weak-password':
            setFirebaseError('Password must be at least 6 characters.');
            break;
        }
      } else {
        setFirebaseError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-full bg-[rgba(0,0,0,0.5)] z-999 flex items-center justify-center"
      onClick={onClose}>
      <div
        className="inline-block w-full max-w-full md:max-w-[570px] py-[50px] px-[50px] md:py-[80px] md:px-[100px] overflow-hidden relative bg-white rounded-[5px]"
        onClick={(evt) => evt.stopPropagation()}>
        <h2 className="text-[30px] leading-[34px] text-[#343434] font-black text-center uppercase font-[raleway]">
          Register
        </h2>
        <Form label="Register" handleClick={handleRegister} firebaseError={firebaseError} />
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center bg-transparent absolute right-[20px] top-[20px] w-[30px] h-[30px] border-0 cursor-pointer">
          <img src="../../../src/assets/img/close.png" className="block max-w-full" alt="close" />
        </button>
        <button
          type="button"
          onClick={goToLogin}
          className="block w-full text-[#555] underline text-[11px] leading-[18px] text-center font-[raleway] uppercase font-bold relative cursor-pointer bg-transparent border-0 mt-[20px]">
          Already have account
        </button>
      </div>
    </div>
  );
};

export default Register;
