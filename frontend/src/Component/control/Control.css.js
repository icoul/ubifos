import style from 'styled-components'

export const ControlContainer = style.div`
  padding-top: 1vh;

  & > table {
    width: 100%;
    border-collapse: collapse;

    & thead > tr.top_legend_box {
      height: 10vh;
      margin-bottom: .9vh;
  
      & > th {
        font-weight: initial;
        font-size: 35pt;
        border: #fff solid 1px;
        color: #fff;
      }
  
      & > th.sign {
        width: 16%;
        font-size: 55pt;
      }
    }
  
    & tbody > tr {
      height: 22vh;
      border-top: 5px #fff solid;
      border-bottom: 5px #fff solid;
      border-top-style: double;
      border-bottom-style: double;
  
      & > td {
        font-size: 45px;
        color: #fff;
        border-top-width: 0px;
        border-bottom-width: 0px;
        border-left-width: .5px;
        border-right-width: .5px;
        border-right-color: #ababab;
        border-left-color: #ababab;
        border-style: groove;
  
        & > svg {
          fill: #ff0000;
        }
        & > span {
          font-size: 25px;
        }
      }
  
      @keyframes hideshow {
        0% { opacity: 0.3; }
        70% { opacity: 1; }
        100% { opacity: 0.3; }
      } 

      @keyframes colorRedFlash {
        0% { color: #fff; }
        50% { color: #fff; }
        51% { color: #ff0000; }
        100% { color: #ff0000; }
      } 
  
      & > .module_status_box {
        & > .module_status {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
  
          & img {
            width: 150px;
          }
  
          & > div.module_status_lamp {
            position: absolute;
            width: 100%;
            height: 150px;
  
            & > .danger {
              animation: hideshow 1s ease infinite;
            }
          }
        }
      }
  
      & > .data_value {
        font-size: 150px;
  
        & sub {
          vertical-align: initial;
          font-size: 35px;
        }
      }

      & > .danger {
        animation: colorRedFlash 1s ease infinite;
      }
    }
  
    & tbody > tr:nth-child(1) {
      height: 11.5vh;
    }
  }
`