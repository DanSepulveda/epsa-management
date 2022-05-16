import themes from "../../app/themes"

const SubmitButton = ({ children, loading }) => {
    const { buttons, common } = themes.default

    return (
        <button
            type='submit'
            className={`w-full py-3 font-medium text-center ${buttons.submitBtn} ${common.transition}`}
            disabled={loading}
        >
            {children}
        </button>
    )
}

export default SubmitButton