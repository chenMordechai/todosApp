

export function ProgressBar ({todosLength,todosDoneLength}){



    const style ={
        width : todosDoneLength /todosLength * 100
    }

    if(!todosLength ) return ''
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