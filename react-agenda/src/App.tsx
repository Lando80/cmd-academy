import { useState } from 'react'
import * as C from './App.styles'
import { Calendar } from './Components/Calendar'
import { Schedule } from './Components/Schedule' 
import { getCurrentMonth } from './helpers/dateFilter'


const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  return (
    <C.Container>
      <C.Area>
        <Calendar 
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
        />
        <Schedule />
      </C.Area>
    </C.Container>
  )
}

export default App