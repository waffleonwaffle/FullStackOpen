const Total = ({course}) => {
    const totalExercises = course.parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)
    return (
        <p>Number of exercises {totalExercises}</p>
    )
}
export default Total