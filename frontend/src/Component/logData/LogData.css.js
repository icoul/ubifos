import style, { css } from 'styled-components'

export const LogDataContainer = style.div`
  padding-top: 1vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  & > table {
    width: 95vw;
    border-spacing: 0;

    thead {
      tr {
        border-top: 2px solid #98989815;
        border-top-style: inset;
        border-bottom: 2px solid #98989815;
        border-bottom-style: inset;

        & > th {
          width: 12%;
        }
    
        & > th:nth-child(1) {
          width: 4%;
        }
      },
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    },
    th {
      font-size: 14px;
      text-align: center;
      margin: 0;
      padding: 0.5rem;
      background: #1f242c;
      color: #7b818a;
      font-size: 23px;
      :last-child {
        border-right: 0;
      }
    },
    td {
      color: #fff;
      margin: 0;
      padding: 0.5rem;
      background: #1f1b1b;
      border-bottom: 1px solid #98989815;
      font-size: 16px;
      :last-child {
        border-right: 0;
      }
      & > div > button {
        font-size: 12px;
        background-color: #3d4a5c;
        border-width: 0px;
        padding: .375rem 1.5rem;
      }
    }
    td.btnBox {
      width: 150px;
    }
  }

  & > div.page_box {
    display: flex;
    margin: 15px 0px;

    & > button {
      width: 40px;
      font-size: 35px;
    }
  }
`
export const PageButton = style.div`
  vertical-align: middle;
  width: fit-content;
  padding: 4px;
  border-radius: 5px;
  margin: 0px 20px;
  cursor: pointer;
  text-align: center;
  color: #757e94;
  font-size: 35px;

  ${props =>
    props.selected &&
    css`background: #272F3C`
  }
`