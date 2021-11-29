import { formatCurrentMonth } from '../../helpers/dateFilter'
import * as C from './styles'

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
}

export const Calendar = ({ currentMonth, onMonthChange }: Props) => {

    const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-')
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        currentDate.setMonth(currentDate.getMonth() -1)
        onMonthChange(`${currentDate.getFullYear()}  -${currentDate.getMonth() + 1}`)
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-')
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        currentDate.setMonth(currentDate.getMonth() + 1)
        onMonthChange(`${currentDate.getFullYear()} - ${currentDate.getMonth() + 1}`)
    }

    return (
        <C.Container>
            <C.Month>
                <C.MonthArrow onClick={handlePrevMonth}><i className="fas fa-arrow-circle-left modify_icon"></i></C.MonthArrow>
                <h1>{formatCurrentMonth(currentMonth)}</h1>
                <C.MonthArrow onClick={handleNextMonth}><i className="fas fa-arrow-circle-right modify_icon "></i></C.MonthArrow>
            </C.Month>
            <C.DayWeek>
                <p>DOM</p> 
                <p>SEG</p> 
                <p>TER</p> 
                <p>QUA</p> 
                <p>QUI</p> 
                <p>SEX</p> 
                <p>SÁB</p> 
            </C.DayWeek>
            <C.Week>
                <C.Day>-</C.Day>
                <C.Day>-</C.Day>
                <C.Day>-</C.Day>
                <C.Day>1</C.Day>
                <C.Day>2</C.Day>
                <C.Day>3</C.Day>
                <C.Day>4</C.Day>
            </C.Week>
            <C.Week>
                <C.Day>5</C.Day>
                <C.Day>6</C.Day>
                <C.Day>7</C.Day>
                <C.Day>8</C.Day>
                <C.Day>9</C.Day>
                <C.Day>10</C.Day>
                <C.Day>11</C.Day>
            </C.Week>
            <C.Week>
                <C.Day>12</C.Day>
                <C.Day>13</C.Day>
                <C.Day>14</C.Day>
                <C.Day>15</C.Day>
                <C.Day>16</C.Day>
                <C.Day>17</C.Day>
                <C.Day>18</C.Day>
            </C.Week>
            <C.Week>
                <C.Day>19</C.Day>
                <C.Day>20</C.Day>
                <C.Day>21</C.Day>
                <C.Day>22</C.Day>
                <C.Day>23</C.Day>
                <C.Day>24</C.Day>
                <C.Day>25</C.Day>
            </C.Week>
            <C.Week>
                <C.Day>26</C.Day>
                <C.Day>27</C.Day>
                <C.Day>28</C.Day>
                <C.Day>29</C.Day>
                <C.Day>30</C.Day>
                <C.Day>31</C.Day>
                <C.Day>-</C.Day>
            </C.Week>
        </C.Container>
    )
}