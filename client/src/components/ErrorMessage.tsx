import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type ErrorMessageProps = {
  errorValue: string | undefined;
};

const ErrorMessage = ({errorValue}: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
  errorText: {
    color: 'red',
  },
});

export default ErrorMessage;
