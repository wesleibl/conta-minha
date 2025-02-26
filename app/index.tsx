import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Routes} from '../src/routes'
import { useBillsStore } from '@/src/store/billsStore';

export default function App() {
  const { loadBills } = useBillsStore();
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  loadBills();
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Routes />
  );
}
