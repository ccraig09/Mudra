import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
// import SectionScreen from "../screens/SectionScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import PromoDetailScreen from "../screens/PromoDetailScreen";
// import EditProfileScreen from "../screens/EditProfileScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// import EditEvalScreen from "../screens/EditEvalScreen";
// import EvalScreen from "../screens/EvalScreen";
// import InformationScreen from "../screens/InformationScreen";
import Colors from "../constants/Colors";
// import QrScreen from "../screens/QrScreen";
// import OnboardingScreen from "../screens/OnboardingScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailsScreen from "../screens/DetailsScreen";
// import VideoScreen from "../screens/VideoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

let routeName;
const AppStack = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem("alreadyLaunched").then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem("alreadyLaunched", "true"); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  // } else if (isFirstLaunch == true) {
  //   routeName = "Onboarding";
  // } else {
  //   routeName = "Home";
  // }
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalMall"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="local-mall" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.white,
                borderColor: Colors.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}
            >
              <Icon name="search" color={Colors.primary} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="favorite" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "",
        headerShown: false,
      })}
    />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

// const ProfileStackScreen = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={({ navigation }) => ({
//         title: "",
//         headerShown: false,
//       })}
//     />
//     <Stack.Screen
//       name="Edit"
//       component={EditProfileScreen}
//       options={{
//         title: "Editar Perfil",
//       }}
//     />
//     <Stack.Screen
//       name="Eval"
//       component={EvalScreen}
//       options={{
//         title: "Evaluacion",
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="Edit Eval"
//       component={EditEvalScreen}
//       options={{
//         title: "Editar Evaluacion",
//         headerShown: true,
//       }}
//     />
//   </Stack.Navigator>
// );
// const InformationStack = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Information"
//       component={InformationScreen}
//       options={({ navigation }) => ({
//         title: "Informacion",
//         headerShown: true,
//       })}
//     />
//     <Stack.Screen
//       name="PromoDetail"
//       component={PromoDetailScreen}
//       options={({ navigation }) => ({
//         title: "Detalles",
//         headerShown: true,
//       })}
//     />
//   </Stack.Navigator>
// );

export default AppStack;
