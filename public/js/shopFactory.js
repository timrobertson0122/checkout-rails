smartShop.factory('Products', ['Flash', function(Flash) {

    var service = {};
    var shoppingBasket = [];

    service.basketTotal = 0;
    service.shoppingBasket = shoppingBasket;
    service.fivePercentDiscount = false;
    service.twentyPoundDiscount = false;
    service.twentyPercentDiscount = false;

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
        console.log(result)
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

    service.addItemToBasket = function(item) {
        shoppingBasket.push(item);
        service.shoppingBasketVisible();
        service.availableDiscounts();
        service.getBasketTotal();
    };

    service.removeItemFromBasket = function(item) {
        shoppingBasket.pop(item);
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
