# sudoku-solver
Small working sudoku solver, with hardcoded playfield values

## Playfields
It has 8 Playfields in the main file ``sudoku.js`` where the playfield with index 5 is just a plain field (just for loading purposes)

it actually can try to solve it, but this may not come to an end.

## Playfield initializing format
to import a playfield by now, there has to inserted (by push) a new array in ``sudoku.js`` of the format of one of the examples shown:

either:
```javascript
[
    [0,0,0,7,0,0,5,0,0],
    [3,0,0,8,0,0,0,0,1],
    [7,0,0,9,0,0,0,0,8],
    [0,6,0,0,3,0,0,1,0],
    [0,9,0,0,7,0,0,5,0],
    [0,8,0,0,1,0,7,9,0],
    [0,0,2,0,0,6,9,0,0],
    [0,0,5,0,0,0,0,3,0],
    [0,0,0,0,0,4,2,0,0],
]
```

or
```javascript
[
    '060010870',
    '090080600',
    '000620000',
    '000960000',
    '005000002',
    '079000005',
    '000004000',
    '200000080',
    '800000051'
]
```

## Principle
in the fields it uses an array of ``possibleValues`` and in the row/col/quadrant it uses an array of ``missingValues``. For every set value from the initial playfield it deletes these values from these arrays.

It then checks two conditions in a loop:
1. it checks if one of the missing value of a row/col/quad is the possible value in only one field. If so, the value is set.
2. it checks for every field if it has only one possible value left. If so, the value is set.
