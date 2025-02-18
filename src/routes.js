import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from './pages/home'
import { Ionicons } from "@expo/vector-icons";
import { AdicionarConta} from "./pages/adicionarConta"
import { contasFuturas} from "./pages/contasFuturas"

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="adicionarConta"
                component={AdicionarConta}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ( {focused, size, color}) => {
                        if(focused) {
                            return <Ionicons size={size} color={'#006E90'} name="add-circle" />
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
                    tabBarIcon: ( {focused, size, color}) => {
                        if(focused) {
                            return <Ionicons size={size} color={'#006E90'} name="list-circle" />
                        }

                        return <Ionicons size={size} color={color} name="list-circle-outline" />
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen
                name="contasFuturas"
                component={contasFuturas}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ( {focused, size, color}) => {
                        if(focused) {
                            return <Ionicons size={size} color={'#006E90'} name="calendar-number" />
                        }

                        return <Ionicons size={size} color={color} name="calendar-number-outline" />
                    }
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}