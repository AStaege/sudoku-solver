import BarFactory from "./BarFactory.js";
import BarType from "./BarType.js";

"use strict";

export default class Playfield {
    constructor() {
        this.playfieldDomNode = document.querySelector('tbody');
        let tempArr = BarFactory.initRowsAndCols();
        [this.rowArray, this.colArray] = tempArr.map(val => {return val});
        tempArr = BarFactory.initBigRowsAndCols(this.rowArray, this.colArray);
        [this.BigRowArray, this.BigColArray] = tempArr.map(val => {return val});
        this.quadrants = BarFactory.initQuadrants(this.BigRowArray);
        this.initPlayfieldDom();

        console.log(this.rowArray);
        console.log(this.colArray);
        console.log(this.BigRowArray);
        console.log(this.BigColArray);
    }

    loadGame(rows) {
        rows.forEach((row, idx) => {
            let tmp = typeof row === 'string' ? row.split('').map(val => parseInt(val)) : row;
            tmp.forEach((fieldValue, fidx) => {
                if (fieldValue !== 0) {
                    this.rowArray[idx].getField(fidx).setValue(fieldValue, true);
                }
            });
        });
    }

    solve() {
        let foundBreak;
        let counter = 0;
        let checkrows = true;
        let checkcols = true;
        let checkquads = true;

        this.rowArray.forEach(row => {
            row.getFields().forEach(field => {
                const value = field.getValue();
                if (value !== '') field.updateEntities(value);
            });
        });

        do {
            console.log(++counter);
            let change;
            do {
                change = false;
                if (checkrows) {
                    this.rowArray.forEach(row => {
                        change |= row.checkForSinglePossibleValues();
                    });
                }
                if (checkcols) {
                    this.colArray.forEach(col => {
                        change |= col.checkForSinglePossibleValues();
                    });
                }
                if (checkquads) {
                    this.quadrants.forEach(quad => {
                        change |= quad.checkForSinglePossibleValues();
                    });
                }
            } while (change);

            foundBreak = this.rowArray.some(row => {
                return row.getFields().some(field => {
                    const fval = field.getPossibleValues();
                    if (fval.length > 0) {
                        field.setValue(fval[Math.floor(Math.random() * Math.floor(fval.length))], true);
                        return true;
                    }
                    return false;
                });
            });
        } while (foundBreak);
    }

    solved() {
        let validity = !this.rowArray.some(row => {
            return !row.checkValidity();
        });
        validity = validity || !this.colArray.some(col => {
            return !col.checkValidity();
        });
        return validity || !this.quadrants.some(quad => {
            return !quad.checkValidity();
        });
    }

    initPlayfieldDom() {
        this.rowArray.forEach(row => {
            this.playfieldDomNode.appendChild(row.getTrDomNode());
        });
    }
}
