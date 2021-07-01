const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((s,p)=> 
    {return s + p.exercises}
    ,0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p key = {props.id}>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
        <Part key = {part.id} part={part} />        
        )}
  
      </div>
    )
  }
  
  const Course = ({course})=>{
    return (
      <div key = {course.key}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  

export default Course;