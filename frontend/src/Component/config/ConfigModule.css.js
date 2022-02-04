import styled, { css } from "styled-components";

export const Styles = styled.div`
  height: 77vh;
  margin-top: 0px;
  padding: 1rem;
  background: #292929;
  border-radius: 10px;

  .tableContainer {
    display: flex;
    justify-content: center;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 1%;
    background: #1f1b1b;

    table.configModuleTable {
      width: 95vw;
      border-spacing: 0;
      thead.cmTableHead {
        tr {
          border-top: 2px solid #98989815;
          border-top-style: inset;
          border-bottom: 2px solid #98989815;
          border-bottom-style: inset;
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
        background: none;
        border-bottom: 1px solid #98989815;
        font-size: 22px;
        :last-child {
          border-right: 0;
        }
        & > div.btnWrap {
          button.btn {
            color: #fff;
            font-size: 12px;
            background-color: #3d4a5c;
            border-width: 0px;
            padding: .375rem 1.5rem;
            border-radius: 0.25rem;
          }

          button.btn:hover {
            cursor: pointer;
          }
        }

        ${(props) =>
          props.tableType === "editable" &&
          css`
            height: 45px;
          `}
      }
      td.btnBox {
        width: 150px;
      }
    }
  },
`;