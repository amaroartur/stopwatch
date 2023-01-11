import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let currentTime = null
let seconds = 0
let minutes = 0
let hours = 0

export default function App() {

  const [timer, setTimer] = useState(0)
  const [buttonText, setButtonText] = useState("INICIAR")
  const [lastTime, setLastTime] = useState(null)

  function start() {
    if (currentTime !== null) {
      clearInterval(currentTime)
      currentTime = null
      setButtonText("INICIAR")
    } else {
      currentTime = setInterval(() => {
        seconds++
        if (seconds == 60) {
          seconds = 0
          minutes++
        }
        if (minutes == 60) {
          minutes = 0
          hours++
        }
        if(hours == 24){
          seconds = 0
          minutes = 0
          hours = 0
        }

        let formatedTime = `${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
        setTimer(formatedTime)
      }, 1000)
      setButtonText("PAUSAR")
    }
  }

  function clear() {
    if (currentTime !== null) {
      clearInterval(currentTime)
      currentTime = null
    }
    setLastTime(timer)
    setTimer(0)
    hours = 0
    minutes = 0
    seconds = 0
    setButtonText("INICIAR")
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}>{timer}</Text>

      <View style={styles.buttonsView} >
        <TouchableOpacity
          style={styles.button}
          onPress={start}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={clear}
        >
          <Text style={styles.buttonText}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTimeView}>
        <Text style={styles.lastTime}>
          {lastTime ? `Ultimo tempo: ${lastTime}` : ""}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AEEF'
  },
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 160
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: '42%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#00AEEF',
    fontWeight: 'bold'
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: -160
  },
  lastTimeView: {
    marginTop: 40
  },
  lastTime: {
    fontSize: 23,
    color: '#FFFFFF',
    fontStyle: 'italic'
  }
});
