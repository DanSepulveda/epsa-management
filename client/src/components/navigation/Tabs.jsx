import themes from "../../app/themes"

const Tabs = ({ children }) => {
    const { tabs } = themes.default

    return (
        <div className={`flex w-fit ${tabs.bg}`}>
            {children}
        </div>
    )
}

export default Tabs