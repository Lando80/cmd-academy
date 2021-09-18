// Vai verificar se o valor existe. Vai gerar error apenas se o valor não existir.
function existsOrError(value, msg) {
  if (!value) throw msg
  if (Array.isArray(value) && value.length === 0) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}

// Vai verificar se o valor não existe. Vai gerar error apenas se o valor existir.
function notExistsOrError(value, msg) {
  try {
    existsOrError(value, msg)
  } catch (msg) {
    return
  }
  throw msg
}

// Vai verificar se dois valores são iguais ou não
function equalsOrError(valueA, valueB, msg) {
  if (valueA !== valueB) throw msg
}

export { existsOrError, notExistsOrError, equalsOrError }
