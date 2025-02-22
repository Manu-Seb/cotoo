import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Image } from "expo-image";

type MoodType = "happy" | "sleepy" | "sad";

export default function VirtualPet() {
  const [mood, setMood] = useState<MoodType>("happy");

  const petGifs: Record<MoodType, any> = {
    happy: require("../assets/images/happy.gif"),
    sleepy: require("../assets/images/sleepy.gif"),
    sad: require("../assets/images/sad.gif"),
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Mood: {mood.toUpperCase()}</Text>

      {/* Animated Pet */}
      <Image source={petGifs[mood]} style={{ width: 200, height: 200 }} contentFit="cover" />

      {/* Interaction Buttons */}
      <Button title="Happy" onPress={() => setMood("happy")} />
      <Button title="Sleepy" onPress={() => setMood("sleepy")} />
      <Button title="Sad" onPress={() => setMood("sad")} />
    </View>
  );
}