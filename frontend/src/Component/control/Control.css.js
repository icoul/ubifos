import style from 'styled-components'

export const ControlContainer = style.div`
  padding-top: 1vh;

  & > div.top_legend_box {
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: .9vh;

    & > div {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35pt;
      border: #fff solid 1px;
      color: #fff;
    }
  }

  & > div.data_box {
    height: 22.5vh;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > div {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 45px;
      border: #fff solid 1px;
      color: #fff;

      & > svg {
        fill: #ff0000;
      }
    }

    & > .module_name_box {
      & > .module_status {
        width: 50%;

        & > img {
          width: 150px;
        }
      }
      & > .module_name {
        width: 50%;
      }
    }

    & > .data_value {
      font-size: 150px;

      & sub {
        vertical-align: initial;
        font-size: 45px;
      }
    }
  }

  & div.data_box:nth-child(2) {
    height: 10.5vh;

    & sub {
      vertical-align: initial;
      font-size: 25px;
    }
  }

`