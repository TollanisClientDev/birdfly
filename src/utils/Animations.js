import { View, Text, Dimensions, Easing } from 'react-native'



const Animations = () => {
const {width, height} = Dimensions.get("window");
centerHeight = height / 2;
centerWidth = width / 2;
const translateX = useRef(new Animated.value(-100)).current;
 useEffect(() => {

    Animated.timing(translateX, {
        toValue : centerWidth - 50,
        duration : 1000,
        easing : Easing.linear,
        useNativeDriver : true
    }).start();
 }, []);
}