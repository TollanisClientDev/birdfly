import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButtonWithHeader from '../common/BackButtonWithHeader';

const {width} = Dimensions.get('window');

const ReportsComponent = ({navigation}) => {
  const [otherText, setOtherText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    {
      title: 'Problems with Driver:',
      data: [
        'Drove in a dangerous manner',
        'Requested payment outside the app',
        'Harassment or inappropriate behavior',
        'Rude or disrespectful attitude',
      ],
    },
    {
      title: 'Related Stories to the trip',
      data: [
        'I forgot an item in the car',
        'The driver did not show up',
        'The race was canceled without reason',
        'Incorrect billing',
        'Incorrect route or suspicious detour',
        'The waiting time is very long.',
        'Different car from the one reported.',
      ],
    },
    {
      title: 'Others',
      data: [
        'Suggestion for improvement',
        'Feedback on a Trip',
        'Report a bug.',
      ],
      includeTextInput: true,
    },
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    data: section.data.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }));

  const handleItemPress = item => {
    console.log('Pressed:', item);
    // Implement action or toggle logic
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BackButtonWithHeader
          Heading="Reports"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.circleContainer}>
          <Image
            source={require('../../assets/images/reporticon.png')}
            style={styles.reportIcon}
          />
        </View>

        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={18}
            color="#ccc"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ccc"
            style={{flex: 1}}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredSections.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.data.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.item}
                onPress={() => handleItemPress(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}

            {section.includeTextInput && (
              <>
                <Text
                  style={[styles.itemText, {marginTop: 10, marginBottom: 10}]}>
                  Other
                </Text>
                <TextInput
                  placeholder="Type here…"
                  value={otherText}
                  onChangeText={setOtherText}
                  style={styles.otherInput}
                  placeholderTextColor="#aaa"
                />
              </>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => console.log('Submit pressed')}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReportsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f3ff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  circleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  reportIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f2efff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e0d9ff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    color: '#555',
    fontSize: 14,
  },
  otherInput: {
    backgroundColor: '#fdfcff',
    borderColor: '#e0d9ff',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#6538B5',
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    width: width * 0.4,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
