import { useEffect, useState } from "react";
import countryData from "./services/countries";

const Country = ({country}) => {
 return (
  <div>{country.name.common}</div>
 )
}
const Countries = ({ countries }) => {
  if (countries === null || countries.length > 10) {
    return <div>
      Too many matches, specify another filter
    </div>
  } else if (countries.length === 1) {
    return <div>
      <span><Country country={countries}/></span>
    </div>
  } else {
    return (
      <div>
        {countries.map(country => (
          <Country key={country.cca2}/>
        ))}
      </div>
    )
  }
} 

const App = () => {
  const [countries, setCountries] = useState(null)
  const [inputSubstring, setInputPrefix] = useState('')
  const handleInputChange = (event) => {
    setInputPrefix(event.target.value)
  }

  useEffect(() => {
    if (inputSubstring !== '') {
      countryData.getAllCountries().then(returnedData => {
        const filteredData = returnedData.filter(country => (country.name.common.toLocaleLowerCase()).includes(inputSubstring.toLocaleLowerCase()))
        setCountries(filteredData)
      })
    }
  }, [inputSubstring])
  return (
    <div className="App">
      find countries
      <input value={inputSubstring} onChange={handleInputChange}></input>
      <Countries countries={countries} />
    </div>
  );
}

export default App;
