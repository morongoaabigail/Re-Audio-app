import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const signUp = async () => {
    setLoading(true); // Set loading to true when registration starts

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log('Successfully registered:', user.email, user.uid);

      const data = {
        Name: Name,
        Surname: Surname,
      };

      await setDoc(doc(db, 'Users', user.uid), data);

      setLoading(false); // Set loading to false when registration is successful

      // Show a success message
      Alert.alert('Success', 'You are successfully registered.');

      // Navigate to the login page
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false); // Set loading to false when registration fails

      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle different error codes
      Alert.alert('Error', errorMessage);

      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircle" size={24} color="white" style={{ marginTop: 10, marginLeft: 14 }} />
      </TouchableOpacity>
      <Image
        source={require('../auth/Login.png')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
        }}
      />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          textColor="white"
          onChangeText={(r) => setName(r)}
          value={Name}
          placeholderTextColor="white"
          paddingLeft={15}
        />
        <TextInput
          style={styles.input3}
          placeholder="Surname"
          onChangeText={(text) => setSurname(text)}
          value={Surname}
          textColor="white"
          placeholderTextColor="white"
          paddingLeft={15}
        />
        <TextInput
          style={styles.input1}
          placeholder="Enter your email"
          textColor="white"
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          value={email}
          paddingLeft={15}
        />
        <TextInput
          style={styles.input2}
          placeholder="Enter your password"
          textColor="white"
          onChangeText={(text) => setpassword(text)}
          placeholderTextColor="white"
          value={password}
          paddingLeft={15}
          secureTextEntry={!showPassword}
        />
         <TouchableOpacity style={styles.iconContainer} onPress={toggleShowPassword}>
        <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="white" />
      </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 18,
            width: 300,
            height: 40,
            justifySelf: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            padding: 12,
            paddingLeft: 270,
          }}
          onPress={() => signUp()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#040b33" right={120} />
          ) : (
            <Text
              style={{
                color: '#040b33',
                alignSelf: 'center',
                borderRadius: 18,
                width: 300,
                height: 40,
                fontWeight: '600',
              }}
            >
              Register
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#040b33',
    padding: 8,
  },

  input: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 40,
    color: 'white',
  },

  input2: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    alignSelf: 'center',
    color: 'white',
  },
  input1: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    alignSelf: 'center',
    color: 'white',
  },
  input3: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    alignSelf: 'center',
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    marginLeft:290,
    top:348,
  
    
  },
});
