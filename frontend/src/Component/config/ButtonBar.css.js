import style from 'styled-components';

export const ButtonBarConatiner = style.div`
  width: 97vw;
  margin: 15px auto 10px auto;
  padding: 0.5rem;
  border-radius: 5px;
  background: #1f1b1b;

  & > div.buttonBar-container {
    
    & > .search-condition {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #757e94;
      font-size: 20px;
      font-weight: bold;
    }

    & > .csv-btn {
      width: 150px;
      height: 40px;
      background: #0794d8;
      border-radius: 3px;
      color: #fff;
      border: 0px solid;
      font-size: 20px;
      text-decoration: initial;
      margin-left: 20px;
    }

    & > .csv-btn:hover {
      cursor: pointer;
    }

  }
`;

