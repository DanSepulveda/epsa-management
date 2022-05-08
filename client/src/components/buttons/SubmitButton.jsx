const SubmitButton = ({ children, loading }) => {
    return (
        <button
            type='submit'
            className='w-full py-3 text-white font-medium transition-all duration-300 bg-pink-500 hover:bg-pink-400 text-center'
            disabled={loading ? true : false}
        >
            {children}
        </button>
    )
}

export default SubmitButton