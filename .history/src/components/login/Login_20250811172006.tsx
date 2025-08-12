import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from './Form';
import { useAppDispatch } from '../../hooks';
import { setUser } from '../../features/user/userSlice';
import type { FirebaseError } from 'firebase/app';

const Login = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [firebaseError, setFirebaseError] = useState('');

  const goToRegister = () => {
    navigate(location.pathname, { state: { modal: 'register' } });
  };

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();
    setFirebaseError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      onClose();
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const e = error as FirebaseError;
        switch (e.code) {
          case 'auth/user-not-found':
            setFirebaseError('No account found with this email.');
            break;
          case 'auth/wrong-password':
            setFirebaseError('Incorrect password.');
            break;
          case 'auth/invalid-email':
            setFirebaseError('Invalid email format.');
            break;
          default:
            setFirebaseError('Login failed. Please try again.');
        }
      } else {
        setFirebaseError('Login failed. Please try again.');
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
        <h2 className="text-[30px] leading-[34px] text-[#343434] font-black text-center uppercase font-[raleway]">
          Log in
        </h2>
        <Form label="Log in" handleClick={handleLogin} firebaseError={firebaseError} />
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center bg-transparent absolute right-[20px] top-[20px] w-[]">
          <img src="../../../src/assets/img/close.png" alt="" />
        </button>
        <button type="button" onClick={goToRegister} className="authGoRegister">
          Register now
        </button>
      </div>
    </div>
  );
};

export default Login;
