import { useState } from 'react';

export default function Rsvp() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }

    try {
      setStatus('loading');
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to RSVP');
      }

      setStatus('success');
      setEmail('');
      setErrorMessage('');
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="email-signup">
      
      {status === 'success' ? (
        <div className="success-message">
          Thanks for RSVPing!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="RSVP with email"
              aria-label="Email address"
              required
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'RSVPing...' : 'RSVP'}
            </button>
          </div>
          {status === 'error' && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
        </form>
      )}
    </div>
  );
}