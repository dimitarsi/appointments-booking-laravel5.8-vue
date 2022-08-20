export const gridProps =  () => {
    return {
        draggable: {
            default: false
        },
        gridData: {
            type: Array,
            default: () => {}
        },
        position: {
            type: Function,
            default: (r, c, data) => {
                return data.row == r && data.col == c;
            }
        },
        cellDataStyle: {
            type: Function,
            default: function(r, c, d, di, total) {
                return {};
            }
        },
        columns: {
            type: Array,
            default: () => [] //'abcdefgjijklmnopqrst'.split('').map(l => l.toUpperCase())
        },
        rows: {
            type: Array,
            default: () => [] // range(0, 3).map(n => padStart(n, 2, "0"))
        },
        sortCellData: {
            type: Function
        }
    }   
}

export const rowProps = () => {
    return {
        row: {
            required: true
        },
        columns: {
            default: () => []
        },
        cellsData: {
            default: () => {}
        },
        draggable: {
            default: false
        },
        cellDataStyle: {
            required: true,
            type: Function
        },
    }
}