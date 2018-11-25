import BarType from "./BarType.js";

"use strict";

export default class BigBar {

    constructor(bars, bartype, index) {
        this.bigBarNum;
        this.bars = bars;
        this.bartype = bartype;
    }
    getBar(bar) {
        return this.bars[bar];
    }
}
