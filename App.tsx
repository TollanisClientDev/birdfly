import Navigator from './src/navigation/Navigator';
import 'react-native-get-random-values';
const App = () => {
  if (__DEV__) {
    require('./src/logging/ReactotronConfig');
  }
  return <Navigator />;
};

export default App;
