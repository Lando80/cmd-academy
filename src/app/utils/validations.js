function RequestError(msg = '', status) {
  ;(this.name = 'RequestError'), (this.message = msg)
  this.status = status || 400
}

// Vai verificar se o valor existe. Vai gerar error apenas se o valor não existir.
function existsOrError(value, msg) {
  if (!value || value == '') throw new RequestError(msg)
  if (Array.isArray(value) && value.length === 0) throw new RequestError(msg)
  if (typeof value === 'string' && !value.trim()) throw new RequestError(msg)
}

// Vai verificar se o valor não existe. Vai gerar error apenas se o valor existir.
function notExistsOrError(value, msg) {
  try {
    existsOrError(value, msg)
  } catch (msg) {
    return
  }
  throw new RequestError(msg, 409)
}

// Vai verificar se dois valores são iguais ou não
function equalsOrError(valueA, valueB, msg) {
  if (valueA !== valueB) throw new RequestError(msg, 409)
}

export { existsOrError, notExistsOrError, equalsOrError }
