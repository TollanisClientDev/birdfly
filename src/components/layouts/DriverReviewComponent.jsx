import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BackButtonCircle} from '../common/BackButtonComponent';

const DriverReviewComponent = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = index => {
    setRating(index);
  };

  const TipButton = ({percentage}) => (
    <TouchableOpacity style={styles.tipButton}>
      <Text style={styles.tipButtonText}>{percentage}%</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackButtonCircle onPress={() => navigation.goBack()} />

      <Text style={styles.thankYouText}>
        Thank you for traveling with Bird Trip!
      </Text>

      {/* Driver Info */}
      <View style={styles.driverInfoContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/50'}}
          style={styles.driverImage}
        />
        <View>
          <Text style={styles.driverName}>Steven Smith</Text>
          <Text style={styles.carInfo}>Toyota Corolla - Blue</Text>
        </View>
        <Icon name="heart" size={24} color="red" style={styles.heartIcon} />
      </View>

      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(index => (
          <TouchableOpacity key={index} onPress={() => handleRating(index)}>
            <AntDesign
              name={index <= rating ? 'star' : 'staro'}
              size={32}
              color="#3E35CE"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Box */}
      <View style={styles.commentBoxContainer}>
        <TextInput
          style={styles.commentBox}
          placeholder="Leave a special comment"
          value={comment}
          onChangeText={setComment}
          placeholderTextColor="gray"
        />
        <Icon
          name="chatbox-ellipses-outline"
          size={24}
          color="purple"
          style={styles.commentIcon}
        />
      </View>

      {/* Tip Options */}
      <Text style={styles.tipText}>To fly higher, tip Steven!</Text>
      <View style={styles.tipContainer}>
        <TipButton percentage={10} />
        <TipButton percentage={15} />
        <TipButton percentage={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  thankYouText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carInfo: {
    color: 'gray',
  },
  heartIcon: {
    marginLeft: 'auto',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  commentBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  commentBox: {
    flex: 1,
    height: 40,
    color: 'purple',
  },
  commentIcon: {
    marginLeft: 10,
  },
  tipText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#444',
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tipButton: {
    backgroundColor: '#6538B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tipButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DriverReviewComponent;
