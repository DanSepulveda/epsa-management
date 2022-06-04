import { toast } from 'react-hot-toast'

export const successMessage = (message) => {
  toast.success(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  })
}

export const errorMessage = (message) => {
  toast.error(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  })
}

export function loadingMessage(message) {
  return toast.loading(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  })
}

export function loadingError(message, id) {
  return toast.error(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
    id,
  })
}

export function loadingSuccess(message, id) {
  toast.success(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
    id,
  })
}
