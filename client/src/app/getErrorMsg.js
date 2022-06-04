const getErrorMsg = (error) => {
  switch (error) {
    case 'auth/email-already-in-use':
      return 'Correo ya registrado'
    case 'auth/user-not-found':
      return 'Correo y/o clave incorrecta'
    case 'auth/wrong-password':
      return 'Correo y/o clave incorrecta'
    case 'empty-date':
      return 'Debe seleccionar una fecha'
    case 'empty-file':
      return 'Debe seleccionar un archivo'
    case 'no-records':
      return 'No existen registros para la fecha seleccionada'
    case 'no-changes':
      return 'No hay cambios para guardar'
    default:
      return 'Ha ocurrido un problema. Intente más tarde'
  }
}

export default getErrorMsg
