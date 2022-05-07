import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useTitle = (title) => {
    const pathname = useLocation().pathname

    useEffect(() => {
        document.title = `EPSA | ${title}`
    }, [pathname])
}

export default useTitle