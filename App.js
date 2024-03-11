import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import AddNotePage from "./screens/AddNotePage";
import UpdatePage from "./screens/UpdatePage";
import { COLORS, SIZES } from "./constants/theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./constants/firebase_config";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const IntialStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: `${COLORS.gold}`,
        tabBarInactiveTintColor: `${COLORS.white}`,
        tabBarLabelStyle: { fontSize: SIZES.medium },
        tabBarStyle: { backgroundColor: COLORS.bg , paddingVertical:5},
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={SIZES.xLarge}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={SIZES.xLarge} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={SIZES.xLarge}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="AddNotePage"
        component={AddNotePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatePage"
        component={UpdatePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export function App() {
  const [userAuth, setUserAuth] = useState(null);

  if (userAuth == null) {
    SplashScreen.preventAutoHideAsync();
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    user ? setUserAuth(true) : setUserAuth(false);
    SplashScreen.hideAsync();
  });

  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  if (!fontLoaded) return null;

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        {userAuth ? <MainStack /> : <IntialStack />}
      </NavigationContainer>
    </>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
