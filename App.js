// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "./components/landing";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard";
import Transactions from "./components/transactions";
import TransactionDetails from "./components/transactionDetails";
import Profile from "./components/profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Transactions: "bank",
            Profile: "account",
          };
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={size}
            />
          );
        },
        // headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Transactions":
      return "Transactions";
    case "Profile":
      return "Profile";
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={HomeStackScreen}
          // options={{
          //   headerBackVisible: false,
          //   headerShown: false,
          // }}
          options={({ route }) => ({
            headerBackVisible: false,
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name="transactionDetails"
          component={TransactionDetails}
          options={{
            headerTitle: "Transactions Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
