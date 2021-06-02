import style, { css } from 'styled-components'

export const LocationContainer = style.div`
  padding-top: 1vh;

  & > div.map {
    width: 100%;
    height: 89vh;
  }

  & > div.map-fail-msg-container {
    height: 89vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > div.map-fail-msg {
      color: #fff;
      font-size: 35px;
      margin-bottom: 15px;
    }

    & > div > button.btn {
      width: 100px;
      font-size: 20px;
      padding: 15px;
      background: #134b77;
      color: #fff;
      border-radius: 8px;
      border-width: 0px;
      cursor: pointer;
    }
  }
`