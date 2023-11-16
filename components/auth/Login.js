import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Alert , ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../../Manager/CartManager';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { SetKey } = useContext(CartContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signin = () => {
    setLoading(true); // Set loading to true when login starts

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false); // Set loading to false when login is successful

        const user = userCredential.user;
        console.log(user.email, user.uid);
        SetKey(user.uid);
        navigation.navigate('Recording');
      })
      .catch((error) => {
        setLoading(false); // Set loading to false when login fails
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle different error codes
        if (errorCode === 'auth/user-not-found') {
          // Handle when the user is not registered
          Alert.alert('Error', 'User not registered. Please register first.');
        } else {
          // Handle other errors
          Alert.alert('Error', errorMessage);
        }

        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Register.png')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
          paddingLeft={15}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input2}
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        placeholderTextColor="white"
          paddingLeft={15}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={toggleShowPassword}>
        <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => signin()} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#040b33" alignSelf="center" right={50} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don't have an account?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
    placeholderTextColor:"white",
    paddingLeft:15,
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
  iconContainer: {
    position: 'absolute',
    marginLeft:300,
    top:475,
  
    
  },
  button: {
    borderWidth: 1,
    borderRadius: 18,
    width: 300,
    height: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 130,
    marginTop: 20,
  },
  buttonText: {
    color: '#040b33',
    fontWeight: '600',
    
  },
  registerText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
});
