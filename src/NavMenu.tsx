import React, {FC, Fragment, MouseEventHandler, ReactElement, useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"

interface NavMenuProps extends React.HTMLProps<HTMLDivElement> {
    items: NavMenuItem[]
}

export interface NavMenuItem {
    key:string,
    label:string,
    icon?:ReactElement,
    click?:MouseEventHandler<HTMLLIElement>
    href?:string
    divider?:boolean
}

const NavMenu:FC<NavMenuProps> = ({items}) => {

    const [activeItem, setActiveItem] = useState<string>("")

    const location = useLocation()

    useEffect(() => {
        items.map((item) => {
            if (item.href) {
                if (location.pathname.startsWith(item.href)) {
                    setActiveItem(item.key)
                }
            }
        })
    },[location])

    return (
        <nav className="nav-menu">
            <ul className="nav-menu-list">
                { items.map((item,idx) => {
                    return (
                        <Fragment key={`nm-idx-${String(idx)}`}>
                            {item.divider ? (
                                <Fragment>
                                    <div className="nav-menu-divider">
                                        {item.label}
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {item.href ? (
                                        <Link to={item.href}>
                                            <li onClick={item.click ? item.click : undefined} className={`nav-item ${item.key === activeItem ? 'nav-active' : ''}`}>
                                                {item.label}
                                            </li>
                                        </Link>
                                    ) : (
                                        <li onClick={item.click ? item.click : undefined} className="nav-item">
                                            {item.label}
                                        </li>
                                    )}
                                </Fragment>
                            )}
                        </Fragment>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavMenu