import React from 'react';
import {
  View,
  Text,
  Pressable,
  // StyleProp,
  // ViewStyle,
  ActivityIndicator,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  styles: any;
  isSubmiting: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  styles,
  isSubmiting,
}: CustomButtonProps) => {
  return (
    <View>
      <Pressable style={styles.button} onPress={handlePress}>
        {isSubmiting ? (
          <Text style={styles.buttonText}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color="#ffffff" />
        )}
      </Pressable>
    </View>
  );
};

export default CustomButton;
