class CartItem {
  constructor(
    quantity,
    productPrice,
    productTitle,
    sum,
    productcode,
    image,
    ingredients
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.productcode = productcode;
    this.image= image;
    this.ingredients = ingredients;
  }
}

export default CartItem;
