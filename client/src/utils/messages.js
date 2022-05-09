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