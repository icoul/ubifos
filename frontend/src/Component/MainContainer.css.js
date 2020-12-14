import style from 'styled-components'

export const AppHeaderContainer = style.div`
  background-color: #292929;
  max-width: 100vw;
  min-height: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  overflow-x: hidden;

  & > div.header_logo { 
    flex: 2; 
    min-width: 150px; 
    display: flex; 
    justify-content: flex-start; 
    align-items: center; 
    padding: 15px; 
    color: #fff;

    & > div {
      width: 100%;
    }
  }
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
      font-size: 20px;
      word-break: break-all;

      & > svg {
        width: 60px;
        height: 60px;
      }
      
      & > svg:active {
        fill: #ff0000;
      }
    }
  }
`;

export const MainContainer = style.div`
  max-width: 100vw;
  height: 90vh;
  background: #292929;
  overflow-y: scroll;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: #292929;
  }
`;