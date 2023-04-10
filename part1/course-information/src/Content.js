import Part from "./Part"
const Content = ({course}) => {

    return (
        <section>
            {course.parts.map((part) => {
                return <Part part={part}/>
            })}
            
        </section>

    )
}
export default Content