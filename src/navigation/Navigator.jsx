import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrincipalLogin from '../screens/LoginSignUp/PrincipalLogin';
import Login from '../screens/LoginSignUp/Login';
import Password from '../screens/Password';
import CodeVerification from '../screens/Dashboard/CodeVerification';
import PushNotificationsLogin from '../screens/LoginSignUp/PushNotificationsLogin';
import DriverCode from '../screens/DriverCode';
import TermsAndConditions from '../screens/Dashboard/TermsAndConditions';
import Home from '../screens/Home/Home';
import BirdCoinPage from '../screens/Home/BirdCoinPage';
import DrawerNavigator from './DrawerNavigator';
import HomeComponent from '../components/layouts/HomeComponent';
import Notifications from '../screens/Notifications';
import BirdCoinInfo from '../screens/BirdCoinInfo';
import ChooseLocation from '../screens/Journey/ChooseLocation';
import SelectCategory1 from '../screens/Journey/SelectCategory1';
import AddWalletDetails from '../screens/Dashboard/AddWalletDetails';
import AddCardDetails from '../screens/Dashboard/AddCardDetails';
import DriverProfile from '../screens/Dashboard/DriverProfile';
import SignUp from '../screens/LoginSignUp/SignUp';
import CreateAccount from '../screens/CreateAccount';
import SplashScreen from '../screens/LoginSignUp/SplashScreen';
import EndOfTheTripComponent from '../components/layouts/EndOfTheTripComponent';
import InsideCarComponent from '../components/layouts/InsideCarComponent';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/Dashboard/ChatScreen';
import Settings from '../screens/Dashboard/Settings';
import Reports from '../screens/Dashboard/Reports';
import Video from '../screens/Dashboard/Video';
import Alert from '../screens/Alert';
import BirdCoinMetrics from '../screens/Home/BirdCoinMetrics';
import RaceHistory from '../screens/Dashboard/RaceHistory';
import RaceHistoryCompleteComponent from '../components/layouts/RaceHistoryCompleteComponent';
import SignUpSwitch from '../screens/LoginSignUp/SignUpSwitch';
import TurnOnLocation from '../screens/TurnOnLocation';
// import ReadQRCodeComponent from '../components/layouts/ReadQRCodeComponent';
const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {/* > */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PrincipalLogin" component={PrincipalLogin} />
        <Stack.Screen name="CodeVerification" component={CodeVerification} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="DriverCode" component={DriverCode} />
        <Stack.Screen name="BirdCoinPage" component={BirdCoinPage} />
        <Stack.Screen name="BirdCoinInfo" component={BirdCoinInfo} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        <Stack.Screen name="AddWalletDetails" component={AddWalletDetails} />
        <Stack.Screen name="AddCardDetails" component={AddCardDetails} />
        <Stack.Screen name="DriverProfile" component={DriverProfile} />
        <Stack.Screen name="SelectCategory1" component={SelectCategory1} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="BirdCoinMetrics" component={BirdCoinMetrics} />
        <Stack.Screen name="SignUpSwitch" component={SignUpSwitch} />
        <Stack.Screen name="TurnOnLocation" component={TurnOnLocation} />
        {/* <Stack.Screen
          name="ReadQRCodeComponent"
          component={ReadQRCodeComponent}
        /> */}

        <Stack.Screen
          name="InsideCarComponent"
          component={InsideCarComponent}
        />
        <Stack.Screen
          name="RaceHistoryCompleteComponent"
          component={RaceHistoryCompleteComponent}
        />
        <Stack.Screen name="RaceHistory" component={RaceHistory} />
        <Stack.Screen
          name="EndOfTheTripComponent"
          component={EndOfTheTripComponent}
        />

        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen
          name="PushNotificationsLogin"
          component={PushNotificationsLogin}
        />
        <Stack.Screen name="HomeComponent" component={HomeComponent} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Alert" component={Alert} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
