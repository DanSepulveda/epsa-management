const SubmitButton = ({ children, loading }) => {
    return (
        <button
            type='submit'
            className='w-full py-3 text-white font-medium text-center transition-all duration-300 bg-pink-500 hover:bg-pink-500/90'
            disabled={loading ? true : false}
        >
            {children}
        </button>
    )
}

export default SubmitButton