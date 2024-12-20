// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Audio } from "expo-av";
// import { MaterialIcons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import { LinearGradient } from "expo-linear-gradient";
// import playlist from "../assets/Playlist";

// function PlayerScreen() {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [volume, setVolume] = useState(1.0);

//   async function loadAndPlayAudio(index, shouldPlay = true) {
//     if (sound) {
//       await sound.unloadAsync();
//     }
//     const { sound: newSound } = await Audio.Sound.createAsync(
//       playlist[index].uri,
//       { shouldPlay }
//     );
//     setSound(newSound);
//     setIsPlaying(shouldPlay);
//     setCurrentIndex(index);
//   }

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   useEffect(() => {
//     if (sound) {
//       sound.setVolumeAsync(volume);
//     }
//   }, [volume, sound]);

//   const handlePlayPause = async () => {
//     if (!sound) {
//       await loadAndPlayAudio(currentIndex); // Load the first song if nothing is loaded
//       return;
//     }

//     if (isPlaying) {
//       await sound.pauseAsync();
//       setIsPlaying(false);
//     } else {
//       await sound.playAsync();
//       setIsPlaying(true);
//     }
//   };

//   const renderItem = ({ item, index }) => (
//     <TouchableOpacity
//       style={[styles.listItem, currentIndex === index && styles.activeItem]}
//       onPress={() => loadAndPlayAudio(index)}
//     >
//       <Text style={styles.itemText}>
//         {item.title} - {item.artist}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
//       <FlatList
//         data={playlist}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       <View style={styles.playerContainer}>
//         <Text style={styles.trackInfo}>
//           {playlist[currentIndex].title} by {playlist[currentIndex].artist}
//         </Text>
//         <View style={styles.controls}>
//           <MaterialIcons
//             name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
//             size={64}
//             color="white"
//             onPress={handlePlayPause}
//           />
//         </View>
//         <Slider
//           style={styles.volumeSlider}
//           minimumValue={0}
//           maximumValue={1}
//           value={volume}
//           onValueChange={setVolume}
//           minimumTrackTintColor="#FFFFFF"
//           maximumTrackTintColor="#C0C0C0"
//         />
//         <Text style={styles.volumeText}>Volume</Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   playerContainer: {
//     padding: 20,
//     marginTop: 20,
//   },
//   trackInfo: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   volumeSlider: {
//     width: "100%",
//     height: 40,
//   },
//   volumeText: {
//     color: "white",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   listItem: {
//     backgroundColor: "#131624",
//     padding: 15,
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   itemText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//   },
//   activeItem: {
//     backgroundColor: "#20BCF5",
//   },
// });

// export default PlayerScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient"; // Ensure this is imported correctly
import playlist from "../assets/Playlist"; // Verify this path and export

function PlayerScreen() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);

  async function loadAndPlayAudio(index, shouldPlay = true) {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      playlist[index].uri,
      { shouldPlay }
    );
    setSound(newSound);
    setIsPlaying(shouldPlay);
    setCurrentIndex(index);
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume, sound]);

  const handlePlayPause = async () => {
    if (!sound) {
      await loadAndPlayAudio(currentIndex); // Load the first song if nothing is loaded
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const handleNext = async () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= playlist.length) {
      nextIndex = 0; // Loop to start if at end
    }
    await loadAndPlayAudio(nextIndex);
  };

  const handlePrevious = async () => {
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = playlist.length - 1; // Loop to end if at start
    }
    await loadAndPlayAudio(previousIndex);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.listItem, currentIndex === index && styles.activeItem]}
      onPress={() => loadAndPlayAudio(index)}
    >
      <Text style={styles.itemText}>
        {item.title} - {item.artist}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={styles.container}>
      <FlatList
        data={playlist}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.playerContainer}>
        <Text style={styles.trackInfo}>
          {playlist[currentIndex].title} by {playlist[currentIndex].artist}
        </Text>
        <View style={styles.controls}>
          <MaterialIcons
            name="skip-previous"
            size={48}
            color="white"
            onPress={handlePrevious}
          />
          <MaterialIcons
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={64}
            color="white"
            onPress={handlePlayPause}
          />
          <MaterialIcons
            name="skip-next"
            size={48}
            color="white"
            onPress={handleNext}
          />
        </View>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#C0C0C0"
        />
        <Text style={styles.volumeText}>Volume</Text>
      </View>
    </LinearGradient> // Correctly closing LinearGradient here
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  playerContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "#20BCF5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  trackInfo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  volumeSlider: {
    width: "100%",
    height: 40,
  },
  volumeText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#131624",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  activeItem: {
    backgroundColor: "#1B2845",
  },
});

export default PlayerScreen;
