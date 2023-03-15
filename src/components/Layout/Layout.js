const Layout = (props) =>{
    return(
        <div>
            <div>{props.logo}</div>
            <div>{props.menu}</div>
            <div>{props.content}</div>
            <div>{props.footer}</div>
        </div>
    )
}

export default Layout