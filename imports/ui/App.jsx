import React from 'react';
import {Meteor} from 'meteor/meteor';
import DrugTable from './DrugTable';
import Plot from 'react-plotly.js'
import '../styles/_main.scss'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error:"",
      disease:"",
      pressed:false,
      drugs:[],
      agencies:[],
      recivedData:false
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }
  onInputChange(e) {
    this.setState({
      disease: e.target.value
    })
  }
  onButtonSubmit() {
    console.log(this.state.disease)
    if (!this.state.disease) {
      this.setState({
        error: "Error: Please enter a disease"
      })
    } else {
      this.setState({
        error:"",
        pressed:true
      })
      Meteor.call('runPythonCSV', this.state.disease, (err, results) => {
        const ans = JSON.parse(results);
        this.setState({
          drugs:ans[0],
          agencies:ans[1],
          pressed:false,
          recivedData:true
        })
      })
      // console.log(drugs)
    }
  }
  createPlotData(drugs) {
    let x = drugs.map(drug => drug[0])
    let y = drugs.map(drug => drug[1])
    return [{
      type:'bar',
      x:x,
      y:y
    }]
  }
  render() {
    return (
      <div className="App">
        <p>Enter a disease to see the top drugs used for that disease</p>
        <input type="text" value={this.state.disease} onChange={this.onInputChange}/>
        <button onClick={this.onButtonSubmit} disabled={this.state.pressed}>Submit</button>
        <p>{this.state.error ? <p className="error--p">{this.state.error}</p> : ""}</p>
        {this.state.pressed && <p>Loading...</p>}
        {this.state.recivedData &&
          <div>
            <div className="flex-div">
              <DrugTable drugs={this.state.drugs} />
              <Plot
                data={this.createPlotData(this.state.drugs)}
                layout={ {width: 580, height: 400, title:`Top 10 Primary Drugs`} }
              />
            </div>
            <hr></hr>
            <br></br>
            <h1>Top Clinical Research Agencies</h1>
            <ul>
              {this.state.agencies.map((agen) => {
                return <li>{agen[0]}</li>
              })}
            </ul>
          </div>
        }

      </div>
    );
  }
}

export default App;
