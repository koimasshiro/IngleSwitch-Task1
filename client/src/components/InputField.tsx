import React from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';

interface InputFieldProps {
  placeholder: string;
  inputType: string;
  keyboardType: KeyboardTypeOptions | undefined;
  style: StyleProp<ViewStyle>;
  onChangeText: (e: string) => void;
}

const InputField = ({
  placeholder,
  inputType,
  keyboardType,
  style,
  onChangeText,
}: InputFieldProps) => {
  return (
    <View>
      {inputType === 'password' ? (
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={style}
          secureTextEntry={true}
          onChangeText={onChangeText}
          placeholderTextColor="white"
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={style}
          onChangeText={onChangeText}
          placeholderTextColor="white"
        />
      )}
    </View>
  );
};

export default InputField;
