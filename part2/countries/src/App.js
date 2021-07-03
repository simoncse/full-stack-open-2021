import React, {useState, useEffect} from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
import CountriesAvailable from "./components/CountriesAvailable";

const App = () => {
  
  const [countries, setCoutries] = useState([])
  const [filter, setFilter] = useState('')
  const [display, setDisplay] = useState('')

  const handleFilter = e => {
    setFilter(e.target.value.toLowerCase())
  }

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCoutries(response.data)
    })
    }, [])

  useEffect(()=> {
    const filteredList = filter ? 
    countries.filter(country => 
      country['name'].toLowerCase().includes(filter))
    : []
    
    const handleClick = (e) => {
      const selectedCountry = e.target.value
      setDisplay(filteredList.filter(country => country.name === selectedCountry)
      .map(country => (<CountryInfo key = {country.numericCode} country = {country}/>)))
    }
    
    filteredList.length > 10 
    ? setDisplay('Too many matches, specify another filter')
    : filteredList.length === 1
    ? setDisplay(filteredList.map(
      country => (<CountryInfo  key = {country.numericCode} country = {country}/>))
      )
    : setDisplay (<CountriesAvailable  countries={filteredList} handleClick={handleClick}/>)
    }, [countries,filter])
    
  
  
  return (
    <>
    <div>
      find countries
      <input type="text" onChange={handleFilter} />
    </div>
    {display}
    </>
  )
}

export default App;
