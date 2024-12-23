
import React from 'react';
export default function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Oops! Something Went Wrong !!! is your server listening on ?: http://localhost:5173/</h1>
      <p style={styles.message}>We are experiencing technical issues. Please try again later.</p>
      <p style={styles.suggestion}>If the issue persists, contact support: pranabhazra875@gmail.com </p>
    </div>
  );
};

// Inline styles for the error page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  suggestion: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#155724',
  },
};

