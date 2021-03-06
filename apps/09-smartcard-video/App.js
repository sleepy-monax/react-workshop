import QRCode from "react-qr-code";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageBackground, StyleSheet, Text, Image, Linking, View, TouchableOpacity } from 'react-native';
import { Video } from "expo-av";
import { useEffect, useRef } from "react";

let INFOS = {
  "firsname": "Nicolas",
  "lastname": "Van Bossuyt",
  "age": "21",
  "phone": "+32 495 51 81 42",
  "email": "nicolas.van.bossuyt@gmail.com",

  "github": "https://github.com/sleepy-monax",
  "linkedin": "https://www.linkedin.com/in/nicolas-van-bossuyt/",
  "twitter": "https://twitter.com/sleepy_monax",
}

function IconLink({ icon, text, url }) {
  return <TouchableOpacity style={{
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#fff5',
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
    margin: 4,
  }}>
    <Icon name={icon} size={36} color="#fff" />
    <Text style={styles.text} onPress={
      () => {
        Linking.openURL(url)
      }
    }>{text}</Text>
  </TouchableOpacity>
}

export default function App() {
  const video = useRef(null);
  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/background.jpg')}
    >
      <Image style={styles.image} source={require('./assets/userpic.jpg')} />

      <Text style={styles.title}>{INFOS.firsname}</Text>
      <Text style={styles.title}>{INFOS.lastname}</Text>
      <Text style={styles.text}>{INFOS.age}</Text>
      <Text style={styles.text} >{INFOS.phone}</Text>

      <Video
        ref={video}
        style={{ width: 300, height: 300 }}
        isLooping={true}
        useNativeControls
        resizeMode="contain"
        source={require('./assets/background.mp4')} />

      <QRCode style={{
        alignSelf: 'center',
        backgroundColor: '#000a',
        borderRadius: 16,
        marginTop: 32,
        marginBottom: 32,
      }}
        value={INFOS.email}
        size={200}
        bgColor='black'
        fgColor='white' />

      <IconLink icon="linkedin" text="LinkedIn" url={INFOS.linkedin} />
      <IconLink icon="twitter" text="Twitter" url={INFOS.twitter} />
      <IconLink icon="github" text="GitHub" url={INFOS.github} />
      <IconLink icon="email" text="Email" url={INFOS.email} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  }
});

