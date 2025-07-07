import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackButtonWithHeader from '../common/BackButtonWithHeader';

const {width, height} = Dimensions.get('window');

const VideoComponent = ({navigation}) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);

  const togglePlayPause = () => {
    setPaused(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        ref={videoRef}
        source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
        style={styles.backgroundVideo}
        resizeMode="cover"
        paused={paused}
        repeat
      />

      {/* Header */}
      <BackButtonWithHeader
        Heading="Videos"
        onBackPress={() => navigation.goBack()}
      />

      {/* Play Button */}
      {paused && (
        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Icon name="play-circle" size={64} color="rgba(255,255,255,0.85)" />
        </TouchableOpacity>
      )}

      {/* Right Sidebar */}
      <View style={styles.rightBar}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="heart-o" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="share" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomBar}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <FontAwesome name="twitter" size={20} color="#fff" />
          </View>
          <Text style={styles.username}>@Birdtrip</Text>
        </View>
        <Text style={styles.caption}>
          Learn how to make an even better trip 🚗😎
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  playButton: {
    position: 'absolute',
    top: height / 2 - 32,
    left: width / 2 - 32,
  },
  rightBar: {
    position: 'absolute',
    right: 16,
    top: height / 2 + 160,
    alignItems: 'center',
  },
  iconButton: {
    marginVertical: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    backgroundColor: '#3b49df',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
});

export default VideoComponent;
