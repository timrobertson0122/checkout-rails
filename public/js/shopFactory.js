clothesShop.factory('Products', ['Flash', function(Flash) {

    var service = {};
    var shoppingBasket = [];

    service.basketTotal = 0;
    service.shoppingBasket = shoppingBasket;
    service.fivePoundDiscount = false;
    service.tenPoundDiscount = false;
    service.fifteenPoundDiscount = false;

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
        service.fivePoundDiscount = true;
        service.tenPoundDiscount = true;
        service.fifteenPoundDiscount = true;
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
        return result;
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

    service.ShoesInBasket = function() {
        for (var i = shoppingBasket.length - 1; i >= 0; i--) {
            if (shoppingBasket[i].category.indexOf("Footwear") >= 0) {
                return true;
            }
        }
    };

    service.applyFivePoundDiscount = function() {
        if (service.fivePoundDiscount) {
            service.basketTotal -= 5.00;
            service.fivePoundDiscount = false;
        }
    };

    service.applyTenPoundDiscount = function() {
        if (service.basketTotal < 50.00) {
            Flash.create('danger', 'Sorry, you must spend over £50.');
        } else if (service.tenPoundDiscount) {
            service.basketTotal -= 10.00;
            service.tenPoundDiscount = false;
        }
    };

    service.applyFifteenPoundDiscount = function() {
        if (service.basketTotal < 75.00 || !service.ShoesInBasket()) {
            Flash.create('danger', 'Sorry, discount only available for orders over £75 and including at least one item of footwear');
        } else if (service.fifteenPoundDiscount) {
            service.basketTotal -= 15.00;
            service.fifteenPoundDiscount = false;
        }
    };

    return service;

}]);
