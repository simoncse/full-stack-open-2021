const Person = ( {person,handleDelete} ) => {
  return ( 
  <>
  {person.name} {person.number}{" "}
  <button type="submit" onClick = {()=>handleDelete(person.id, person.name)}> delete</button>
  </>);
}


const Phonebook = ({filter,persons, handleDelete}) => {
    return ( 
    <div>
        {filter
        ? persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => ( 
            <div key = {person.name}>
              < Person person = {person} handleDelete={handleDelete}/>
            </div>))
        : persons.map(person => ( 
          <div key = {person.name}>
            < Person person = {person} handleDelete={handleDelete}/>
          </div>))
        }     
    </div>
     );
}
 
export default Phonebook;