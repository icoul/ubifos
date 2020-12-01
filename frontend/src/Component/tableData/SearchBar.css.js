import style from 'styled-components';

export const SearchBarConatiner = style.div`
  width: 95vw;
  margin: 15px 0px;
  padding: 0.5rem;
  border-radius: 10px;
  background: #1f242c;

  & > div.form-row {
    display: flex;
    justify-content: space-evenly;

    & > .search-condition {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #757e94;
      font-size: 20px;
      font-weight: bold;
    }
    
    & > .search-condition label {
      margin: 0px 10px 0px 0px;
    }
    
    & > .search-condition span {
      margin: 0px 10px;
    }
    
    & > .search-condition .table-search-input {
      width: 205px;
      height: 45px;
      padding: 0px 10px;
      margin: 0px 10px;
      color: #fff;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
      background: #1f242c;
      border: .5px solid #31373e;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

      & > option {
        font-size: 35px;
      }
    }
    
    & > .search-condition .table-search-submit {
      width: 200px;
      height: 30px;
      line-height: 1;
      font-size: 13px;
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
    }
  }
`;

