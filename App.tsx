import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import React from 'react';
import TicTacToe from './TicTacToe'

export default function App() {
  return (
    <TicTacToe/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
