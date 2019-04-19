import React from 'react'
import DrugTableItem from './DrugTableItem'
const DrugTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Drug</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {props.drugs ? props.drugs.map((drug, i) => {
          return <DrugTableItem key={i} drug={drug}/>
        }) : (<tr>
              <td>No data</td>
            </tr>)}
      </tbody>
    </table>
  )
}
export default DrugTable;
