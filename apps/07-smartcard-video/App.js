import QRCode from "react-qr-code";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageBackground, StyleSheet, Text, Image, Linking, View, TouchableOpacity } from 'react-native';
import Video from "react-native-video";

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
    width: '300px',
    alignSelf: 'center',
    backgroundColor: '#fff5',
    borderRadius: '10px',
    padding: '4px',
    alignItems: 'center',
    margin: '4px',
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
        source={require('./assets/background.mp4')} />

      <QRCode style={{
        alignSelf: 'center',
        backgroundColor: '#000a',
        borderRadius: '16px',
        marginTop: '32px',
        marginBottom: '32px',
      }} value={INFOS.email} size={200} bgColor='black' fgColor='white' />

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
    padding: '16px',
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

