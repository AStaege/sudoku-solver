export default class Field {

    constructor(id) {
        this.td = document.createElement('td');
        this.id = id;
        this.td.dataset.fldId = this.id;
        this.value = '';
        this.possibleValues = '123456789'.split('');
    }

    deletePossibleValue(value) {
        // console.log("INTO DELETE (r" + this.getRow().getId() + "c" + this.getCol().getId() + "q" + this.quad.getId() + "), psb: " + this.possibleValues);
        if (this.possibleValues.length > 0 && this.possibleValues.indexOf(value) > -1) {
            this.possibleValues.splice(this.possibleValues.indexOf(value), 1);
            // console.log("now psb: " + this.possibleValues);
        }
    }

    getTd() {
        return this.td;
    }

    getValue() {
        return this.value;
    }

    setValue(val, solving) {
        // console.log("INTO FIELD r" + this.getRow().getId() + "c" + this.getCol().getId() + "q" + this.quad.getId() + ": val: " + val + ", thvalempty: " + (this.value === '') + ", pV: " + this.possibleValues);
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
        // console.log("DeleteMissingValue ROW");
        this.row.deleteMissingValue(value);
        // console.log("DeleteMissingValue COL");
        this.col.deleteMissingValue(value);
        // console.log("DeleteMissingValue QUAD");
        this.quad.deleteMissingValue(value);
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
        this.td.dataset.tdId = this.col.getId();
    }

    getRow() {
        return this.row;
    }
    getCol() {
        return this.col;
    }
    getPossibleValues() {
        return this.possibleValues;
    }
}