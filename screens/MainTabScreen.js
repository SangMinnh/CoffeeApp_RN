import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

import { useTheme, Avatar, Badge } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import CartScreen from './CartScreen';


const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const BillsStack = createStackNavigator();
const AllFoodsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#FFD200',
        inactiveTintColor: '#FFD200',

        // activeBackgroundColor: 'tomato',
        // inactiveBackgroundColor: 'white',
        showLabel: false,
        labelStyle:
        {
          fontSize: 10
        },
        safeAreaInsets:
        {
          bottom: 10,

        }

      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          showLabel: false,
          tabBarColor: '#FF6347',
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
          tabBarIcon: ({ color }) => (
            <Icon name='ios-add-circle-outline' color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillsStackScreen}
        options={{
          tabBarLabel: 'Bills',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name='ios-document' color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name='ios-person' color={color} size={28} />
          ),
        }}
      />

    </Tab.Navigator>)
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
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              marginRight: 10,

            }}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => { }}
              />
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://api.adorable.io/avatars/80/abott@adorable.png',
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
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



const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',

      },
    }}>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        title: 'Notifications',
        headerTitleAlign: 'center',
        headerLeft: () => (

          <TouchableOpacity style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}>
            <Icon
              name="ios-menu"
              size={40}
              backgroundColor="#1f65ff"
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>



        ),
      }}
    />
  </NotificationStack.Navigator>
);

const AllFoodsStackScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
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
            <TouchableOpacity Badge={5} onPress={() => navigation.navigate('CartScreen')} style={{
              paddingRight: 25,
              flexDirection: 'row',

            }}>


              <Fontisto
                name="shopping-bag"
                size={30}
                color={colors.backgroundWhite}
                backgroundColor={colors.background}

              />

              <Badge visible={true} style={{ marginLeft: -8, marginBottom: 15 }} size={16}>2</Badge>


            </TouchableOpacity>

          ),
        }}
      />
      <AllFoodsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerStyle: {
            backgroundColor: '#ffa800',
            shadowColor: '#ffa800', // iOS
            elevation: 0, // Android
          },
          title: 'Cart',
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
                name="ios-arrow-back"
                size={40}
                color={colors.backgroundWhite}

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
        options={{
          headerStyle: {
            backgroundColor: '#d02860',
            shadowColor: '#d02860', // iOS
            elevation: 0, // Android
          },
          title: 'All Bill',
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
        }} />


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
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
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
