export const updateCriterionDataValidate = (data) => {
  const check = (criterionValue) => {
    if (criterionValue.standVal !== '' && isNaN(Number(criterionValue.standVal))) {
      return true;
    }
  };

  const result = data.filter(map => map.criterionValueList.filter(criterionValue => check(criterionValue)).length > 0);
  
  return result.length > 0;    
};

export const updateCriterionDataValidateByMain = (data) => {
  const check = (criterionValue) => {
    if (criterionValue.standVal !== '' && isNaN(Number(criterionValue.standVal))) {
      return true;
    }
  };

  const result = data.filter(map => check(map)).length;
  
  return result > 0;    
};