import Part from "./Part"
const Content = ({part1, part2, part3}) => {
    return (
        <section>
            <Part part={part1}/>
            <Part part={part2}/>
            <Part part={part3}/>
        </section>

    )
}
export default Content