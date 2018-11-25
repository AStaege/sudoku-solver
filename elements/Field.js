export default class Field {

    constructor(id) {
        this.td = document.createElement('td');
        this.id = id;
        this.td.dataset.fldId = this.id;
        this.value = '';
        this.possibleValues = '123456789'.split('');
    }

    deletePossibleValue(value) {
        if (this.possibleValues.length > 0 && this.possibleValues.indexOf(value) > -1) {
            this.possibleValues.splice(this.possibleValues.indexOf(value), 1);
            if (this.possibleValues.length == 1) {
                this.setValue(this.possibleValues, true);
            }
        }
    }

    getTd() {
        return this.td;
    }

    getValue() {
        return this.value;
    }

    setValue(val, solving) {
        if (this.value === '') {
            this.value += val;
            this.td.textContent = val;
            this.possibleValues = [];
            if (solving) this.updateEntities(this.value);
        }
    }

    setQuad(quad) {
        this.quad = quad;
        this.td.dataset.quad = quad.getId();
    }

    updateEntities(value) {
        this.row.deleteMissingValue(value);
        this.col.deleteMissingValue(value);
        this.quad.deleteMissingValue(value);
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
        this.td.dataset.tdId = this.col.getId();
    }

    getPossibleValues() {
        return this.possibleValues;
    }
}