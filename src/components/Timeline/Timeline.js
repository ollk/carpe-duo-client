import React, {Component} from 'react';
import './Timeline.css';

export default class Timeline extends Component {
  

  numberSwitch(num) {
    switch (num) {
      case 6: return '3:00AM'
      case 7: return '3:30AM'
      case 8: return '4:00AM'
      case 9: return '4:30AM'
      case 10: return '5:00AM'
      case 11: return '5:30AM'
      case 12: return '6:00AM'
      case 13: return '6:30AM'
      case 14: return '7:00AM'
      case 15: return '7:30AM'
      case 16: return '8:00AM'
      case 17: return '8:30AM'
      case 18: return '9:00AM'
      case 19: return '9:30AM'
      case 20: return '10:00AM'
      case 21: return '10:30AM'
      case 22: return '11:00AM'
      case 23: return '11:30AM'
      case 24: return '12:00PM'
      case 25: return '12:30PM'
      case 26: return '1:00PM'
      case 27: return '1:30PM'
      case 28: return '2:00PM'
      case 29: return '2:30PM'
      case 30: return '3:00PM'
      case 31: return '3:30PM'
      case 32: return '4:00PM'
      case 33: return '4:30PM'
      case 34: return '5:00PM'
      case 35: return '5:30PM'
      case 36: return '6:00PM'
      case 37: return '6:30PM'
      case 38: return '7:00PM'
      case 39: return '7:30PM'
      case 40: return '8:00PM'
      case 41: return '8:30PM'
      case 42: return '9:00PM'
      case 43: return '9:30PM'
      case 44: return '10:00PM'
      case 45: return '10:30PM'
      case 46: return '11:00PM'
      case 47: return '11:30PM'
      case 48: return '12:00AM'
      case 49: return '12:30AM'
      case 50: return '1:00AM'
      case 51: return '1:30AM'
      case 52: return '2:00AM'
      case 53: return '2:30AM'
      case 54: return '3:00AM'
      case 55: return '3:30AM'
      case 56: return '4:00AM'
      case 57: return '4:30AM'
      case 58: return '5:00AM'
      case 59: return '5:30AM'
      case 60: return '6:00AM'
      case 61: return '6:30AM'
      case 62: return '7:00AM'
      case 63: return '7:30AM'
      case 64: return '8:00AM'
      case 65: return '8:30AM'
      case 66: return '9:00AM'
      case 67: return '9:30AM'
      case 68: return '10:00AM'
      case 69: return '10:30AM'
      case 70: return '11:00AM'
      case 71: return '11:30AM'
      case 72: return '12:00PM'
      case 73: return '12:30PM'
      case 74: return '1:00PM'
      case 75: return '1:30PM'
      case 76: return '2:00PM'
      case 77: return '2:30PM'
      case 78: return '3:00PM'
      case 79: return '3:30PM'
      case 80: return '4:00PM'
      case 81: return '4:30PM'
      case 82: return '5:00PM'
      case 83: return '5:30PM'
      case 84: return '6:00PM'
      case 85: return '6:30PM'
      case 86: return '7:00PM'
      case 87: return '7:30PM'
      case 88: return '8:00PM'
      case 89: return '8:30PM'
      case 90: return '9:00PM'
      case 91: return '9:30PM'
      case 92: return '10:00PM'
      case 93: return '10:30PM'
      case 94: return '11:00PM'
      case 95: return '11:30PM'
      case 96: return '12:00AM'
      case 97: return '12:30AM'
      case 98: return '1:00AM'
      case 99: return '1:30AM'
      case 100: return '2:00AM'
      case 101: return '2:30AM'
      case 102: return '3:00AM'
      case 103: return '3:30AM'
      case 104: return '4:00AM'
      case 105: return '4:30AM'
      case 106: return '5:00AM'
      default: return 'error'
  }
}

  renderTimeblocks() {
    const start = this.props.start;
    const end = this.props.end;
    const timeBlocks = [];
    for(let i = start; i <= end; i ++) {
        timeBlocks.push(
        <div key={i} className='timeBlock' id={i}> 
        {this.numberSwitch(i)}
        </div>
        )
    }
    return timeBlocks;
  }

  render() {
    return (
      <>
        <p className='schedule-header'>{this.props.day}</p>
        <div className='dayTimeline'>{this.renderTimeblocks()}</div>
      </>
    )
  }
}