import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, login, RootStore } from '@carpool/client/store';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import {
  Button,
  Input,
  PasswordInput,
  InlineInputs,
} from '@carpool/client/components';

import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Onboard: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export function SignUpPage({ navigation }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    if (user && user.name) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  const checkPassword = () => {
    if (password === passwordConfirm) {
      return true;
    } else {
      return false;
    }
  };

  const checkEmailFormat = () => {
    const domain = email.split('@')[1];

    const validDomains = [
      'myuct.co.za',
      'sun.ac.za',
      'tuks.co.za',
      'students.wits.ac.za',
      'stu.ukzn.ac.za',
      'myuwc.ac.za',
      'campus.ru.ac.za',
      'student.uj.ac',
      'student.g.nwu.ac.za',
      'ufs4life.ac.za',
      'mandela.ac.za',
      'dut4life.ac.za',
      'unizulu.ac.za',
      'student.monash.edu',
      'edu.vut.ac.za',
      'stud.cut.ac.za',
      'mywsu.ac.za',
      'keyaka.ul.ac.za',
      'tut4life.ac.za',
    ];

    if (validDomains.includes(domain)) {
      return true;
    } else {
      return false;
    }
  };

  const submitHandler = () => {
    if (!checkPassword()) {
      alert('Passwords do not match');
    } else if (!checkEmailFormat()) {
      alert('Invalid email format');
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View style={{ display: 'flex', flex: 2 }}>
          <Icon
            name="arrow-left"
            size={30}
            style={{ color: '#808080' }}
            onPress={() => navigation.navigate('Onboard')}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Image
              source={require('./title.png')}
              style={{ resizeMode: 'cover' }}
            />
          </View>
        </View>
        <View style={{ display: 'flex', flex: 5 }}>
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Sign Up
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 15,
              fontWeight: '400',
              color: '#808080',
              marginTop: 8,
              marginBottom: 18,
              lineHeight: 20,
            }}
          >
            Sign up to explore the great features Carpool has to offer!
          </Text>
          <InlineInputs
            onChangeTextOne={setName}
            onChangeTextTwo={setSurname}
            inputOneValue={name}
            inputTwoValue={surname}
            inputOnePlaceholder="Name"
            inputTwoPlaceholder="Surname"
            iconName="user"
          />
          <Input
            onChangeText={setEmail}
            inputValue={email}
            inputPlaceholder="Email Address"
            iconName="mail"
          />
          <Input
            onChangeText={setUniversity}
            inputValue={university}
            inputPlaceholder="University"
            iconName="mail"
          />
          <Input
            onChangeText={setStudentNumber}
            inputValue={studentNumber}
            inputPlaceholder="Student Number"
            iconName="mail"
          />
          <PasswordInput
            onChangeText={setPassword}
            inputValue={password}
            inputPlaceholder="Password"
            iconOneName="lock"
            iconTwoName="eye-off"
          />
          <PasswordInput
            onChangeText={setPasswordConfirm}
            inputValue={passwordConfirm}
            inputPlaceholder="Confirm Password"
            iconOneName="lock"
            iconTwoName="eye-off"
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ color: '#808080' }}>Already have an account?</Text>
            <Text
              style={{ color: '#188aed' }}
              onPress={() => navigation.navigate('Login')}
            >
              &nbsp;Login
            </Text>
          </View>
          <Button title="Sign Up" onPress={submitHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: 'flex',
  },
  flexColumn: {
    flexDirection: 'column',
    height: '100%',
    marginHorizontal: 40,
    justifyContent: 'space-between',
  },
  borderStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#188aed',
    width: '100%',
  },
});

export default SignUpPage;
