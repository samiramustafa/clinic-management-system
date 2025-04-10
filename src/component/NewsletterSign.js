import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSign = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/newsletter/signup/', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newsletter-signup">
      <h3>Subscribe to Our Newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <div className="newsletter-message">{message}</div>}
    </div>
  );
};

export default NewsletterSign;