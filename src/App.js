import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import papa from "papaparse";

function App() {

  
  const googleSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQD6NhDM4K2Hh3e7rX1CJerCxlyR3si1McyqKmX67rPptyoJEoZ9ZjufnCItvbLDTr4JIExSaxQ_1A2/pub?output=csv"
  

  const [carsData , setCarsData] = useState([]);

  function prepareJsonData(data){
    const json = data.map((line, index) => {
  if (index > 0) {
    let obj = {}
    data[0].forEach((el, j) => (obj = { ...obj, [el]: line[j] }))
    return obj;
  }
})
json.shift()
setCarsData(json) //The state methods
  }

  useEffect(() => {
    axios.get(googleSheet).then((reponse) => {
     let data =  papa.parse(reponse.data).data

     prepareJsonData(data)
     
    })
  }, [])

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>company</th>
            <th>company city</th>
            <th>company email</th>
            <th>company phone</th>
            <th>car marker</th>
            <th>car model</th>
            <th>car year</th>
            <th>car vin</th>

          </tr>
        </thead>
      {carsData.slice(0 , 100).map((car) => (
        <tr>
          <td>{car.company}</td>
          <td>{car.company_city}</td>
          <td>{car.company_email}</td>
          <td>{car.company_phone}</td>
          <td>{car.car_marker}</td>
          <td>{car.car_model}</td>
          <td>{car.car_year}</td>
          <td>{car.car_vin}</td>

        </tr>
      ))}
      </table>
    </div>
  );
}

export default App;
