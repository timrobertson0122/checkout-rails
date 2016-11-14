clothesShop.factory('Products', ['Flash', function(Flash) {

    var service = {};
    var shoppingBasket = [];

    service.basketTotal = 0;
    service.shoppingBasket = shoppingBasket;
    service.fivePercentDiscount = false;
    service.twentyPoundDiscount = false;
    service.twentyPercentDiscount = false;

    service.productList = {
        "Smart Technology Products": [{
            name: "Smart Hub",
            price: 49.99,
            quantity: 4,
            image: "images/smart-hub.png"
        }, {
            name: "Motion Sensor",
            price: 24.99,
            quantity: 5,
            image: "images/motion.png"
        }, {
            name: "Wireless Camera",
            price: 99.99,
            quantity: 6,
            image: "images/camera.png"
        }, {
            name: "Smoke Sensor",
            price: 19.99,
            quantity: 5,
            image: "images/smoke.png"
        }, {
            name: "Water Leak Sensor",
            price: 14.99,
            quantity: 10,
            image: "images/flood.png"
        }]
    };

    service.availableDiscounts = function() {
        service.fivePercentDiscount = true;
        service.twentyPoundDiscount = true;
        service.twentyPercentDiscount = true;
    };

    service.getBasketTotal = function() {
        var result = 0;
        for (var i = shoppingBasket.length - 1; i >= 0; i--) {
            result += shoppingBasket[i].price;
        };
        result = parseFloat(result.toPrecision(12));
        service.basketTotal = result;
        return result;
    };

    service.subTotal = function() {
        return service.shoppingBasket.map(function(item) {
            return parseFloat(item.price);
        }).reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        }, 0);
    };

    service.discountTotal = function() {
        var result = service.subTotal() - service.basketTotal;
        if (result > 0.00) {
          return result
        } else {
          return 0.00
        };
    };

    service.itemAvailable = function(item) {
        return (parseInt(item.quantity) > 0);
    };

    service.addItemToBasket = function(item) {
        if (!service.itemAvailable(item)) {
            Flash.create('danger', 'Sorry, that item is out of stock.');
        } else {
            shoppingBasket.push(item);
            service.shoppingBasketVisible();
            service.availableDiscounts();
            item.quantity--;
        };
        service.getBasketTotal();
    };

    service.removeItemFromBasket = function(item) {
        shoppingBasket.pop(item);
        item.quantity++;
        service.shoppingBasketVisible();
        service.getBasketTotal();
    };

    service.emptyBasket = function() {
        for (var i = shoppingBasket.length - 1; i >= 0; i--) {
            shoppingBasket[i].quantity++;
        }
        shoppingBasket.length = 0;
        service.getBasketTotal();
    };

    service.shoppingBasketVisible = function() {
        if (service.shoppingBasket.length > 0) {
            return true;
        }
    };

    service.applyFivePercentDiscount = function() {
      if (service.twentyPercentDiscount && service.fivePercentDiscount) {
          service.basketTotal = (service.basketTotal * 0.95);
          service.fivePercentDiscount = false;
      } else {
          Flash.create('danger', 'Sorry, you cannot combine with 20% off voucher');
      }
    };

    service.removefivePercentDiscount = function() {
      service.basketTotal += service.discountTotal();
      service.fivePercentDiscount = true;
    }

    service.applyTwentyPoundDiscount = function() {
        if (service.twentyPercentDiscount && service.twentyPoundDiscount) {
            service.basketTotal -= 20.00;
            service.twentyPoundDiscount = false;
        } else {
            Flash.create('danger', 'Sorry, you cannot combine with 20% off voucher');
        }
    };

    service.removeTwentyPoundDiscount = function() {
      service.basketTotal += service.discountTotal();
      service.twentyPoundDiscount = true;
    };

    service.applyTwentyPercentDiscount = function() {
        if (service.fivePercentDiscount && service.twentyPoundDiscount) {
            service.basketTotal = (service.basketTotal * 0.80);
            service.twentyPercentDiscount = false;
        } else {
            Flash.create('danger', 'Sorry, discount cannot be combined with others');
        }
    };

    service.removeTwentyPercentDiscount = function() {
      service.basketTotal += service.discountTotal();
      service.twentyPercentDiscount = true;
    };

    return service;

}]);
