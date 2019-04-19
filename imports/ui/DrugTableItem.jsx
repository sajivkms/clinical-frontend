import React from 'react'

const DrugTableItem = (props) => {
  return (
    <tr>
      <td>{props.drug[0]}</td>
      <td>{props.drug[1]}</td>
    </tr>
  )
}
export default DrugTableItem;
