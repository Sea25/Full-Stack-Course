  // const course = {
  //   id: 1,
  //   name: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10,
  //       id: 1
  //     },
  //     {
  //       name: 'Using props to pass data',
  //       exercises: 7,
  //       id: 2
  //     },
  //     {
  //       name: 'State of a component',
  //       exercises: 14,
  //       id: 3
  //     }
  //   ]
  // }

const Course = ({course}) => {
    return (
      <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </>
    )
}
export default Course
const Header = ({name}) => {
    return <h2>{name}</h2>
}
const Content = ({parts}) => {
    return <>
    {parts.map(part=>
        <p key={part.id}>{part.name} {part.exercises}</p>
    )}
    </>
}
const Total = ({parts}) => {
    return <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
}