import { CouponStatus } from "../../core/enum";
import { Coupon } from "../../model/coupon";
import { CouponData } from "../../model/coupon-data";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        coupon: Object,
        status: {
            type: Number,
            value: CouponStatus.CAN_COLLECT
        }
    },

    data: {
        _coupon: Object,
        _status: CouponStatus.CAN_COLLECT,
        firstCollect: false,
        repeatCollect: false
    },

    observers: {
        'coupon,status': function (coupon, status) {
            if (!coupon) {
                return
            }
            const couponData = new CouponData(coupon, status)
            this.setData({
                _coupon: couponData,
                _status: couponData.status
            })
        },
    },

    methods: {
        async onGetCoupon(event) {
            if (this.data._status === CouponStatus.AVAILABLE) {
                wx.switchTab({
                    url: '/pages/category/category',
                });
                return
            }
            const couponId = event.currentTarget.dataset.id
            let msg;
            console.log(couponId);
            try {
                msg = await Coupon.collectCoupon(couponId)
            } catch (e) {
                if (e.errorCode === 6010) {
                    this.setRepeatCollected()
                }
                return
            }
            if (msg.code === 0) {
                this.setFirstCollected()
            }

        },

        setFirstCollected() {
            this.setData({
                firstCollect: true,
                _status: CouponStatus.AVAILABLE
            })
        },

        setRepeatCollected() {
            this.setData({
                repeatCollect:true,
                _status: CouponStatus.AVAILABLE
            })
        }
    }

})
