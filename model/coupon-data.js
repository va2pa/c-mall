import { getSlashYMD } from "../utils/date";


class CouponData {
    status
    startTime
    endTime
    
    constructor(coupon, status) {
        Object.assign(this, coupon)
        this.status = status
        this.endTime = getSlashYMD(coupon.end_time)
        this.startTime = getSlashYMD(coupon.start_time)
    }
}

export {
    CouponData
}