import * as C from './styles'
import { ScheduleInfo } from '../ScheduleInfo'

export const Schedule = () => {
    return (
        <C.Container>
            <C.ScheduleDay>
                <h1>Programação do dia</h1>
            </C.ScheduleDay>
            <C.ScheduleArea>
                <ScheduleInfo/>
                <hr/>
                <ScheduleInfo/>
            </C.ScheduleArea>
        </C.Container>
    )
}

