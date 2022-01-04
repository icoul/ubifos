import React from 'react';
import { EditableCellStyle } from './EditableCell.css';

const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  setUpdateData,
  selectedFlatRows
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    setUpdateData(
      selectedFlatRows.map((d, i) => {
        const data = d.original;
        
        if (data.index === index) {
          data[id] = value
          return data;
        }

        return data;
      })
    );
  }

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <EditableCellStyle type="text" value={value} onChange={onChange} onBlur={onBlur} />
}

export default EditableCell;