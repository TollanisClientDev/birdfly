import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="arrow-left" size={20} color="#000" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
};

/**
 * A floating circular back button (used for minimal UI with icon only).
 *
 * Props:
 * - backgroundColor: string (default: '#D9D9D9')
 * - iconColor: string (default: '#3F35CE')
 * - size: number (diameter of button)
 * - iconSize: number (size of icon)
 * - onPress: function
 * - style: additional style override
 */
export const BackButtonCircle = ({
  backgroundColor = '#D9D9D9',
  iconColor = '#3F35CE',
  size = 40,
  iconSize = 24,
  onPress,
  style,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.buttonCircle,
          {
            backgroundColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  buttonCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});
