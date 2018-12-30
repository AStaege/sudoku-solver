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

        console.log("START SOLVING")
        do {
            // console.log("Big Round " + ++counter);
            let change;
            do {
                // console.log("Small Round");
                change = false;
                if (checkrows) {
                    this.rowArray.forEach(row => {
                        // console.log("Into row " + row.getId())
                        change |= row.checkForSinglePossibleValues();
                        change |= row.checkForOnlyPossibleValue();
                    });
                }
                if (checkcols) {
                    this.colArray.forEach(col => {
                        // console.log("Into col " + col.getId())
                        change |= col.checkForSinglePossibleValues();
                        change |= col.checkForOnlyPossibleValue();
                    });
                }
                if (checkquads) {
                    this.quadrants.forEach(quad => {
                        // console.log("Into quad " + quad.getId())
                        change |= quad.checkForSinglePossibleValues();
                        change |= quad.checkForOnlyPossibleValue();
                    });
                }
            } while (change);

            
            foundBreak = this.rowArray.some(row => {
                return row.getFields().some(field => {
                    const fval = field.getPossibleValues();
                    if (fval.length > 0) {
                        const indx = Math.floor(Math.random() * Math.floor(fval.length));
                        console.log("--- INTO GUESS: pssbl: " + fval + " guess value " + fval[indx] + " (" + indx +") in r"+field.getRow().getId()+"c"+field.getCol().getId());
                        field.setValue(fval[indx], true);
                        return true;
                    }
                    return false;
                });
            });
            
            /*
            foundBreak = false;
            let remainingFields = [];
            this.rowArray.forEach(row => {
                row.getFields().forEach(field => {
                    const fval = field.getPossibleValues();
                    if (fval.length > 0) {
                        remainingFields.push(field);
                    }
                });
            });
            const remFieldLength = remainingFields.length;
            console.log("REMAINING FIELDS LENGTH: " + remFieldLength);
            if (remFieldLength > 0) {
                const fieldIndex = Math.floor(Math.random() * Math.floor(remFieldLength));
                const fval = remainingFields[fieldIndex].getPossibleValues();
                const indx = Math.floor(Math.random() * Math.floor(fval.length));
                remainingFields[fieldIndex].setValue(fval[indx], true);
                foundBreak = true;
            }
            */

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
