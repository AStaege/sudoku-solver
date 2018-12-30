"use strict";

export default class Quadrant {
    constructor(rows, id) {
        this.rows = rows;
        this.cols = [];
        this.id = id;
        this.initCols();
        this.missingValues = '123456789'.split('');
        this.setQuadOnFields();
    }

    initCols() {
        for (let i = 0; i < 3; i++) {
            this.cols.push([]);
            this.cols[i].push(this.rows[0][i]);
            this.cols[i].push(this.rows[1][i]);
            this.cols[i].push(this.rows[2][i]);
        }
    }

    deleteMissingValue(value) {
        let mv = this.missingValues;
        let io = mv.indexOf(value);
        if (mv.length > 0 && io > -1) {
            this.missingValues.splice(io, 1);
            this.rows.forEach(row => {
                row.forEach(field => {
                    field.deletePossibleValue(value);
                });
            });
        }
    }

    setQuadOnFields() {
        this.rows.forEach(row => {
            row.forEach(field => {
                field.setQuad(this);
            });
        });
    }

    getId() {
        return this.id;
    }

    checkForOnlyPossibleValue() {
        let change = false;
        let localChange;
        do {
            localChange = this.rows[0]
                .concat(this.rows[1], this.rows[2])
                .some(field => {
                    const pV = field.getPossibleValues();
                    if (pV.length == 1) {
                        field.setValue(pV[0], true);
                        return true;
                    }
                    return false;
                });
            change |= localChange;
        } while (localChange);
        return change;
    }

    checkForSinglePossibleValues() {
        let change = false;
        let localChange;
        do {
            localChange = this.missingValues.some(mVal => {
                let possibles = [];
                this.rows.forEach(row => {
                    row.forEach(field => {
                        if (field.getPossibleValues().indexOf(mVal) > -1) {
                            possibles.push(field);
                        }
                    });
                });
                if (possibles.length === 1) {
                    possibles.pop().setValue(mVal, true);
                    return true;
                }
                return false;
            });
            change |= localChange;
        } while (localChange);
        return change;
    }

    checkValidity() {
        let all = this.rows[0]
                    .concat(this.rows[1], this.rows[2])
                    .map(field => {return {fld: field, val: parseInt(field.getValue())-1};})
                    .sort((a, b) => {
                        return a.val - b.val;
                    })
                    .filter((elem, ind) => elem.val !== ind);
        if (all.length > 0) {
            // console.log("found an error in quad " + this.id);
            all.forEach(el => {
                // el.getTd().style.backgroundColor = 'red';
                // console.log(el.fld);
                el.fld.getTd().classList.add("quad-error");
            });
            return false;
        }
        return true;
    }
}