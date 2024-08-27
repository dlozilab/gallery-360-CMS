import React from 'react';

const SignIn = () => {
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
      flexDirection: 'row',
      width: '100%',
      maxWidth: '1200px',
      height: '100vh',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
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
      width: '100vh',  // Make sure it takes the full width
    },
    h1: {
      fontSize: '2rem',
      color: '#333',
    },
    formContainer: {
      width: '100vh',
      height: '100vh',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    h2: {
      fontSize: '2rem',
      marginBottom: '20px',
      fontFamily: 'Georgia, serif',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100vh',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    a: {
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
    // Media queries
    '@media (max-width: 1024px)': {
      container: {
        flexDirection: 'column',
        width: '100%',
      },
      rightSection: {
        height: '100vh',
        width: '100%',
      },
      h1: {
        fontSize: '1.8rem',
      },
      h2: {
        fontSize: '1.8rem',
      },
    },
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        width: '100%',
      },
      leftSection: {
        display: 'none', // Hide the left section on smaller screens
      },
      rightSection: {
        height: '100vh',
        width: '100%',
        padding: '20px',  // Adjust padding for better fit
      },
      h1: {
        fontSize: '1.5rem',
      },
      h2: {
        fontSize: '1.5rem',
      },
      button: {
        padding: '8px',
        fontSize: '0.9rem',
      },
    },
    '@media (max-width: 480px)': {
      container: {
        width: '100%',
        boxShadow: 'none',
      },
      rightSection: {
        padding: '20px',
        width: '100%',
        height: '100vh',
      },
      h1: {
        fontSize: '1.2rem',
      },
      h2: {
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

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={{ ...styles.section, ...styles.leftSection }}>
          <img src="./assets/Gallery-360-cms.jpg" alt="" style={styles.graphic} />
          <h1 style={styles.h1}>Gallery 360 Africa</h1>
        </div>
        <div style={{ ...styles.section, ...styles.rightSection }}>
          <div style={styles.formContainer}>
            <h2 style={styles.h2}>Sign In</h2>
            <form style={styles.form}>
              <input type="email" placeholder="Email" required style={styles.input} />
              <input type="password" placeholder="Password" required style={styles.input} />
              <a href="#" style={styles.a}>Forgot password?</a>
              <button type="submit" style={styles.button}>SIGN IN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
