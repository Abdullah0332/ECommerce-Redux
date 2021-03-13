import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Routes from './Routes';

import { loadUser } from './actions/userActions';
import store from './store';

export default function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('http://localhost:5000/api/v1/stripeapi', {
        withCredentials: true
      });
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
    <div>
      <Routes stripeApiKey={stripeApiKey} />
    </div>
  )
}
