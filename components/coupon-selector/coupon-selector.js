import { getSlashYMD } from "../../utils/date";
import { CouponOperate } from "../../core/enum";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        coupons: Array
    },


    observers: {
        'coupons': function (coupons) {
            if (coupons.length === 0) {
                return
            }
            console.log('===================');
            console.log(coupons);
            const _coupons = this.convertToView(coupons)
            const satisfyCount = this.getSatisfyCount(coupons)
            this.setData({
                _coupons,
                satisfyCount
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _coupons: [],
        currentKey: null,
        satisfyCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        convertToView(coupons) {
            const _coupons = coupons.map(coupon => {
                return {
                    satisfy: coupon.satisfy,
                    startTime: getSlashYMD(coupon.startTime),
                    endTime: getSlashYMD(coupon.endTime),
                    title: coupon.title,
                    id: coupon.id
                }
            })
            // 满足条件的优惠劵排在前面
            _coupons.sort((x, y) => {
                if (x.satisfy) {
                    return -1
                }
            })
            return _coupons
        },

        getSatisfyCount(coupons) {
            return coupons.reduce((sum, coupon) => {
                if (coupon.satisfy === true) {
                    return sum + 1
                }
                return sum
            }, 0)
        },

        onChange(event) {
            console.log(event.detail);
            // 取消选择时currentKey未null
            const currentKey = event.detail.currentKey
            const key = event.detail.key
            this.setData({
                currentKey
            })
            const currentCoupon = this.getClickedCoupon(key)
            this.triggerEvent('choose', {
                coupon: currentCoupon,
                operate: this.ensureSelectorStatus(currentKey)
            })
        },

        getClickedCoupon(key) {
            return this.properties.coupons.find(coupon => coupon.id == key)
        },

        ensureSelectorStatus(currentKey) {
            if (currentKey) {
                return CouponOperate.SELECT
            } else {
                return CouponOperate.UNSELECT
            }
        }
    }
})
