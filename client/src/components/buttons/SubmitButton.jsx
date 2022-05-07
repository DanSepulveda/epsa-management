const SubmitButton = ({ children }) => {
    return (
        <button type='submit' className='to-pink-400 w-full py-3 text-white font-medium transition-all duration-300 bg-pink-500 hover:bg-pink-400'>
            {children}
        </button>
    )
}

export default SubmitButton