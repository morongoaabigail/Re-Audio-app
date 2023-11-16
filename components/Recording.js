import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View , ScrollView} from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 


import { Audio } from "expo-av";

export default function Recording({ navigation }) {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (err) {
      console.error("failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();

      let updatedRecordings = [...recordings];
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
      setRecordings(updatedRecordings);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error("failed to stop recording", err);
    }
  }

  function togglePlay(index) {
    let updatedRecordings = [...recordings];
    const currentRecording = updatedRecordings[index];
  
    if (currentRecording.sound != null) {
      if (currentRecording.isPlaying) {
        currentRecording.sound.pauseAsync(); // Pause the sound
      } else {
        currentRecording.sound.playAsync(); // Play the sound
      }
  
      currentRecording.isPlaying = !currentRecording.isPlaying;
      setRecordings(updatedRecordings);
    }
  }
  
  function replayRecording(index) {
    let updatedRecordings = [...recordings];
    const currentRecording = updatedRecordings[index];
  
    if (currentRecording.sound != null) {
      currentRecording.sound.setPositionAsync(0); // Set position to the beginning
      currentRecording.sound.playAsync(); // Play the sound
      currentRecording.isPlaying = true;
      setRecordings(updatedRecordings);
    }
  }
  

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function deleteRecording(index) {
    const updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <Card
        key={index}
        style={{
          width: 340,
          height: 46,
          marginTop: 10,
          position: "relative",
          backgroundColor: "#ecf4fa",
        }}
      >
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
  
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => togglePlay(index)}
          >
            {recordingLine.isPlaying ? (
              <Ionicons
                name="ios-pause-circle-sharp"
                size={23}
                color="white"
                position="absolute"
                zIndex={2}
                marginTop={54}
                right={100}
                backgroundColor="#040b33"
                borderRadius={20}
              />
            ) : (
              <Ionicons
                name="ios-play-circle-sharp"
                size={23}
                color="white"
                position="absolute"
                zIndex={2}
                marginTop={54}
                right={100}
                backgroundColor="#040b33"
                borderRadius={20}
              />
            )}
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteRecording(index)}
          >
            <AntDesign name="delete" size={23} color="#040b33" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.replayButton}
            onPress={() => replayRecording(index)}
          >
            <MaterialIcons name="replay" size={24} color="#040b33" left={35} />
          </TouchableOpacity>
  
        </View>
        
      </Card>
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#040b33" }}>
        {isRecording ? "Recording..." : message}
      </Text>

      <TouchableOpacity
        style={styles.initialButton}
        onPress={recording ? stopRecording : startRecording}
      >
        <Ionicons name="md-mic-circle-outline" size={100} color="#040b33" />
        <Text>{recording ? "Stop recording" : "Start recording"}</Text>
      </TouchableOpacity>
      
      {getRecordingLines()}

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <FontAwesome5 name="user-circle" size={40} color="#040b33" marginTop={150} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 2,
    margin: 16,
    fontSize: 16,
    marginBottom:2,
    left:60,
    position:'absolute',
    color:'#040b33'
  },
  playButton: {
    bottom: 47,
    padding: 15,
    marginRight:35,
    borderRadius: 10,
  },
  deleteButton: {
    left: 100,
    padding: 10,
    color:"#040b33"
  },
  initialButton: {
    alignItems: "center",
  },
});
