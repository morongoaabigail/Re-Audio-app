import { StyleSheet, Text, View, Image , TouchableOpacity} from "react-native";
import React from "react";

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../audio-app/components/auth/Login.png")}
        style={{
          width: 200,
          height: 200,
          justifySelf: "center",
          alignSelf: "center",
        }}
      />

      <TouchableOpacity
        style={{
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 18,
          width: 300,
          height: 40,
          justifySelf: "center",
          alignSelf: "center",
          backgroundColor: "white",
          padding: 12,
          paddingLeft: 240,
        }}
        onPress={()=>navigation.navigate('Register')}
      >
        <Text
          style={{
            color: "#040b33",
        
            alignSelf: "center",
            borderRadius: 18,
            width: 300,
            height: 40,
            fontWeight: "600",
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#040b33",
    padding: 8,
  },
});
