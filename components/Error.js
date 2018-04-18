import {Alert} from 'react-native';

export const Error = ({retry, error}) => {
  Alert.alert('🤷‍♂️', error, [{text: 'Retry', onPress: retry}]);
  return null;
};
