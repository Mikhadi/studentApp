import { StatusBar } from 'expo-status-bar';
import { FC, useState, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const HomeScreen: FC<{route:any, navigation: any}> = ({route, navigation}) => {
  const [message, setMessage] = useState('non')

  useEffect(() => {
    console.log("useEffect"+ route.params?.newPstId)
    if(route.params?.newPstId){
      setMessage(JSON.stringify(route.params?.newPstId))
    }
  }, [route.params?.newPstId])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>{message}</Text>
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate('Details', {itemId:12345, name:"Test"})}/>
    </View>
  );
}
const DetailsScreen: FC<{route : any,navigation: any}> = ({ route, navigation }) => {
  const itemId = JSON.stringify(route.params.itemId)
  const name = JSON.stringify(route.params.name)

  useEffect(()=>{
    navigation.setOptions({title:"New Title"})
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen </Text>
      <Text>id:{itemId}</Text>
      <Text>{name}</Text>
        <Button 
        title="Go to Home" 
        onPress={() => navigation.navigate('Home', {newPstId: '121212'})}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HeaderTitle: FC =() => {
  return(
    <Image style={{height:50, width:50, marginBottom:5}} source={require('./assets/avatar.png')}/>
  )
}

export default function App2() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={DetailsScreen} initialParams={{itemId: 1123, name:"test"}} />
 </Tab.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
