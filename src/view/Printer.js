import {getColorByMode, getEmojiByMode, formatTime, formatDuration} from './viewUtils'
import {cyan, gray} from 'chalk'

const dateTimeFormat = 'H:mm DD.MM.YYYY'

class Printer {

  addDate(date) {
    if (!date) {
      return this
    }
    return this._addLine(formatTime(date))
  }

  addDuration(duration) {
    if (!duration) {
      return this
    }
    return this._addLine(formatDuration(duration))
  }

  addMode(mode) {
    if (!mode) {
      return this
    }
    const color = getColorByMode(mode)
    return this._addLine(`${getEmojiByMode(mode)} ${color(mode)}`)
  }

  addArrive(arrive) {
    if (!arrive) {
      return this
    }
    this.addString('arrive ', gray)
    return this.addString(arrive.format(dateTimeFormat), cyan)
  }

  addDeparture(departure) {
    if (!departure) {
      return this
    }
    this.addString('departure ', gray)
    return this.addString(departure.format(dateTimeFormat), cyan)
  }

  addString(str, color) {
    if (!str) {
      return this
    }

    return color ? this._addLine(color(str)) : this._addLine(str)
  }

  _addLine(line) {
    if (!this.lines) {
      this.lines = []
    }
    this.lines.push(line)
    return this
  }

  print() {
    this.lines ? console.log(this.lines.join('')) : null
  }
}
export default Printer