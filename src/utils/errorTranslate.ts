export function translateError(message: string) {
  let translatedError: string

  switch (message) {
    case 'Incorrect email or password':
      translatedError = 'E-mail ou senha incorretos'
      break

    default:
      translatedError = 'Algo deu errado. Tente novamente mais tarde'
  }

  return translatedError
}
