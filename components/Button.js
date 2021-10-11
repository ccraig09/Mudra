import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Colors from "../constants/Colors";

const PrimaryButton = ({data, title, onPress = () => {} }) => {
  return (
    <TouchableOpacity disabled={data.length===0} activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: data.length===0? "grey": Colors.primary }}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{ ...style.btnContainer, backgroundColor: Colors.white }}>
        <Text style={{ ...style.title, color: Colors.primary }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: { color: Colors.white, fontWeight: "bold", fontSize: 18 },
  btnContainer: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { PrimaryButton, SecondaryButton };
