import React, {useState, useEffect} from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import categories from "../components/categories";
import foods from "../components/foods";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../store/cartAction";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [ displayMeals, setDisplayMeals] = useState(foods.filter((food)=> food.popular == true))
  const [inMemoryFood, setInMemoryFood] = useState(foods);
  const dispatch = useDispatch();

  // useEffect(() => {
  // }, []);

  const selectedCategoryHandler = (index) => {
    setSelectedCategoryIndex(index)
    if(categories[index].name == "Popular"){
      console.log('we famous')
      const popularFood =  foods.filter((food)=> food.popular == true)
      console.log(popularFood)
      setDisplayMeals(popularFood)
    } else{
      
      console.log('not so poppin')
      setDisplayMeals(foods.filter((food)=> food.category == categories[index].name))
    }
  }

  const searchFood = (value) => {
    const filteredFood = inMemoryFood.filter((food) => {
      let foodLowercase = (
        food.name 
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return foodLowercase.indexOf(searchTermLowercase) > -1;
    });
    setDisplayMeals(filteredFood);
  };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => selectedCategoryHandler(index)}
            // onPress={() => setSelectedCategoryIndex(index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? Colors.primary
                    : Colors.secondary,
                ...style.categoryBtn,
              }}
            >
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 25, width: 25, resizeMode: "cover" }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? Colors.white
                      : Colors.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const Card = ({ food }) => {
    return (
      <TouchableHighlight
        underlayColor={Colors.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Details", food)}
      >
        <View style={style.card}>
          <View style={{ alignItems: "center", top: -40 }}>
            <Image source={food.productImage} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.productTitle}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey, marginTop: 2 }}>
              {food.productIngredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.productPrice} bs
            </Text>
            <TouchableOpacity style={style.addToCartBtn} onPress={() => {dispatch(cartActions.addToCart(food));}}>
              <Icon name="add" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 28 }}>Hola,</Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}>
              Carlos
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: Colors.grey }}>
            Que quisieras hoy
          </Text>
        </View>
        <Image
          source={require("../assets/mudralogo1024.png")}
          style={{ height: 80, width: 80, borderRadius: 0 }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Buscar"
            onChangeText={(value) => searchFood(value)}
            clearButtonMode="while-editing"
          />
          {/* <Icon name="close" size={20} /> */}
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={Colors.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={displayMeals}
        renderItem={({ item }) => <Card food={item} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: Colors.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 150,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: Colors.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
