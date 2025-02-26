import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from './pages/home'
import { Ionicons } from "@expo/vector-icons";
import { AdicionarConta } from "./pages/adicionar"
import { ContasFuturas } from "./pages/contasFuturas"

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: "#0E0D0D",
                elevation: 10,
                height: 50,
                alignItems: 'center', 
                justifyContent: 'center',
                paddingTop: 2
            }
        }}
    >
            <Tab.Screen
                name="adicionarConta"
                component={AdicionarConta}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ( {focused}) => {
                        let size = 30;
                        let color = '#FFCB47';
                        if(focused) {
                            return <Ionicons size={size} color={color} name="add-circle"/>
                        }

                        return <Ionicons size={size} color={color} name="add-circle-outline" />
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ( {focused}) => {
                        let size = 30;
                        let color = '#FFCB47';
                        if(focused) {
                            return <Ionicons size={size} color={color} name="list-circle" />
                        }

                        return <Ionicons size={size} color={color} name="list-circle-outline" />
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen
                name="contasFuturas"
                component={ContasFuturas}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ( {focused}) => {
                        let size = 28;
                        let color = '#FFCB47';

                        if(focused) {
                            return <Ionicons size={size} color={color} name="calendar-number" />
                        }

                        return <Ionicons size={size} color={color} name="calendar-number-outline" />
                    }
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}