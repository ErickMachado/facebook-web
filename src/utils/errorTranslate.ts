export function translateError(message: string) {
  let translatedError: string

  switch (message) {
    case 'Incorrect email or password':
      translatedError = 'E-mail ou senha incorretos'
      break

    case 'Username already in use':
      translatedError = 'Nome de usuário já utilizado'
      break

    case 'User already registered':
      translatedError = 'Usuário já cadastrado'
      break

    default:
      translatedError = 'Algo deu errado. Tente novamente mais tarde'
  }

  return translatedError
}
