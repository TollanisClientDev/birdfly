import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import BirdCoinMetricsComponent from '../../components/layouts/BirdCoinMetricsComponent';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const commissionData = {
  affiliates: 50,
  stats: [
    {
      label: 'Weekly',
      values: [30, 26, 34, 28],
      status: '-2%',
      statusColor: 'red',
      barColor: '#B8E3E9',
    },
    {
      label: 'monthly',
      values: [130, 150, 139, 149],
      status: '+5%',
      statusColor: 'green',
      barColor: '#93B1B5',
    },
    {
      label: 'yearly',
      values: [1000, 1300, 1240, 1290],
      status: null,
      statusColor: 'null',
      barColor: '#4F7C82',
    },
  ],
};
const BirdCoinMetrics = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <BirdCoinMetricsComponent
        commissionData={commissionData}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(4),
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
});
export default BirdCoinMetrics;
