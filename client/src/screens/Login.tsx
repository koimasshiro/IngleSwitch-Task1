import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
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
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
          <Image
            style={{width: 40, height: 40}}
            source={require('./logo.png')}
          />
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => handleLogin({...values})}>
          {({handleChange, handleSubmit, errors}) => (
            <View>
              <InputField
                placeholder={'Email'}
                keyboardType="email-address"
                inputType={''}
                style={styles.input}
                onChangeText={handleChange('email')}
              />
              {errors && <ErrorMessage errorValue={errors.email} />}
              <InputField
                placeholder={'Password'}
                inputType="password"
                keyboardType={undefined}
                style={styles.input}
                onChangeText={handleChange('password')}
              />
              {errors && <ErrorMessage errorValue={errors.password} />}
              <View style={styles.rememberWrapper}>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#222A48"
                  text="Remember me ?"
                  iconStyle={{borderColor: '#FFFFFF'}}
                  innerIconStyle={{borderWidth: 1, borderRadius: 0}}
                  textStyle={{
                    fontFamily: 'Inyika',
                    color: '#ffffff',
                  }}
                  onPress={(isChecked: boolean) => {
                    console.log(isChecked);
                  }}
                  style={styles.remember}
                />
                <Text style={styles.loginText}>Forgot Password?</Text>
              </View>
              <CustomButton
                title={'Login'}
                styles={styles}
                handlePress={() => handleSubmit()}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#222A48',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'Inyika',
    marginBottom: 30,
  },
  input: {
    borderColor: '#EB3E3E',
    borderWidth: 1,
    borderRadius: 21,
    backgroundColor: '#222A48',
    paddingVertical: 0,
    fontSize: 15,
    fontWeight: '700',
    height: 60,
    margin: 12,
    padding: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 220,
    marginTop: 200,
  },
  policyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inyika',
  },
  loginText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EB3E3E',
    fontFamily: 'Inyika',
  },
  button: {
    padding: 10,
    backgroundColor: '#EB3E3E',
    margin: 12,
    borderRadius: 21,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inyika',
    textAlign: 'center',
  },
  remember: {
    // marginTop: 10,
    // marginBottom: 30,
  },
  rememberWrapper: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default Login;
