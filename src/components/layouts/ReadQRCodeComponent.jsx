// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
//   PermissionsAndroid,
//   Linking,
// } from 'react-native';
// // import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import {useFocusEffect} from '@react-navigation/native';
// import {BackButtonCircle} from '../common/BackButtonComponent';
// import SearchingPopupComponent from './SearchingPopupComponent';

// const ReadQRCodeComponent = ({navigation}) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isPermissionLoading, setIsPermissionLoading] = useState(true);
//   const [readyForCamera, setReadyForCamera] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const devices = useCameraDevices();
//   const device = devices[0];

//   const checkPermission = async () => {
//     if (Platform.OS === 'android') {
//       const status = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );
//       setHasPermission(status);
//     } else {
//       const status = await Camera.getCameraPermissionStatus();
//       setHasPermission(status === 'authorized');
//     }
//   };

//   const requestPermission = async () => {
//     if (Platform.OS === 'android') {
//       const res = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );
//       setHasPermission(res === PermissionsAndroid.RESULTS.GRANTED);
//       return res === PermissionsAndroid.RESULTS.GRANTED;
//     } else {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//       return status === 'authorized';
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       await checkPermission();
//       setIsPermissionLoading(false);
//     })();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       checkPermission();
//     }, []),
//   );

//   useEffect(() => {
//     if (hasPermission) {
//       const t = setTimeout(() => {
//         setReadyForCamera(true);
//       }, 200);
//       return () => clearTimeout(t);
//     } else {
//       setReadyForCamera(false);
//     }
//   }, [hasPermission, device]);

//   if (isPermissionLoading) {
//     return (
//       <View style={styles.centered}>
//         <Text>Checking camera permission...</Text>
//       </View>
//     );
//   }

//   if (!hasPermission) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{marginBottom: 10}}>Camera permission not granted.</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={async () => {
//             setIsPermissionLoading(true);
//             const granted = await requestPermission();
//             setIsPermissionLoading(false);
//             if (!granted) {
//               Alert.alert(
//                 'Permission Denied',
//                 'Enable camera permission in Settings',
//                 [
//                   {text: 'OK'},
//                   {
//                     text: 'Open Settings',
//                     onPress: () => Linking.openSettings(),
//                   },
//                 ],
//               );
//             }
//           }}>
//           <Text style={styles.retryText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!readyForCamera) {
//     return (
//       <View style={styles.centered}>
//         <Text>Preparing camera...</Text>
//       </View>
//     );
//   }

//   if (!device) {
//     return (
//       <View style={styles.centered}>
//         <Text>No camera device found.</Text>
//       </View>
//     );
//   }

//   const handleProceed = () => {
//     setShowPopup(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         photo={false}
//         video={false}
//       />
//       <View style={styles.overlay}>
//         <BackButtonCircle onPress={() => navigation.goBack()} />

//         <View style={styles.bottomPanel}>
//           <Text style={styles.scanHint}>Camera ready!</Text>
//           <TouchableOpacity
//             style={styles.proceedButton}
//             onPress={handleProceed}>
//             <Text style={styles.proceedText}>Proceed</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {showPopup && (
//         <SearchingPopupComponent
//           visible={showPopup}
//           onComplete={() => {
//             navigation.navigate('ChooseLocation', {
//               driverView: true,
//               isDirect: true,
//             });
//             setShowPopup(false);
//           }}
//           onCancel={() => setShowPopup(false)}
//         />
//       )}
//     </View>
//   );
// };

// export default ReadQRCodeComponent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   retryButton: {
//     backgroundColor: '#6538B5',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 6,
//   },
//   retryText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'space-between',
//   },
//   bottomPanel: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 16,
//     alignItems: 'center',
//   },
//   scanHint: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   proceedButton: {
//     backgroundColor: '#6538B5',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   proceedText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
