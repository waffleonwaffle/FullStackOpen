const Total = ({parts}) => {
    const totalExercises = parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)
    return (
        <p>Number of exercises {totalExercises}</p>
    )
}
export default Total