import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Places from './components/Places';
import Plans from './components/Plans';
import Slider from './components/Slider';



App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={{ width: '100%', height: '100%', alignSelf: 'center', }}>
        {/* <Places /> */}
        <Slider />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

});

export default App;
