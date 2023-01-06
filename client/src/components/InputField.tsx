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
  icon: string;
  inputType: string;
  keyboardType: KeyboardTypeOptions | undefined;
  style: StyleProp<ViewStyle>;
}

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  style,
}: InputFieldProps) => {
  return (
    <View style={style}>
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={style}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={style}
        />
      )}
    </View>
  );
};

export default InputField;
