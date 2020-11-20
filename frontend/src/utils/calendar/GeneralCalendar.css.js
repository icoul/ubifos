import styled, { css } from 'styled-components';

export const CalendarStyle = styled.div`
  position: absolute;
  z-index: 10;
  ${props => css`left: ${props.position.left}px; top: ${props.position.top}px;`}
  ${props =>
    props.showFlag ?
      css`display: block;` : css`display: none;`
  }

  .react-calendar {
    min-width: 700px;
    padding: 10px;
    background: #272F3C;
    border: 2px solid #202123;
    border-radius: 10px;

    abbr[title],
    .react-calendar__navigation button,
    .react-calendar__tile,
    .react-calendar__month-view__days__day {
      font-size: 45px;
      color: #fff;
      text-decoration: none;
    }

    .react-calendar__navigation button:enabled,
    .react-calendar__navigation button:enabled,
    .react-calendar__tile,
    .react-calendar__month-view__days__day {
      background-color: #252525;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus,
    .react-calendar__navigation button[disabled],
    .react-calendar__tile:hover,
    .react-calendar__month-view__days__day:hover {
      background-color: #3a3a3a;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      color: #757575;
    }

    .react-calendar__month-view__days__day--weekend {
      color: #d10000;
    }
  }
`

export const ReactCalendarBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  background: #000;
  opacity: 0;

  ${props =>
    props.showFlag ?
      css`display: block;` : css`display: none;`
  }
`