import React from 'react';
import {View, Text, Pressable, StyleProp, ViewStyle} from 'react-native';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  styles: StyleProp<ViewStyle>;
}

const CustomButton = ({title, handlePress, styles}: CustomButtonProps) => {
  return (
    <View style={styles}>
      <Pressable onPress={handlePress}>
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;
