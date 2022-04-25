const cellStatus = {
  FORBIDDEN: 'forbidden',
  SELECTED: 'selected',
  WAITING: 'waiting'
}
const ShoppingWay = {
  CART: 'cart',
  BUY: 'buy'
}

const CouponStatus = {
  CAN_COLLECT: 0,
  AVAILABLE: 1,
  USED: 2,
  EXPIRED: 3
}

const CouponOperate = {
  SELECT: 0,
  UNSELECT: 1
}

const CouponType = {
  FULL_MINUS: 1,
  FULL_OFF: 2,
  NO_THRESHOLD: 3
}

const OrderStatus= {
  All: 0, 
  UNPAID: 1,
  PAID: 2, 
  DELIVERED: 3, 
  FINISHED: 4, 
  CANCELED: 5,
}

export{
  cellStatus,
  ShoppingWay,
  CouponStatus,
  CouponOperate,
  CouponType,
  OrderStatus
}