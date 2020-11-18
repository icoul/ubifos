import style from 'styled-components'

export const AppHeaderContainer = style.div`
  background-color: #292929;
  min-height: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  & > div.header_logo { flex: 2; min-width: 150px; display: flex; justify-content: flex-start; align-items: center; padding: 15px; }
  & > div.header_title {     
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
    font-weight: bold;
    color: #ffee00; 
  }
  & > div.header_buttons { 
    flex: 2; 
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff; 

    & > div.button_box {
      width: 108px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > svg {
        width: 60px;
        height: 60px;
      }
    }
  }
`;

export const MainContainer = style.div`
  height: 90vh;
  background: #292929;
`;