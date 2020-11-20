import style from 'styled-components';

export const SearchBarConatiner = style.div`
  width: 95vw;
  margin: 15px 0px;
  padding: 0.5rem;
  border-radius: 10px;
  background: #19213e;

  & > div.form-row {
    display: flex;

    & > .search-condition {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #757e94;
      font-size: 14px;
      font-weight: bold;
    }
    
    & > .search-condition label {
      margin: 0px 10px 0px 0px;
    }
    
    & > .search-condition span {
      margin: 0px 10px;
    }

    & > .search-condition button {
      width: 100px;
      height: 30px;
      background: #0794d8;
      border-radius: 3px;
      color: #fff;
      border: 0px solid;
    }
    
    & > .search-condition .table-search-input {
      width: 180px;
      height: 28px;
      padding: 0px 10px;
      margin: 0px 10px;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      background: #171e3a;
      border: .5px solid #31373e;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

      & > option {
        font-size: 20px;
      }
    }
    
    & > .search-condition .table-search-submit {
      width: 200px;
      height: 30px;
      line-height: 1;
      font-size: 13px;
    }
  }
`;

