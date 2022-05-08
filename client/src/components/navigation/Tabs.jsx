const Tabs = ({ children }) => {
    return (
        <div className='max-w-full flex gap-5 bg-slate-100 overflow-x-scroll'>
            {children}
        </div>
    )
}

export default Tabs