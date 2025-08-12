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
        className="inline-block w-full max-w-[570px] py-[80px] px-[100px] overflow-hidden relative bg-white rounded-[5px]"
        onClick={(evt) => evt.stopPropagation()}>
        <h2 className="authTitle">Register</h2>
        <Form label="Register" handleClick={handleRegister} firebaseError={firebaseError} />
        <button type="button" onClick={onClose} className="authClose">
          <img src="../../../src/assets/img/close.png" alt="" />
        </button>
        <button type="button" onClick={goToLogin} className="authGoRegister">
          Already have account
        </button>
      </div>
    </div>
  );
};

export default Register;
