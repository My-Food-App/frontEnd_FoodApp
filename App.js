import React from 'react';
import {Navigation} from './src/navigation';
import {StripeProvider} from '@stripe/stripe-react-native';

const STRIPE_KEY =
  'pk_test_51N5BPXL7XepAWAoVrtA20yweZp80WpSLzlP0y70QFf3C7ZkZ1bT1VXIlOVehITu6drQydj7dKOKEoSOLd7HPhY0g003pgiNVT9';
const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <Navigation />
    </StripeProvider>
  );
};
export default App;
