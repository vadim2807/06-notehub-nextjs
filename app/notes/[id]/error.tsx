'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderRadius: '4px',
      margin: '20px'
    }}>
      <p>Could not fetch note details. {error.message}</p>
      <button 
        onClick={reset}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}
