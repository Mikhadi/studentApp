import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';

export default function StudentReg() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  return (
    <View style={styles.container}>
      <Image source={require('./assets/avatar.png')} style={styles.avatar}></Image>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder={"Student ID"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder={"Student Name"}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder={"Student Address"}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar:{
    height: 250,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 25,
  },
  input:{
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 3,
  },
  buttonContainer:{
    flexDirection: 'row'
  },
  button:{
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
  }
});
