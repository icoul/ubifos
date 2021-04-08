import style, { css } from 'styled-components'

export const ControlContainer = style.div`
  padding-top: 1vh;

  & > table {
    width: 100%;
    border-collapse: collapse;

    & thead > tr.top_legend_box {
      height: 7vh;
      margin-bottom: .9vh;
  
      & > th {
        font-weight: initial;
        font-size: 30pt;
        border: #fff solid 1px;
        color: #fff;
      }
  
      & > th.sign {
        width: 16%;
        font-size: 50pt;
      }
    }
  
    & tbody > tr {
      ${props => props.flag ? css`height: 18.4vh;` : css`height: 6vh;`}
  
      & > td {
        font-size: 40px;
        color: #fff;
        border-left-width: .5px;
        border-right-width: .5px;
        border-right-color: #ababab;
        border-left-color: #ababab;
        border-style: groove;

        border-top: 5px #fff solid;
        border-bottom: 5px #fff solid;
        border-top-style: double;
        border-bottom-style: double;
  
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

            & > div.alarm-off-text {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              z-index: 10;

              & > span {
                font-size: 20px;
              }
            }
          }
        }
      }
  
      & > .data_value {
        ${props => props.flag ? css`font-size: 140px;` : css`font-size: 120px;`}

        ${props => !props.flag && css`
          border-top: 1px #fff solid;
          border-bottom: 1px #fff solid;
          border-top-style: solid;
          border-bottom-style: solid;
        `}
        
  
        & sub {
          vertical-align: initial;
          font-size: 35px;
        }
      }

      & > .danger {
        animation: colorRedFlash 1s ease infinite;
      }

      & > .module-value {
        font-size: 25px;
        border-bottom: 5px #fff solid;
        border-bottom-style: double;
        border-top: 0px #fff solid;
      }
    }
  
    & tbody > tr:nth-child(1) {
      height: 6.5vh;
    }
  }
`