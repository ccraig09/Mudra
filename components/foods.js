const foods = [
  {
    id: "1",
    name: "Meat Pizza",
    category: "Pizza",
    ingredients: "Mixed Pizza",
    price: 8.30,
    image: require("../assets/meatPizza.png"),
    productId: 1

  },
  {
    id: "2",
    name: "Cheese Pizza",
    category: "Pizza",
    popular: true,
    ingredients: "Cheese Pizza",
    price: 7.10,
    image: require("../assets/cheesePizza.png"),
    productId:2
  },
  {
    id: "3",
    category: "Burgers",
    name: "Chicken Burger",
    popular: true,
    ingredients: "Fried Chicken",
    price: 5.10,
    image: require("../assets/chickenBurger.png"),
    productId:3
  },
  {
    id: "4",
    category: "Sushi",
    popular: true,
    name: "Sushi Makizushi",
    ingredients: "Salmon Meat",
    price: 9.55,
    image: require("../assets/sushiMakizushi.png"),
    productId:4
  },
  // {
  //   id: "5",
  //   name: "Cheese Pizza",
  //   category: "Popular",
  //   ingredients: "Cheese Pizza",
  //   price: "7.10",
  //   image: require("../assets/cheesePizza.png"),
  // },
  // {
  //   id: "6",
  //   category: "Popular",
  //   name: "Chicken Burger",
  //   ingredients: "Fried Chicken",
  //   price: "5.10",
  //   image: require("../assets/chickenBurger.png"),
  // },
  // {
  //   id: "7",
  //   category: "Popular",
  //   name: "Sushi Makizushi",
  //   ingredients: "Salmon Meat",
  //   price: "9.55",
  //   image: require("../assets/sushiMakizushi.png"),
  // },
];

export default foods;
