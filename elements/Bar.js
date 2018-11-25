import BarType from "./BarType.js";

"use strict";

export default class Bar {

    constructor(fields, bartype, id) {
        this.fields = fields;
        this.id = id;
        this.bartype = bartype;
        this.missingValues = '123456789'.split('');
        this.setRowOnFields();
        this.initTrDomNode();
    }

    getField(pos) {
        return this.fields[pos];
    }

    getFields() {
        return this.fields;
    }

    initTrDomNode() {
        if (this.bartype === BarType.ROW) {
            this.trDomNode = document.createElement('tr');
            this.fields.forEach(field => {
                this.trDomNode.appendChild(field.getTd());
            });
            this.trDomNode.dataset.trId = this.id;
        }
    }

    getTrDomNode() {
        return this.trDomNode;
    }

    getId() {
        return this.id;
    }

    setRowOnFields() {
        this.fields.forEach((field) => {
            if (this.bartype === BarType.ROW) {
                field.setRow(this);
            } else {
                field.setCol(this);
            }
        });
    }

    deleteMissingValue(value) {
        if (this.missingValues.length > 0 && this.missingValues.indexOf(value) > -1) {
            this.missingValues.splice(this.missingValues.indexOf(value), 1);
            this.fields.forEach(field => {
                field.deletePossibleValue(value);
            });
        }
    }

    checkForSinglePossibleValues() {
        let change;
        let localChange;
        do {
            localChange = this.missingValues.some(mVal => {
                let possibles = [];
                this.fields.forEach(field => {
                    if (field.getPossibleValues().indexOf(mVal) > -1) {
                        possibles.push(field);
                    }
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

        let flds = this.fields
                        .map(field => {return {fld: field, val: parseInt(field.getValue())-1};})
                        .sort((a, b) => {
                            return a.val - b.val;
                        })
                        .filter((elem, ind) => {
                            console.log("elem: " + (elem.val + 1) + ", ind: " + ind);
                            return elem.val != ind;
                        });
        if (flds.length > 0) {
            console.log("found an error");
            flds.forEach(el => {
                // el.getTd().style.backgroundColor = 'red';
                console.log(el.fld);
                el.fld.getTd().style.backgroundColor = "red";
            });
            return false;
        }
        return true;
    }
}
