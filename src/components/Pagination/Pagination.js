const Pagination = (props) =>{
    let pages = []

    for(let i = 1; i <= Math.ceil(props.totalItems/props.itemsPerPage); i++){
        pages.push(i)
    }
    
    return(
        <div className="container text-center mt-3">
            {pages.map((page, index) =>{
                return <button className="mx-1" onClick={() => props.setCurrentPage(page)} key={index}>{page}</button>
            })}
        </div>
    )
}

export default Pagination