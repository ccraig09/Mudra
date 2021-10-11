import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import foods from "../components/foods";
import { PrimaryButton } from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../store/cartAction";

// import CartItem from "../components/shop/CartItem";
// import Card from "../components/UI/Card";


const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        productcode: state.cart.items[key].productcode,
        productImage: state.cart.items[key].image,
        productIngredients: state.cart.items[key].ingredients,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });


  console.log(cartItems)


  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.productImage} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.productTitle}</Text>
          <Text style={{ fontSize: 13, color: Colors.grey }}>
            {item.productIngredients}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${item.productPrice}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.quantity}x</Text>
          <View style={style.actionBtn}>
            <TouchableOpacity style={{marginTop: 2}} onPress={()=>{dispatch(cartActions.removeFromCart(item.productId));}}>
            <Icon  name="remove" size={25} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{dispatch(cartActions.addToCart(item));}}>
            <Icon name="add" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total</Text>
              {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>{cartTotalAmount}bs</Text> */}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{Math.round(cartTotalAmount.toFixed(2) * 100) / 100} bs</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton onPress={()=>{console.log('order up')}} data={cartItems} title="PEDIR" />
            </View>
          </View>
        )}
      />
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
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  actionBtn: {
    width: 90,
    height: 30,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
});

export default CartScreen;
