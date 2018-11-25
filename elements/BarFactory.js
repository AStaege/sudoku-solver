import Bar from "./Bar.js";
import BarType from "./BarType.js";
import BigBar from "./BigBar.js";
import Field from "./Field.js";
import Quadrant from "./Quadrant.js";

"use strict";

export default class BarFactory {

    static initRowsAndCols(bf) {
        let tempRowArray = BarFactory.initializeBars(false, BarType.ROW);
        let tempColArray = BarFactory.initializeBars(tempRowArray, BarType.COL);

        return [tempRowArray, tempColArray];
    }

    static initBigRowsAndCols(rowArray, colArray) {
        let tempRowArray = BarFactory.initBigBars(rowArray, BarType.ROW);
        let tempColArray = BarFactory.initBigBars(colArray, BarType.COL);

        return [tempRowArray, tempColArray];
    }

    static initializeBars(barArray, RowOrCol) {
        let tempBarArray = Array(9);
        let i = 1;
        for (let bar = 0; bar < tempBarArray.length; bar++) {
            let fieldArray = Array(9);
            for (let fpos = 0; fpos < fieldArray.length; fpos++) {
                fieldArray[fpos] = barArray
                    ? barArray[fpos].getField(bar)
                    : new Field(i++);
            }
            tempBarArray[bar] = new Bar(fieldArray, RowOrCol, bar);
        }
        return tempBarArray;
    }

    static initBigBars(bars, RowOrCol) {
        let tempBigBarArray = Array(3);
        for (let bar = 0; bar < tempBigBarArray.length; bar++) {
            const pos = bar * 3;
            tempBigBarArray[bar] = new BigBar(bars.slice(pos, pos + 3), RowOrCol, bar);
        }
        return tempBigBarArray;
    }

    static initQuadrants(bigBarArray) {
        let quadArray = [];

        // einzelne bigBars
        bigBarArray.forEach((bigBar, bigBarIndex) => {

            // einzelne quadranten
            for (let quadIndex = 0; quadIndex < 9; quadIndex = quadIndex + 3) {
                let tmpArray = [
                    bigBar.getBar(0).getFields().slice(quadIndex, quadIndex + 3),
                    bigBar.getBar(1).getFields().slice(quadIndex, quadIndex + 3),
                    bigBar.getBar(2).getFields().slice(quadIndex, quadIndex + 3)
                ];
                const arrLength = quadArray.length;
                quadArray.push(new Quadrant(tmpArray, arrLength));
            }
        });
        return quadArray;
    }
}
