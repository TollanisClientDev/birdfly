import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {BackButtonCircle} from './BackButtonComponent';

/**
 * A header component that displays a back button and a title on the same row.
 * Props:
 * - Heading: string (title to display)
 * - onBackPress: () => void (handler for back button)
 */
const BackButtonWithHeader = ({Heading = 'Heading', onBackPress}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <BackButtonCircle onPress={onBackPress} />
        <Text style={styles.headingText} numberOfLines={1} ellipsizeMode="tail">
          {Heading}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headingText: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    color: '#3F35CE',
    fontWeight: '600',
  },
  placeholder: {
    width: 40, // matches BackButtonCircle size for symmetry
  },
});

export default BackButtonWithHeader;
