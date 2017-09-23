module.exports = function Cart(oldCart) {
  this.items = oldCart.items || [];
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {

    const prepareItem = {
      item: 
      {
        _id: item._id, 
        salePrice: item._salePrice, 
        regularPrice: item.regularPrice, 
        mainImage: item.mainImage, 
        shiping: item.shiping, 
        title: item.title, 
        titleUrl: item.titleUrl, 
        tags: item.tags, 
        qty: item.qty 
    },
      qty: 0,
      price: 0
    };

    this.items[id] = this.items[id] ? this.items[id] : prepareItem;
    const storedItem = this.items[id];

    storedItem.qty++;
    storedItem.price = storedItem.item.salePrice * storedItem.qty;

    this.totalQty++;
    this.totalPrice += storedItem.item.salePrice;
  };

  this.remove = function (item, id) {
    const storedItem = this.items[id];

    if (this.items[id].qty == 1) {
      delete this.items[id];
    } else if (this.items[id].qty > 1) {
      this.items[id].qty--;
      this.items[id].price -= item.price;
    }


    this.totalQty--;
    this.totalPrice -= storedItem.item.salePrice;
  };


  this.generateArray = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }

    return arr;
  }
}
