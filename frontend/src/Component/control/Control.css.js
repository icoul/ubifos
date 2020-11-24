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
  
      & > td {
        font-size: 45px;
        border: #fff solid 1px;
        color: #fff;
  
        & > svg {
          fill: #ff0000;
        }
      }
  
      & > td.module_name_box {
        flex: .5;
      }
  
      @keyframes hideshow {
        0% { opacity: 0.3; }
        70% { opacity: 1; }
        100% { opacity: 0.3; }
      } 
  
      & > .module_status_box {
        flex: .7;
  
        & > .module_status {
          position: relative;
  
          & img {
            width: 150px;
          }
  
          & > div.module_status_lamp {
            position: absolute;
            width: 100%;
  
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
          font-size: 45px;
        }
      }
    }
  
    & tbody > tr:nth-child(1) {
      height: 11.5vh;
    }
  }
`