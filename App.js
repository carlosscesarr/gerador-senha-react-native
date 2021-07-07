/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
} from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from '@react-native-clipboard/clipboard';

let letters = 'abcdefghijklmnopqrstuvwxyz';
let numbers = '0123456789';
let simbols = '!#$%&()*+-:;<=>?@[]^_{}';
let minCharacters = 1;
let maxCharacters = 16;

const App = () => {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(8);
  const [isSortMinusculo, setIsSortMinusculo] = useState(true);
  const [isSortMaiusculo, setIsSortMaiusculo] = useState(true);
  const [isSortSimbol, setIsSortSimbol] = useState(true);
  const [isSortNumber, setIsSortNumber] = useState(true);

  function copyToClipboard() {
    Clipboard.setString(password);
  }

  function generatePassword() {
    let minusculoLettersArray = letters.split('');
    let maiusculoLettersArray = letters.toLocaleUpperCase().split('');
    let numbersArray = numbers.split('');
    let simbolsArray = simbols.split('');
    let chacactersArray = [];
    if (isSortMinusculo) {
      chacactersArray = [...chacactersArray, ...minusculoLettersArray];
    }
    if (isSortMaiusculo) {
      chacactersArray = [...chacactersArray, ...maiusculoLettersArray];
    }
    if (isSortNumber) {
      chacactersArray = [...chacactersArray, ...numbersArray];
    }
    if (isSortSimbol) {
      chacactersArray = [...chacactersArray, ...simbolsArray];
    }
    let countCharset = chacactersArray.length;
    let pass = '';
    if (!(countCharset > 0)) {
      setPassword('');
      return;
    }
    let chacactersArrayShufle = shuffle(chacactersArray);
    for (let i = 1; i <= size; i++) {
      pass += chacactersArrayShufle[Math.floor(Math.random() * countCharset)];
    }
    setPassword(pass);
  }

  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F3FF" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginHorizontal: 20}}>
          <View style={{width: '80%', marginTop: 25}}>
            <Image
              style={styles.imagem}
              source={require('./src/assets/security-protect-lock-01.png')}
            />
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.countCharacter}>{size} Caracteres</Text>
          </View>
          <View style={styles.containerSlider}>
            <Slider
              style={styles.slider}
              minimumValue={minCharacters}
              maximumValue={maxCharacters}
              value={size}
              onValueChange={(value) => setSize(parseInt(value))}
              minimumTrackTintColor="#9651e9"
              maximumTrackTintColor="#000000"
              thumbTintColor="#9651e9"
            />
          </View>
          <View style={styles.containerRadio}>
            <Text style={styles.labelRadio}>Letras minúsculas</Text>
            <Switch
              trackColor={{ false: '#ddd', true: '#f0cc00' }}
              thumbColor={isSortMinusculo ? '#f0c330' : '#f4f3f4'}
              ios_backgroundColor="#767577"
              onValueChange={() => { setIsSortMinusculo(!isSortMinusculo) }}
              value={isSortMinusculo}
            />
          </View>
          <View style={styles.containerRadio}>
            <Text style={styles.labelRadio}>Letras maiúsculas</Text>
            <Switch
              trackColor={{ false: '#ddd', true: '#f0cc00' }}
              thumbColor={isSortMaiusculo ? '#f0c330' : '#f4f3f4'}
              ios_backgroundColor="#767577"
              onValueChange={() => { setIsSortMaiusculo(!isSortMaiusculo) }}
              value={isSortMaiusculo}
            />
          </View>
          <View style={styles.containerRadio}>
            <Text style={styles.labelRadio}>Números</Text>
            <Switch
              trackColor={{ false: '#ddd', true: '#f0cc00' }}
              thumbColor={isSortNumber ? '#f0c330' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => { setIsSortNumber(!isSortNumber) }}
              value={isSortNumber}
            />
          </View>
          <View style={styles.containerRadio}>
            
              <Text style={styles.labelRadio}>Símbolos</Text>
              <Switch
                trackColor={{ false: '#ddd', true: '#f0cc00' }}
                thumbColor={isSortSimbol ? '#f0c330' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => { setIsSortSimbol(!isSortSimbol) }}
                value={isSortSimbol}
              />
          </View>

          {password !== '' && (
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="#FFF"
              onPress={copyToClipboard}
              style={styles.containerPassword}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textPassword}>{password}</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    style={styles.copyImagePassword}
                    source={require('./src/assets/copy.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          )}
          <View style={styles.containerSubmit}>
            <TouchableOpacity
              onPress={generatePassword}
              style={styles.btnSubmit}>
              <Text style={styles.textBtnSubmit}>Gerar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3FF',
  },
  imagem: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  countCharacter: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3e3e3e',
  },
  containerSlider: {
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: '#FFF',
    borderRadius: 7,
    justifyContent: 'center',
    width: '80%',
  },
  slider: {
    height: 50,
  },
  containerSubmit: {
    width: '80%',
    height: 50,
    backgroundColor: '#9651e9',
    borderRadius: 7,
    marginTop: 10,
  },
  btnSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textBtnSubmit: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  containerPassword: {
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: '#FFF',
    borderRadius: 7,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  copyImagePassword: {
    width: 24,
    height: 24,
  },
  textPassword: {
    fontSize: 22,
    alignSelf: 'center',
  },
  containerRadio: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  labelRadio: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e3e3e',
  },
});

export default App;
