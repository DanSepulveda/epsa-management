import { BsFileEarmarkWord, BsDownload, BsPlusLg } from 'react-icons/bs'

const IconButton = ({ children, icon, onClick }) => {
    const icons = {
        word: <BsFileEarmarkWord className='fill-white' />,
        download: <BsDownload className='fill-white' />,
        plus: <BsPlusLg className='fill-white' />
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className='flex items-center gap-2 bg-pink-700 py-1 px-2 rounded text-white'
        >
            {icons[icon]}
            {children}
        </button>
    )
}

export default IconButton