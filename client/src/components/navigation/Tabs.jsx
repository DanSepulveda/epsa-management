import React from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

const Tabs = ({ children, actualTab, setTab }) => {
    const { theme } = useSelector(userState)
    const { tabs } = theme

    return (
        <div className={`flex w-fit ${tabs.bg}`}>
            {
                React.Children
                    .toArray(children)
                    .map(child => React.cloneElement(child, { actualTab, setTab, tab: child.props.tab }))
            }
        </div>
    )
}

export default Tabs