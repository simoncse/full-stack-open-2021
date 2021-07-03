import Button from "./Button";

const CountriesAvailable = ({countries,handleClick}) => {
   
    return ( 
    countries.map(country => 
    <div key={country.numericCode}>
    {country.name}
    <Button handleClick={handleClick} value={country.name} />
    </div>
    )
    )
}
 
export default CountriesAvailable ;