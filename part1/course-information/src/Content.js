import Part from "./Part"
const Content = ({parts}) => {

    return (
        <section>
            {parts.map((part) => {
                return <Part part={part}/>
            })}
            
        </section>

    )
}
export default Content