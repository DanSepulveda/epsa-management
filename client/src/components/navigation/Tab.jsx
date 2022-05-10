import { AiOutlineTable, AiOutlineUnorderedList } from 'react-icons/ai'

const Tab = ({ children, icon, tab, actualTab, setTab }) => {
    const icons = {
        table: <AiOutlineTable />,
        list: <AiOutlineUnorderedList />
    }

    const className = tab === actualTab ? ' bg-slate-50 border-pink-400' : ' border-transparent'

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