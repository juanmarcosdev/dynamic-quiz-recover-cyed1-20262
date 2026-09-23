// Deriva las propiedades de una relación dada como pares (dominio, codominio)
// a partir de sus flechas, en vez de depender de datos escritos a mano.
export function classifyMapping(domain, codomain, pairs) {
  const outDegree = new Map(domain.map((d) => [d, 0]))
  const inDegree = new Map(codomain.map((c) => [c, 0]))

  for (const [d, c] of pairs) {
    outDegree.set(d, (outDegree.get(d) ?? 0) + 1)
    inDegree.set(c, (inDegree.get(c) ?? 0) + 1)
  }

  const isFunction = domain.every((d) => outDegree.get(d) === 1)
  const isInjective = isFunction && codomain.every((c) => (inDegree.get(c) ?? 0) <= 1)
  const isSurjective = isFunction && codomain.every((c) => (inDegree.get(c) ?? 0) >= 1)
  const isBijective = isFunction && isInjective && isSurjective

  const noArrow = domain.find((d) => outDegree.get(d) === 0)
  const doubleArrow = domain.find((d) => outDegree.get(d) > 1)

  return { isFunction, isInjective, isSurjective, isBijective, noArrow, doubleArrow }
}
