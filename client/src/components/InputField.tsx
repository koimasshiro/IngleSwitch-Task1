import React from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  inputType: string;
  keyboardType: KeyboardTypeOptions | undefined;
  style: StyleProp<ViewStyle>;
  onChangeText: (e: string) => void;
}

const InputField = ({
  label,
  inputType,
  keyboardType,
  style,
  onChangeText,
  value,
}: InputFieldProps) => {
  return (
    <View style={style}>
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={style}
          secureTextEntry={true}
          onChangeText={onChangeText}
          value={value}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={style}
          onChangeText={onChangeText}
        />
      )}
    </View>
  );
};

export default InputField;
