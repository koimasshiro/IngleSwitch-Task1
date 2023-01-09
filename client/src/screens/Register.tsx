import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {View, Text, StyleSheet, Pressable, Image, Alert} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InputField from '../components/InputField';
import CustomButton from '../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ErrorMessage from '../components/ErrorMessage';
import * as api from '../services/authService';
import {SignInPayload} from '../utils/types';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().email('Invalid email').required().label('Email Address'),
  password: yup
    .string()
    .required()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .label('New PIN'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .label('Confirm Password'),
});

const Register = ({navigation}: RegisterScreenProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (payload: SignInPayload) => {
    setIsSubmitting(true);

    try {
      let response = await api.authService.register(payload);
      setIsSubmitting(false);
      Alert.alert(
        'Registration Successful',
        response.email,
        [{text: 'OK', onPress: () => navigation.navigate('Login')}],
        {cancelable: false},
      );
    } catch (error: any) {
      Alert.alert('Alert Title', error, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SignUp</Text>
        <Pressable onPress={() => console.log('clicked')}>
          <Image
            style={{width: 100, height: 100}}
            source={require('./logoutIcon.svg')}
          />
        </Pressable>
      </View>
      <Formik
        initialValues={{
          firstNmae: '',
          lastNmae: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values =>
          handleRegister({
            firstName: values.firstNmae,
            lastName: values.lastNmae,
            email: values.email,
            password: values.password,
          })
        }>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <View style={styles.inputWrapper}>
              <View>
                <InputField
                  label={'Firstname'}
                  inputType={''}
                  keyboardType={undefined}
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                  value={values.firstNmae}
                />
                <ErrorMessage errorValue={errors.firstNmae} />
              </View>
              <View>
                <InputField
                  label={'Lastname'}
                  inputType={''}
                  keyboardType={undefined}
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                  value={values.lastNmae}
                />
                <ErrorMessage errorValue={errors.lastNmae} />
              </View>
            </View>
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
            <InputField
              label={'Confirm Password'}
              inputType="password"
              keyboardType={undefined}
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
            />
            <ErrorMessage errorValue={errors.confirmPassword} />
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="#222A48"
              text="I agree with all privacy and policy"
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
              title={'Register'}
              styles={styles.button}
              handlePress={() => handleSubmit}
              isSubmiting={isSubmitting}
            />
          </View>
        )}
      </Formik>
      <View style={styles.policy}>
        <Text style={styles.policyText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
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
    fontFamily: 'Inyika',
  },
  inputWrapper: {
    flex: 1,
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
    bordeRadius: 23,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inyika',
    textAlign: 'center',
  },
});

export default Register;
