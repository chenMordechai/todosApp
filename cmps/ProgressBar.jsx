

export function ProgressBar ({todosLength,todosDoneLength}){
    console.log('todosDoneLength:', todosDoneLength)
    console.log('todosLength:', todosLength)
    if(!todosLength ) return ''
    const style ={
        width : todosDoneLength /todosLength * 100
    }

    return(
        <section>

        <h2>Progress Bar</h2>
        <div className="progress-bar">
            <div className="inside" style={style} ></div>
        </div>
        {todosDoneLength } / { todosLength}
        </section>
    )
}