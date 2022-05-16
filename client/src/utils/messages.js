import { toast } from 'react-hot-toast'

export const successMessage = (message) => {
    toast.success(message, {
        style: {
            background: '#333',
            color: '#fff'
        }
    })
}

export const errorMessage = (message) => {
    toast.error(message, {
        style: {
            background: '#333',
            color: '#fff'
        }
    })
}

export const loadingMessage = (message) => {
    return toast.loading(message, {
        style: {
            background: '#333',
            color: '#fff'
        }
    })
}

export const loadingError = (message = "Ha ocurrido un problema. Intente más tarde", id) => {
    return toast.error(message, {
        style: {
            background: '#333',
            color: '#fff'
        },
        id
    })
}

export const loadingSuccess = (message, id) => {
    return toast.success(message, {
        style: {
            background: '#333',
            color: '#fff'
        },
        id
    })
}