import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert, Button, Form, TextBox } from '../components/Controls';

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [peeking, togglePeeking] = useState(false);

  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSave = async () => {
    try {
      await createUserWithEmailAndPassword(
        getAuth(),
        email.current.value,
        password.current.value,
      );
      navigate('/reviews');
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Form title="Register for Stargazers">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextBox
          ref={email}
          label="Email address"
          isRequired
          type="text"
          placeholder="Your registered email address"
        />
        <TextBox
          ref={password}
          type={peeking ? 'text' : 'password'}
          label={
            <span>
              Password{' '}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePeeking(!peeking);
                }}
              >
                <span className="text-xl">{peeking ? '🫣' : '👀'}</span>
              </button>
            </span>
          }
          isRequired
        />
        <hr className="border-0 mt-4" />
        <div className="flex items-center gap-4">
          <Button onClick={handleSave}>Register</Button>
          <Link to="/login" className="hover:text-green-500">
            Already registered? Login.
          </Link>
        </div>
        {errorMessage && (
          <Alert onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
        )}
      </form>
    </Form>
  );
};

export default RegisterPage;
