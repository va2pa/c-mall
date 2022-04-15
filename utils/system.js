import { px2rpx } from "../miniprogram_npm/lin-ui/utils/util";
import { promisic } from "./util";


const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)();
    return {
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
    }
}

const getWindowHeightRpx = async function () {
    const res = await getSystemSize()
    return px2rpx(res.windowHeight)
}

export {
    getSystemSize,
    getWindowHeightRpx
}