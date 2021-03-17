import * as types from '../types/game'

export function generateRounds({ numberOfDays, marketHoursDuration, afterHoursDuration}: types.GameConfig, startTime: number): types.Round[] {
    const rounds: types.Round[] = []
  
    for (let i = 0; i < numberOfDays; i++) {
      rounds.push(
        // market hours
        {
          id: i * 2,
          day: i + 1,
          startTime,
          endTime: startTime += marketHoursDuration
        },
        // after hours
        {
          id: i * 2 + 1,
          day: i + 1,
          startTime,
          endTime: startTime += afterHoursDuration
        },
      )
    }
  
    return rounds
  }
  