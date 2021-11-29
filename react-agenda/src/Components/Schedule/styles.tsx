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

export const ScheduleDay= styled.div`
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
`

export const ScheduleArea = styled.div`
    background-color: #CEF5FF;
    margin-top: 20px;
    height: 320px;
    padding: 0px 20px;
    border: solid 2px;
    border-radius: 5px;
    border-color: #01B6E6;
    color: #696969;
    h2 {
        font-weight: 600;
        margin-bottom: 0px;
    }

    span {
        text-decoration: underline;
    }

    p {
        margin: 10px 0px;
        font-weight: 500;
    }

    hr {
        margin: 20px 0px;
        border: none;
        height: 1px;
        color: #01B6E6;;
        background-color: #01B6E6;
    }
`