export function getYMDFormatDate(d) {
  try {
    const year = d.getFullYear();
    const month = convertTenLessThanString(d.getMonth() + 1);
    const day = convertTenLessThanString(d.getDate());

    return `${year}-${month}-${day}`;  
  } catch (error) {
    return null;
  } 
  
}

export function getYMDAndTimeFormatDate(d) {
  const year = d.getFullYear();
  const month = convertTenLessThanString(d.getMonth() + 1);
  const day = convertTenLessThanString(d.getDate());

  const hour = convertTenLessThanString(d.getHours());
  const minute = convertTenLessThanString(d.getMinutes());
  const second = convertTenLessThanString(d.getSeconds());

  return `${year}-${month}-${day} ${hour}:00:00`;
}

function convertTenLessThanString(value) {
  if (value < 10) {
    return "0" + value
  }

  return value;
}