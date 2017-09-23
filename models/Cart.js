module.exports = function Cart(oldCart) {
  this.items = oldCart.items || [];
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    const itemExist = this.items.filter(cartItem => cartItem.id == id).length ? true : false;

    if(!itemExist) {
        this.items.push({item, id, price : item.salePrice, qty: 1});
    } else {
        this.items.forEach(cartItem => {
            if(cartItem.id == id) {
                cartItem.qty++;
                cartItem.price = item.salePrice + cartItem.price;
              }
          })
    }

    this.totalQty++;
    this.totalPrice += item.salePrice; 

  };

  this.remove = function(item, id) {
    this.items = this.items.map(cartItem => {

        if(cartItem.id == id && cartItem.qty > 1) {
            cartItem.qty--;
            cartItem.price = cartItem.price - item.salePrice;
        } else if(cartItem.id == id && cartItem.qty == 1) {
            cartItem = {};
        }
        return cartItem;
    }).filter(cartItem => cartItem.id);

    

//    this.items = this.items.filter(cartItem => cartItem.qty == 1 && cartItem.id != id);

    this.totalQty--;
    this.totalPrice -= item.salePrice;
  };


}
