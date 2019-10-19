import React from 'react'


const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}

const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}


const Content = (props) => {

    const parts = () => props.parts.map(part =>
        <Part key={props.parts.indexOf(part)} part={part.name} exercises={part.exercises}
        />
    )
    return (
        <div>
            {parts()}
        </div>
    )
}

const Total = ({ parts }) => {

    const list = parts.map(part => part.exercises)
    const total = list.reduce((s, p) => s + p)

    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

const Course = ({ courses }) => {

    const allCourses = () => courses.map(course =>
        <div>
        <Header key={courses.indexOf(course)} name={course.name} />
        <Content key={courses.indexOf(course)} parts={course.parts} />
        <Total key={courses.indexOf(course)} parts={course.parts} /> 
        </div>
    ) 

    return (
        <div>
            {allCourses()}
        </div>
    )
}
  
export default Course
