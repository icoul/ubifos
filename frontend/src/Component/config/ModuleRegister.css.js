import style from 'styled-components';

export const FormContainer = style.div`
  width: 75vw;
  margin-left: 15px;

  & > div.form-container {
    border-radius: 5px;
    background: #2f3b49;
    margin: 10px;
    padding: .8rem;

    & > .table-form {
      display: flex;
      align-items: center;
      color: #757e94;
      font-size: 20px;
      font-weight: bold;
      position: relative;

      & > table {
        & > tbody {
          & > tr {
            & > td {
              & > input {
                font-size : 18px;
                line-height : 25px;
                text-align: center;
                vertical-align: bottom;
              }

              & > input.nonEditable {
                background-color: #aaa;
                border: 1px solid #777;
              }
            }
          }
        }
      }

      & > .uploadBox {
        position: absolute;
        top: -13px;
        right: -80px;

        & > button {
          width: 60px;
          height: 92px;
          margin-left: 20px;
          background: #2f3b49;
          border: none;
          border-radius: 5px;

          & > svg {
            width: 40px;
            height: 40px;
            fill: #fff;
          }

          & > svg:hover {
            fill: #aaa;  
            cursor: pointer;
          }

          & > svg:active {
            fill: #ff0000;
          }
        }
      }
    }
  }
`;