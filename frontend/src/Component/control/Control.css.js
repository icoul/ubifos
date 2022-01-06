import style, { css } from "styled-components";

export const ControlContainer = style.div`
  padding-top: 1vh;

  & > table {
    width: 100%;
    border-collapse: collapse;

    & thead > tr.top_legend_box {
      height: 4vh;
      margin-bottom: .9vh;
  
      & > th {
        font-weight: initial;
        font-size: 30pt;
        border: #fff solid 1px;
        color: #fff;
      }
  
      & > th.sign {
        width: 15%;
        font-size: 50pt;
      }

      & > th.communication-info {
        font-size: 15pt;
      }
    }
  
    & tbody > tr {
      ${(props) =>
        props.flag
          ? css`
              height: 18.4vh;
            `
          : css`
              height: 6vh;
            `}
  
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

      @keyframes colorYelloFlash {
        0% { color: #fff; }
        50% { color: #fff; }
        51% { color: #ffff00; }
        100% { color: #ffff00; }
      } 

      & > .module_name_box {
        & > form {
          & > .moduleName {
            & > .inputModelNm {
              width : 90%;
              color : #fff;
              font-size : 40px;
              text-align : center;
              background : transparent;
              border : none;
            }
          }
          & > .editBox {
            & > button {
              background: transparent;
              border: none;
              
              & > svg {
                width : 40px;
                height : 40px;
                fill: #fff;
              }

              & > svg:hover {
                fill: #aaa;
              }

              & > svg:active {
                fill: #ff0000;
              }
            }
          }
        }
      }
  
      & > .module_status_box {
        & > .module_status {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
  
          & img {
            width: 191px;
          }
  
          & > div.module_status_lamp {
            position: absolute;
            width: 100%;
            height: 190px;
  
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
        font-size: 120px;
  
        & sub {
          vertical-align: initial;
          font-size: 35px;
        }
      }

      & > .communication-info {
        font-size: 35pt;
        border-top: 2px #fff solid;
      }

      & > .danger {
        animation: colorRedFlash 1s ease infinite;
      }

      & > .warning {
        animation: colorYelloFlash 1s ease infinite;
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
`;
