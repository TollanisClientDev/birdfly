import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeComponent from '../components/layouts/HomeComponent';
import UserDrawerComponent from '../components/layouts/UserDrawerComponent';
import DriverOnTheWayComponent from '../components/layouts/DriverOnTheWayComponent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // We will use our own header in the stack or the custom header
      }}
      drawerContent={props => <UserDrawerComponent {...props} />}>
      {/* 
          You can either place the RootStack as one Drawer screen or separate screens. 
          For demonstration, we do a single "Main" entry that leads to the full Stack.
        */}
      <Drawer.Screen name="HomeComponent" component={HomeComponent} />
      {/* 
           If you want separate direct drawer items, you can add them here, e.g.:
           <Drawer.Screen name="Home" component={Home} />
           <Drawer.Screen name="SomeOtherScreen" component={SomeOtherScreen} />
        */}
    </Drawer.Navigator>
  );
}
