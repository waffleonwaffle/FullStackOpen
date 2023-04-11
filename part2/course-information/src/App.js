const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <span style={{ fontWeight: 'bold' }}><p>total of {sum} exercises</p></span>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>

  )
}

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part part={part}/>)}
  </>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log(courses[0].parts[0].name)

  return <div>{courses.map(course => <Course key={course.id} course={course} />)}</div>
}

export default App
