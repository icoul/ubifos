import styled, { css } from "styled-components";

export const Styles = styled.div`
  height: 77vh;
  margin-top: 0px;
  padding: 1rem;
  background: #292929;
  border-radius: 10px;
  .table-container {
    display: flex;
    justify-content: center;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 1%;
    table {
      width: 95vw;
      border-spacing: 0;
      thead {
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
        & > div > button {
          font-size: 12px;
          background-color: #3d4a5c;
          border-width: 0px;
          padding: .375rem 1.5rem;
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

export const PageNation = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  padding: 10px 40px;
  margin: 0 auto;
  background: #1a2737;
  border-radius: 10px;

  ${(props) =>
    props.pageNumberRangeCount === 0 &&
    css`
      display: none;
    `}
`;

export const NextPrevButton = styled.button`
  background-color: #1a2737;
  border: none;
  color: #60687d;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  ${(props) =>
    props.disabled &&
    css`
      display: none;
    `}
`;

export const PageButton = styled(`div`)`
  vertical-align: middle;
  width: fit-content;
  padding: 4px;
  border-radius: 20px;
  margin: 0px 5px;
  cursor: pointer;
  text-align: center;
  color: #757e94;

  ${(props) =>
    props.selected &&
    css`
      background: #272f3c;
    `}
`;
