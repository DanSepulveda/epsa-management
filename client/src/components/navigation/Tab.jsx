import { AiOutlineTable, AiOutlineUnorderedList, AiOutlineProfile } from 'react-icons/ai'
import { FaSignature } from 'react-icons/fa'
import themes from '../../app/themes'

const Tab = ({ children, icon, tab, actualTab, setTab }) => {
    const { tabs } = themes.default

    const icons = {
        table: <AiOutlineTable />,
        list: <AiOutlineUnorderedList />,
        signature: <FaSignature />,
        basics: <AiOutlineProfile />
    }

    const className = tab === actualTab ? tabs.active : tabs.inactive

    return (
        <div
            className={`cursor-pointer flex flex-col items-center w-28 py-2 border-t-2${className}`}
            onClick={() => setTab(tab)}
        >
            {icons[icon]}
            <h3 className={tab === actualTab ? 'font-medium' : ''}>{children}</h3>
        </div>
    )
}

export default Tab