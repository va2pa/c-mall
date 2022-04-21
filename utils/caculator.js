class Caculator {
    totalPrice = 0
    cartItems = []

    constructor(cartItems) {
        this.cartItems = cartItems
    }
    getTotalPrice() {
        return this.totalPrice
    }

    calc() {
        this.cartItems.forEach(cartItem => {
            this.push(cartItem)
        });
    }

    push(cartItem) {
        let partTotalPrice = 0
        if (cartItem.sku.discount_price) {
            partTotalPrice = Caculator.accMultiply(cartItem.count, cartItem.sku.discount_price)
        } else {
            partTotalPrice = Caculator.accMultiply(cartItem.count, cartItem.sku.price)

        }
        this.totalPrice = Caculator.accAdd(this.totalPrice, partTotalPrice)
    }
    static accAdd(num1, num2) {
      const num1Digits = (num1.toString().split('.')[1] || '').length;
      const num2Digits = (num2.toString().split('.')[1] || '').length;
      const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
      return (Math.round(num1 * baseNum) + Math.round(num2 * baseNum)) / baseNum;
    }
  
    static accMultiply(num1, num2) {
        const num1Digits = (num1.toString().split('.')[1] || '').length;
        const num2Digits = (num2.toString().split('.')[1] || '').length;
        const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
        return (Math.round(num1 * baseNum) * Math.round(num2 * baseNum)) / baseNum / baseNum;
    }
    
    static accSubtract(num1, num2) {
        const num1Digits = (num1.toString().split('.')[1] || '').length;
        const num2Digits = (num2.toString().split('.')[1] || '').length;
        const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
        return (Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum;
    }
}

export {
    Caculator
}