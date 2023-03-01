const Layout = (props) =>{
    return(
        <div>
            <div>{props.logo}</div>
            <div>{props.menu}</div>
            <div>{props.content}</div>
        </div>
    )
}

export default Layout