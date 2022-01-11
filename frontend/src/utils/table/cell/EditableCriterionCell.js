import React from 'react';
import { EditableCriterionCell, EditableCriterionCellSelect } from './EditableCriterionCell.css.js';

const EditableCell = ({ cell: { value: initialValue }, column: { id }, setData }) => {
  // We need to keep and update the state of the cell normally
  const [criterions, setCriterions] = React.useState(initialValue);
  const onChange = (idx, key, value) => {
    setCriterions((criterions) => {
      return criterions.map((data) => {
        if (data.criterionValueIdx === idx) {
          return {
            ...data,
            [key]: value,
          };
        } else {
          return data;
        }
      });
    });
  };

  // We'll only update the external data when the input is blurred
  const onBlur = (idx) => {
    setData((data) => {
      return data.map((data) => {
        return {
          ...data,
          criterionValueList: data.criterionIdx === idx ? criterions : data.criterionValueList,
        };
      });
    });
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setCriterions(initialValue);
  }, [initialValue]);

  return (
    <>
      {criterions.map((data) => {
        if (data.standType === id) {
          return (
            <div key={data.criterionValueIdx}>
              {/* <EditableCriterionCell type="text" 
                                   value={data.standName} 
                                   onChange={({target: { value }}) => { onChange(data.criterionValueIdx, 'standName', value) }} 
                                   onBlur={() => { onBlur(data.criterionIdx) }} /> */}
              <EditableCriterionCell
                type="text"
                value={data.standVal}
                onChange={({ target: { value } }) => {
                  onChange(data.criterionValueIdx, 'standVal', value);
                }}
                onBlur={() => {
                  onBlur(data.criterionIdx);
                }}
              />
              <EditableCriterionCellSelect
                value={data.standRange}
                onChange={({ target: { value } }) => {
                  onChange(data.criterionValueIdx, 'standRange', value);
                }}
                onBlur={() => {
                  onBlur(data.criterionIdx);
                }}
              >
                <option value="A">초과</option>
                <option value="B">이상</option>
                <option value="C">이하</option>
                <option value="D">미만</option>
              </EditableCriterionCellSelect>
            </div>
          );
        }
      })}
    </>
  );
};

export default EditableCell;
