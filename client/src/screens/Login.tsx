import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {View, Text, Pressable, StyleSheet, Image, Alert} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../components/Button';
import InputField from '../components/InputField';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorMessage from '../components/ErrorMessage';
import * as api from '../services/authService';
import {LoginPayload} from '../utils/types';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required().label('Email Address'),
  password: yup.string().required().label('Password'),
});

const Login = ({navigation}: LoginScreenProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (payload: LoginPayload) => {
    setIsSubmitting(true);

    try {
      let response = await api.authService.signIn(payload);
      setIsSubmitting(false);
      Alert.alert(
        'Registration Successful',
        response.email,
        [{text: 'OK', onPress: () => navigation.navigate('Home')}],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert('Alert Title', error, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setIsSubmitting(false);
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
        <Image
          style={{width: 100, height: 100}}
          source={require('./logoutIcon.svg')}
        />
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => handleLogin({...values})}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <InputField
              label={'Email'}
              keyboardType="email-address"
              inputType={''}
              style={styles.input}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <ErrorMessage errorValue={errors.email} />
            <InputField
              label={'Password'}
              inputType="password"
              keyboardType={undefined}
              style={styles.input}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <ErrorMessage errorValue={errors.password} />
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="#222A48"
              text="Remember me ?"
              iconStyle={{borderColor: '#FFFFFF'}}
              innerIconStyle={{borderWidth: 1}}
              textStyle={{
                fontFamily: 'Inyika',
                color: '#ffffff',
              }}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
              }}
            />
            <CustomButton
              title={'Login'}
              styles={styles}
              handlePress={() => handleSubmit}
              isSubmiting={isSubmitting}
            />
          </View>
        )}
      </Formik>
      <View style={styles.policy}>
        <Text style={styles.policyText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginText}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#222A48',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'Inyika',
  },
  input: {
    flex: 1,
    border: '1px solid #EB3E3E',
    borderRadius: 21,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  policy: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  policyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inyika',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EB3E3E',
    fontFamily: 'Inyika',
  },
  button: {
    padding: 10,
    backgroundColor: '#EB3E3E',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inyika',
    textAlign: 'center',
  },
});

export default Login;
