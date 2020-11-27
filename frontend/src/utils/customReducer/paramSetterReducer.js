const paramSetterReducer = (state, action) => {
  switch (action.type) {
    case 'PAGE_SELECT':
      return {
        ...state,
        pageIndex: action.pageIndex 
      }
    case 'CHANGE_TOTAL':
      return {
        ...state,
        pageCount: action.pageCount,
        elementCount: action.elementCount
      }
    case 'CHANGE_CANPAGE':
      return {
        ...state,
        canNextPage: action.canNextPage,
        canPreviousPage: action.canPreviousPage
      } 
    default:
      return state;
  }
}

export default paramSetterReducer;