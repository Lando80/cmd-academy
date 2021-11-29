import styled from 'styled-components'

export const Container = styled.div`
    background-color: #F0F0F0;  
    height: 400px;
    width: 400px;
    padding: 20px;
    box-shadow: 2px 2px 5px #CCC;
    font-family: 'Rajdhani', sans-serif;
    h1 {
        font-size: 1.8rem;
    }
`

export const Month = styled.div`
    background-color: #00CAFF;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 50px;
    border: solid 2px;
    border-radius: 10px;
    border-color: #01B6E6;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export const MonthArrow = styled.div`
    width: 40px;
    text-align: center;
    cursor: pointer;
`

export const DayWeek = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
    p {
        margin: 0px;
        color: #696969;
        font-size: 1.2rem;
    }
`

export const Week = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 10px 0px;
    width: 100%;
`
export const Day = styled.div`
    align-items: center;
    display: flex;
    height: 45px;
    width: 45px;
    border: 1.0px #006C88 solid;
    border-radius: 50%;
    color: #00CAFF;
    justify-content: center;
    font-size: 1.2rem;
    transition: 0.5s;
    :hover {
        color: white;
        background-color: #00CAFF;
    }
`


