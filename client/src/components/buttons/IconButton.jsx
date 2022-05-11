import { BsFileEarmarkWord, BsDownload, BsPlusLg } from 'react-icons/bs'

const IconButton = ({ children, icon, onClick, loading = false }) => {
    const icons = {
        word: <BsFileEarmarkWord className='fill-white' />,
        download: <BsDownload className='fill-white' />,
        plus: <BsPlusLg className='fill-white' />
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className='flex items-center gap-2 py-1 px-2 rounded text-white transition-all duration-300 bg-pink-600 hover:bg-pink-600/90'
            disabled={loading ? true : false}
        >
            {icons[icon]}
            {children}
        </button>
    )
}

export default IconButton