import React, { useState, useContext } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import AllFoodsScreen from './AllFoodsScreen';
import AllBillsScreen from './AllBillsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import MapTestScreen from './MapTestScreen';
import EditProfileScreen from './EditProfileScreen';
import { Provider as CartProvider } from './FoodCartContext';
import { Provider as BillsProvider } from './AllBillsContext';
import { Provider as FoodProvider } from './AllFoodContext';
import BillDetailScreen from './BillDetailScreen';
import { Context as CartContext } from './FoodCartContext';
import { Context as FoodContext } from './AllFoodContext';
import { useTheme, Avatar, Badge } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import CartScreen from './CartScreen';

import { showMessage, hideMessage } from "react-native-flash-message";

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const BillsStack = createStackNavigator();
const AllFoodsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const { colors } = useTheme();
  return (
    <FoodProvider>
      <BillsProvider>
        <CartProvider>
          <Tab.Navigator initialRouteName="Home"
            //labeled={false}
            activeTintColor='#27dd06'
            inactiveTintColor='#FFD200'
          // tabBarOptions={{


          //   // activeBackgroundColor: 'tomato',
          //   // inactiveBackgroundColor: 'white',
          //   showLabel: false,
          //   labelStyle:
          //   {
          //     fontSize: 10
          //   },
          //   safeAreaInsets:
          //   {
          //     bottom: 10,

          //   },
          //   paddingBottom: 50


          // }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={{
                tabBarLabel: 'Home',
                showLabel: false,
                tabBarColor: '#FF6347',
                //tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                  <Icon name='ios-home' color={color} size={28} />
                ),
              }}
            />
            <Tab.Screen
              name="Notifications"
              component={NotificationStackScreen}
              options={{
                tabBarBadge: 16,
                tabBarLabel: 'Updates',
                tabBarColor: '#1f65ff',
                //tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                  <Icon name='ios-notifications' color={color} size={28} />
                ),
              }}
            />
            <Tab.Screen
              name="All Foods"
              component={AllFoodsStackScreen}
              showLabel={false}
              options={{
                tabBarLabel: 'New',
                tabBarColor: '#FFA800',
                //tabBarColor: '#fff',

                tabBarIcon: ({ color }) => (
                  // <View style={{
                  //   borderRadius: 50,
                  //   width: 42,
                  //   height: 42,
                  //   marginTop: -10,
                  //   backgroundColor: '#27dd06',
                  //   justifyContent: 'center'
                  // }}>

                  // </View>
                  <Icon style={{ alignSelf: 'center' }} name='ios-add-circle-outline' color={color} size={28} />
                ),
              }}
            />
            <Tab.Screen
              name="Bills"
              component={BillsStackScreen}
              options={{
                tabBarLabel: 'Bills',
                tabBarColor: '#d02860',
                //tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                  <Icon name='ios-document' color={color} size={28} />
                  //tabBarColor: '#d02860',
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#694fad',
                // tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                  <Icon name='ios-person' color={color} size={28} />
                ),
              }}
            />

          </Tab.Navigator >
        </CartProvider>
      </BillsProvider>
    </FoodProvider>)
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleStyle: {
            fontSize: 20
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
              marginLeft: 25
            }}>
              <Icon
                name="ios-menu"
                size={40}
                color={colors.text}
                backgroundColor={colors.backgroundWhite}

              />
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <View style={{
          //     flexDirection: 'row',
          //     marginRight: 10,

          //   }}>
          //     <Icon.Button
          //       name="ios-search"
          //       size={25}
          //       color={colors.text}
          //       backgroundColor={colors.background}
          //       onPress={() => { }}
          //     />
          //     <TouchableOpacity
          //       style={{ paddingHorizontal: 10, marginTop: 5 }}
          //       onPress={() => {
          //         navigation.navigate('Profile');
          //       }}>
          //       <Avatar.Image
          //         source={{
          //           uri:
          //             'https://api.adorable.io/avatars/80/abott@adorable.png',
          //         }}
          //         size={30}
          //       />
          //     </TouchableOpacity>
          //   </View>
          // ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </HomeStack.Navigator>
  );
};



const NotificationStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <NotificationStack.Navigator
      screenOptions={(route) => ({
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <NotificationStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          headerTitleStyle: {
            fontSize: 20,
            color: colors.text
          },
          headerTitleAlign: 'center',
          headerLeft: () => (

            <TouchableOpacity style={{ marginLeft: 25 }}
              onPress={() => navigation.openDrawer()}>
              <Icon
                name="ios-menu"
                size={40}
                color={colors.text}
                //backgroundColor="#1f65ff"
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>



          ),
        }}
      />
    </NotificationStack.Navigator>)
};

const AllFoodsStackScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { state } = useContext(CartContext);
  return (

    <AllFoodsStack.Navigator
      screenOptions={(route) => ({
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>

      <AllFoodsStack.Screen
        name="AllFoods"
        component={AllFoodsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#ffa800',
            shadowColor: '#ffa800', // iOS
            elevation: 0, // Android
          },
          title: 'All Foods',
          headerTitleStyle: {
            fontSize: 20,
            color: colors.backgroundWhite
          },
          headerTitleAlign: 'center',

          activeTintColor: '#ffffff',
          headerLeft: () => (
            <TouchableOpacity style={{
              marginLeft: 25,
              justifyContent: 'center'
            }}>
              <Icon
                name="ios-menu"
                size={40}
                color={colors.backgroundWhite}

                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>

          ),
          headerRight: () => (
            <TouchableOpacity Badge={5} onPress={() => {
              if (state.length)
                navigation.navigate('CartScreen')
              else showMessage({
                message: "Oops, Your Food Cart is Empty.",
                type: "info",
                icon: 'warning',

              });
            }}
              style={{
                paddingRight: 25,
                flexDirection: 'row',

              }}>


              <Fontisto
                name="shopping-bag"
                size={30}
                color={colors.backgroundWhite}
                backgroundColor={colors.background}

              />

              <Badge visible={state.length === 0 ? false : true} style={{ marginLeft: -8, marginBottom: 15, backgroundColor: 'red' }} size={16}>{state.length}</Badge>


            </TouchableOpacity>

          ),
        }}
      />
      <AllFoodsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.background, // iOS
            elevation: 0, // Android
          },
          title: 'Cart',
          headerTitleStyle: {
            fontSize: 20,
            color: colors.text
          },
          headerTitleAlign: 'center',
          activeTintColor: '#ffffff',
          headerLeft: () => (
            <TouchableOpacity style={{
              marginLeft: 15,
              padding: 10,
              justifyContent: 'center'
            }}>
              <Feather
                name="arrow-left"
                size={40}
                color={colors.text}

                onPress={() => navigation.navigate('AllFoods')}
              />
            </TouchableOpacity>

          ),
          // headerRight: () => (
          //   <TouchableOpacity Badge={5} onPress={() => navigation.openDrawer()} style={{
          //     paddingRight: 25,
          //     flexDirection: 'row',

          //   }}>

          //     <Fontisto
          //       name="shopping-bag"
          //       size={30}
          //       color={colors.backgroundWhite}
          //       backgroundColor={colors.background}

          //     />

          //     <Badge visible={true} style={{ marginLeft: -8, marginBottom: 15 }} size={16}>2</Badge>


          //   </TouchableOpacity>

          // ),
        }}
      />
    </AllFoodsStack.Navigator>
  )
};

const BillsStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <BillsStack.Navigator
      screenOptions={(route) => ({
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <BillsStack.Screen
        name="All Bills"
        component={AllBillsScreen}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.background, // iOS
            elevation: 0, // Android
          },
          title: 'All Bills',
          headerTitleStyle: {
            fontSize: 20,
            color: colors.text
          },
          headerTitleAlign: 'center',

          activeTintColor: '#ffffff',
          headerLeft: () => (
            <TouchableOpacity style={{
              marginLeft: 25,
              justifyContent: 'center'
            }}>
              <Icon
                name="ios-menu"
                size={40}
                color={colors.text}

                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>

          ),
        })} />
      <BillsStack.Screen
        name="BillDetailScreen"
        options={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: colors.background, // iOS
            elevation: 0, // Android

          },
          title: 'Bill Detail',
          headerTitleStyle: {
            fontSize: 20,
            color: colors.text
          },
          headerLeft: () => (
            <TouchableOpacity style={{
              marginLeft: 25,
              justifyContent: 'center'
            }}>
              <Feather
                name="arrow-left"
                size={40}
                color={colors.text}

                onPress={() => navigation.navigate('All Bills')}
              />
            </TouchableOpacity>

          ),
          headerTitleAlign: 'center',

          activeTintColor: '#ffffff',
        }}
        component={BillDetailScreen} />


    </BillsStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity style={{
              marginLeft: 25,
              justifyContent: 'center'
            }}>
              <Icon
                name="ios-menu"
                size={40}
                color={colors.text}

                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{
              marginRight: 25,
              justifyContent: 'center'
            }}>
              <MaterialCommunityIcons
                name="account-edit"
                size={32}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
