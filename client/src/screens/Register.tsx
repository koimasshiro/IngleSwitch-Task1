import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
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
    .label('Password'),
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SignUp</Text>
          <Pressable onPress={() => console.log('clicked')}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./logo.png')}
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
          {({handleChange, handleSubmit, errors}) => (
            <View>
              <View style={styles.inputWrapper}>
                <View>
                  <InputField
                    placeholder={'Firstname'}
                    inputType={''}
                    keyboardType={undefined}
                    style={styles.input}
                    onChangeText={handleChange('firstName')}
                  />
                  <ErrorMessage errorValue={errors.firstNmae} />
                </View>
                <View>
                  <InputField
                    placeholder={'Lastname'}
                    inputType={''}
                    keyboardType={undefined}
                    style={styles.input}
                    onChangeText={handleChange('lastName')}
                  />
                  <ErrorMessage errorValue={errors.lastNmae} />
                </View>
              </View>
              <InputField
                placeholder={'Email'}
                keyboardType="email-address"
                inputType={''}
                style={styles.input}
                onChangeText={handleChange('email')}
              />
              <ErrorMessage errorValue={errors.email} />
              <InputField
                placeholder={'Password'}
                inputType="password"
                keyboardType={undefined}
                style={styles.input}
                onChangeText={handleChange('password')}
              />
              <ErrorMessage errorValue={errors.password} />
              <InputField
                placeholder={'Confirm Password'}
                inputType="password"
                keyboardType={undefined}
                style={styles.input}
                onChangeText={handleChange('confirmPassword')}
              />
              <ErrorMessage errorValue={errors.confirmPassword} />
              <View style={styles.rememberWrapper}>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#222A48"
                  text="I agree with all privacy and policy"
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
              </View>
              <CustomButton
                title={'Register'}
                styles={styles}
                handlePress={() => handleSubmit()}
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
    marginTop: 150,
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
    marginTop: 10,
    marginBottom: 30,
  },
  rememberWrapper: {
    margin: 12,
  },
});

export default Register;
