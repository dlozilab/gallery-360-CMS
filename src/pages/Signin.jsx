import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_APP } from '../firebase/firebase.config';

const auth = getAuth(FIREBASE_APP);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('market');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={{ ...styles.section, ...styles.leftSection }}>
          <img src="./assets/Gallery-360-cms.jpg" alt="Gallery" style={styles.graphic} />
          <div style={styles.title}>Gallery 360 Africa</div>
        </div>
        <div style={{ ...styles.section, ...styles.rightSection }}>
          <div style={styles.formContainer}>
            <div style={styles.header}>Sign In</div>
            <form style={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div style={styles.error}>{error}</div>}
              <a href="#" style={styles.link}>Forgot password?</a>
              <button type="submit" style={styles.button}>SIGN IN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #f0f0f0 50%, #b0a08f 50%)',
  },
  container: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    height: '100vh',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  leftSection: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  rightSection: {
    background: 'linear-gradient(to bottom, #e5dcc9, #b0a08f)',
    padding: '40px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontFamily: 'Georgia, serif',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  link: {
    alignSelf: 'flex-end',
    fontSize: '0.9rem',
    color: '#fff',
    textDecoration: 'none',
    marginBottom: '20px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#6b4f35',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
    },
    rightSection: {
      width: '100%',
    },
    title: {
      fontSize: '1.8rem',
    },
    header: {
      fontSize: '1.8rem',
    },
  },
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
    },
    leftSection: {
      display: 'none',
    },
    rightSection: {
      padding: '20px',
    },
    title: {
      fontSize: '1.5rem',
    },
    header: {
      fontSize: '1.5rem',
    },
    button: {
      padding: '8px',
      fontSize: '0.9rem',
    },
  },
  '@media (max-width: 480px)': {
    container: {
      boxShadow: 'none',
    },
    rightSection: {
      padding: '20px',
    },
    title: {
      fontSize: '1.2rem',
    },
    header: {
      fontSize: '1.2rem',
    },
    input: {
      padding: '8px',
      fontSize: '0.9rem',
    },
    button: {
      padding: '8px',
      fontSize: '0.9rem',
    },
  },
};

export default SignIn;