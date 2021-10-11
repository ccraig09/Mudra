import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import { SecondaryButton } from "../components/Button";

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.productImage} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: Colors.white }}
            >
              {item.productTitle}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={Colors.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
          {item.productIngredients}
          </Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Agregar al pedido" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: Colors.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: Colors.white,
  },
});

export default DetailsScreen;
