import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import useStore from '../store/Store';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [dado1, setDado1] = useState<number>(1);
  const [dado2, setDado2] = useState<number>(1);
  const [userGuess, setUserGuess] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const playAndCheckGuess = () => {
    if (userGuess === '') {
      Alert.alert('Erro', 'Por favor, insira uma suposição.');
      return;
    }

    const newDado1: number = Math.floor(Math.random() * 6) + 1;
    const newDado2: number = Math.floor(Math.random() * 6) + 1;
    setDado1(newDado1);
    setDado2(newDado2);

    const guess = parseInt(userGuess, 10);
    const total: number = newDado1 + newDado2;

    let resultado: string;

    if (guess === total) {
      resultado = 'Você acertou!';
    } else {
      resultado = 'Você errou! A soma dos dados é ' + total;
    }

    useStore.getState().addToHistory({ dado1: newDado1, dado2: newDado2, resultado });

    Alert.alert('Resultado', resultado);
    setUserGuess('');
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/dado1.png')} />
      <Text style={styles.text}>Dado 1: {dado1}</Text>
      <Text style={styles.text}>Dado 2: {dado2}</Text>
      <TextInput
        placeholder="Sua suposição"
        keyboardType="numeric"
        value={userGuess}
        onChangeText={(text) => setUserGuess(text)}
        editable={isPlaying || userGuess === ''}
        style={styles.input}
        />
      <View style={styles.buttonContainer}>
      <Button title="Jogar" onPress={playAndCheckGuess}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: 200,
  },
});


export default Home;


