import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Routes} from '../src/routes'
import { useBillsStore } from '@/src/store/billsStore';
import { useEffect } from 'react';

export default function App() {
  const { loadBills } = useBillsStore();
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  useEffect(() => {
    loadBills();
  },[]);

  return (
    <Routes />
  );
}
