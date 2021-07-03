import Person from './Person'

const Phonebook = ({filter,persons}) => {
    return ( 
    <div>
        {filter
        ? persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => ( 
            < Person person = {person} />))
        : persons.map(person => ( 
          <div key = {person.name}>
            < Person person = {person} />
          </div>))
        }     
    </div>
     );
}
 
export default Phonebook;