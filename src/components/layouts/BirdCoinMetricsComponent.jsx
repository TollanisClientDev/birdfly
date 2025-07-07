import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {BackButtonCircle} from '../common/BackButtonComponent';

const BirdCoinMetricsComponent = ({commissionData, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>What is this screen?</Text>
            <Text style={styles.modalDescription}>
              This screen displays your weekly and monthly commissions,
              including detailed stats from your affiliate partnerships.
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.headerWrapper}>
        <BackButtonCircle
          onPress={() => navigation.goBack()}
          style={{marginTop: -5, marginLeft: -5}}
        />
        <View style={styles.titleRow}>
          <Text style={styles.title}>Commissions received:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Octicons
              name="question"
              size={responsiveFontSize(2.5)}
              color="#3F35CE"
              style={styles.questionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.subtitle}>Affiliate:</Text>
        <Text style={styles.partnerCount}>
          {commissionData.affiliates} partners
        </Text>
      </View>

      {commissionData.stats.map((stat, idx) => (
        <View key={idx} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartLabel, {backgroundColor: stat.barColor}]}>
              {stat.label}
            </Text>
            {stat.status && (
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      stat.statusColor === 'green' ? '#0D5C01' : '#B70000',
                  },
                ]}>
                <Icon
                  name={
                    stat.statusColor === 'green' ? 'caret-up' : 'caret-down'
                  }
                  size={responsiveFontSize(1.8)}
                  color={stat.statusColor === 'green' ? '#88FF76' : '#FF7676'}
                />
                <Text style={styles.statusText}>{stat.status}</Text>
              </View>
            )}
          </View>

          <BarChart
            style={{height: responsiveHeight(20)}}
            data={stat.values}
            svg={{fill: stat.barColor}}
            contentInset={{top: 10, bottom: 10}}
            spacingInner={0.4}>
            <Grid />
          </BarChart>

          <View style={styles.valuesRow}>
            {stat.values.map((v, i) => (
              <Text key={i} style={styles.valueText}>
                ${v}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(4),
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    marginBottom: responsiveHeight(1),
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: responsiveWidth(4),
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    color: '#333',
  },
  partnerCount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#4B32C3',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: responsiveWidth(4),
    borderRadius: 12,
    marginBottom: responsiveHeight(2),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
  },
  chartLabel: {
    fontSize: responsiveFontSize(1.8),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    color: '#fff',
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1),
  },
  valueText: {
    fontSize: responsiveFontSize(1.6),
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    fontSize: responsiveFontSize(1.6),
    marginLeft: 4,
    color: '#fff',
  },
  headerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    marginBottom: 12,
    color: '#3F35CE',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: responsiveFontSize(1.9),
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.9),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: responsiveWidth(-10),
    justifyContent: 'center',
  },
  questionIcon: {
    marginLeft: 6,
    marginTop: -4,
  },
});

export default BirdCoinMetricsComponent;
