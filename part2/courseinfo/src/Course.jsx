const Course = ({course}) => {
    
    return (
      <div>
        <h2>{course.name}</h2>
        <div>
          {course.parts.map(part => <Part part={part}/>)}
        </div>
        <b>total of {course.parts.reduce((sum,part) => sum + part.exercises,0)} exercises</b>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
export default Course
