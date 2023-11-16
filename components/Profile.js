import { Alert, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import {signOut } from "firebase/auth";
import { auth } from "../firebase"

import { useState } from 'react';
import { CartContext } from '../Manager/CartManager';
import { TouchableOpacity } from 'react-native';

const Profile = ({ navigation }) => {
  const { key } = useContext(CartContext);
  console.log(key);
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');

  useEffect(() => {
    var document = doc(db, "Users", key);
    onSnapshot(document, (snapshot) => {
      setName(snapshot.data().Name);
      setSurname(snapshot.data().Surname);
      console.log('got user data');
      console.log(snapshot.data().Name);
    });
  }, []);

  const update = () => {
    if (Name !== "" && Surname !== "") {
      const mydata = {
        Name: Name,
        Surname: Surname
      };
      setDoc(doc(db, 'Users', key), mydata, { merge: true })
        .then(() => {
          Alert.alert('Notification', 'Successfully Updated');
        })
        .catch((error) => {
          console.log(String(error));
          Alert.alert('Notification', String(error));
        });
    } else {
      Alert.alert('Notification', 'Please fill your details first');
    }
  };
  

  const Logout =()=> {
    signOut(auth).then(() => {
      navigation.replace("Login")
      
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>


      

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircle" size={24} color="#040b33" style={{ marginTop: 70, marginLeft: 14 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => update()}>
        <MaterialCommunityIcons name="account-edit" size={30} color="#040b33" marginLeft={325} bottom={30} />
      </TouchableOpacity>

      
      <Image

        source={require('../components/auth/breezy.webp')}
        onPress={() => update()}
        style={{
          width: 120,
          height: 120,
          alignSelf: 'center',
          borderRadius:70,
        }}
      />

      <TextInput
        style={styles.input}
        value={Name}
        onChangeText={(t) => setName(t)}
      />
      <TextInput
        style={styles.input}
        value={Surname}
        onChangeText={(t) => setSurname(t)}
      />
     
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() =>Logout()}>
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    borderColor: "#040b33",
    borderWidth: 2,
    alignSelf: "center",
    marginTop: 40,
    color: '#040b33'
  },
  logoutButton: {
    backgroundColor: '#040b33',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
