import pad from 'pad'

export default class Table {
  constructor(opts) {
    this.opts = opts
    this.rows = []
    this.columnMarginRight = ' '
  }

  addRow(row) {
    this.rows.push(row)
  }

  getInitialColumnLengths() {
    return this.opts.columns.reduce((columnLengths, column) => {
      columnLengths[column] = 0
      return columnLengths
    }, {})
  }

  getColumnLengths() {
    return this.rows.reduce((columns, row) => {
      Object.keys(row).forEach(column => {
        if (columns[column] < row[column].length) {
          columns[column] = row[column].length
        }
      })
      return columns
    }, this.getInitialColumnLengths())
  }

  getColumnModifier(row, column) {
    return this.opts.columnModifiers
      .filter(columnModifier => columnModifier.condition(row) && columnModifier.modifier)
      .find(columnModifier => columnModifier.columns.includes(column))
  }

  rowToString(row) {
    const columnLengths = this.getColumnLengths(this.rows, this.opts.columns)
    return Object.keys(columnLengths).reduce((rowString, column) => {

      if (columnLengths[column] === 0) {
        return rowString
      }
      const columnValue = row[column] ? row[column] : ''

      const columnModifier = this.getColumnModifier(row, column)

      if (columnModifier) {
        return rowString + columnModifier.modifier(pad(columnValue, columnLengths[column])) + this.columnMarginRight
      }

      return rowString + pad(columnValue, columnLengths[column]) + this.columnMarginRight
    }, '')
  }

  getOutput() {
    return this.rows.map(row => this.rowToString(row))
  }

  print() {
    if (this.opts.header) {
      console.log(this.opts.header)
    }
    this.getOutput().forEach(row => console.log(row))
  }
}