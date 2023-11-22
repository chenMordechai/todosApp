

export function ProgressBar ({todosLength,todosDoneLength}){
    if(!todosLength ) return ''
    const style ={
        width : todosDoneLength /todosLength * 100
    }

    return(
        <section>
        <div className="progress-bar">
            <div className="inside" style={style} ></div>
        </div>
        {todosDoneLength } / { todosLength}
        </section>
    )
}