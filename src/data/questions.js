// Banco de 22 preguntas para la actividad de recuperación del Quiz 2
// (Unidad 2: Conjuntos y funciones — CyED1). No son las preguntas literales
// del quiz, sino variantes puntuales sobre los mismos subtemas: pertenencia
// y operaciones rápidas sobre relaciones, invertibilidad, clasificación
// inyectiva/sobreyectiva/biyectiva (por fórmula y por diagrama de flechas) y
// composición evaluada en un punto. Pensadas para responderse en ~1 minuto,
// con dificultad media y pareja entre todas.
//
// El texto matemático va delimitado por $...$ y se renderiza con KaTeX
// (ver MathText.jsx) para que se vea como en LaTeX.

export const questions = [
  // ---- Bloque 1: relaciones — pertenencia y cálculo puntual ---------------
  {
    id: 1,
    topic: 'Relaciones',
    type: 'text',
    prompt:
      'Sea $R = \\{(1,a), (2,b), (2,c)\\}$. ¿Es $(a,1) \\in R^T$? ¿Es $(c,3) \\in R^T$?',
    answer:
      'Sí: $(1,a) \\in R \\Rightarrow (a,1) \\in R^T$.\n' +
      'No: haría falta $(3,c) \\in R$, y $R$ no lo contiene.',
  },
  {
    id: 2,
    topic: 'Relaciones',
    type: 'text',
    prompt:
      'Sea $S = \\{(x,1), (y,1), (z,2)\\}$. ¿Cuántos elementos tiene $\\operatorname{ran} S$? ¿Y $\\operatorname{dom} S$?',
    answer: '$\\operatorname{ran} S = \\{1,2\\}$: 2 elementos.\n$\\operatorname{dom} S = \\{x,y,z\\}$: 3 elementos.',
  },
  {
    id: 3,
    topic: 'Relaciones',
    type: 'text',
    prompt:
      'Sean $R = \\{(1,m), (2,n), (3,m)\\}$ y $T = \\{(m,9), (n,4)\\}$. Calcule $(T \\circ R)(3)$.',
    answer: '$(3,m) \\in R$ y $(m,9) \\in T$, así que $(T \\circ R)(3) = 9$.',
  },
  {
    id: 4,
    topic: 'Relaciones',
    type: 'text',
    prompt:
      'Sean $A = \\{(5,k), (6,k), (7,l)\\}$ y $B = \\{(6,x), (7,y), (8,z)\\}$. ¿Es $6 \\in \\operatorname{dom} A \\cap \\operatorname{dom} B$?',
    answer:
      '$\\operatorname{dom} A = \\{5,6,7\\}$, $\\operatorname{dom} B = \\{6,7,8\\}$ $\\Rightarrow$ $\\operatorname{dom} A \\cap \\operatorname{dom} B = \\{6,7\\}$.\n' +
      'Sí, $6$ pertenece a esa intersección.',
  },
  {
    id: 5,
    topic: 'Relaciones',
    type: 'text',
    prompt: 'Sea $V = \\{(p,1), (q,2), (p,5)\\}$. ¿Es $V$ una función? Justifique en una frase.',
    answer: 'No: $p$ tiene dos imágenes distintas, $1$ y $5$.',
  },

  // ---- Bloque 2: invertibilidad — reconocimiento rápido -------------------
  {
    id: 6,
    topic: 'Invertibilidad',
    type: 'text',
    prompt: '$f: \\mathbb{R} \\Leftrightarrow \\mathbb{R}$, $f(x) = 6 - 2x$. ¿Es invertible?',
    answer: 'Sí. Es lineal con pendiente $-2 \\neq 0$, por lo tanto es biyectiva e invertible.',
  },
  {
    id: 7,
    topic: 'Invertibilidad',
    type: 'text',
    prompt: '$f: \\mathbb{R} \\Leftrightarrow \\mathbb{R}$, $f(x) = x^2 + 3$. ¿Es invertible?',
    answer: 'No. No es inyectiva: $f(1) = f(-1) = 4$.',
  },
  {
    id: 8,
    topic: 'Invertibilidad',
    type: 'text',
    prompt: '$f: \\mathbb{R}-\\{-1\\} \\Leftrightarrow \\mathbb{R}$, $f(x) = \\dfrac{2}{x+1}$. ¿Es invertible?',
    answer:
      'No. Es inyectiva, pero no sobreyectiva: $y=0$ no tiene preimagen, pues el numerador nunca es $0$.',
  },
  {
    id: 9,
    topic: 'Invertibilidad',
    type: 'text',
    prompt: '$f: \\mathbb{R} \\Leftrightarrow \\mathbb{R}$, $f(x) = 4x^3 - 1$. ¿Es invertible?',
    answer:
      'Sí. $x^3$ es estrictamente creciente $\\Rightarrow$ inyectiva; para cualquier $y \\in \\mathbb{R}$ existe $x = \\sqrt[3]{\\dfrac{y+1}{4}}$ $\\Rightarrow$ sobreyectiva.',
  },

  // ---- Bloque 3: clasificación — Sí/No por función -------------------------
  {
    id: 10,
    topic: 'Clasificación',
    type: 'text',
    prompt: '$p: \\mathbb{R} \\Leftrightarrow \\mathbb{R}$, $p(x) = 7 - x$. Inyectiva / Sobreyectiva / Biyectiva.',
    answer: 'Sí, Sí, Sí. Es lineal con pendiente $-1 \\neq 0$.',
  },
  {
    id: 11,
    topic: 'Clasificación',
    type: 'text',
    prompt: '$q: \\mathbb{R} \\Leftrightarrow \\mathbb{R}$, $q(x) = x^2 - 5$. Inyectiva / Sobreyectiva / Biyectiva.',
    answer:
      'No, No, No. $q(1) = q(-1) = -4$; y $\\operatorname{ran}(q) = [-5, \\infty)$ no cubre todo $\\mathbb{R}$.',
  },
  {
    id: 12,
    topic: 'Clasificación',
    type: 'text',
    prompt:
      '$r: \\mathbb{R}-\\{2\\} \\Leftrightarrow \\mathbb{R}$, $r(x) = \\dfrac{x}{x-2}$. Inyectiva / Sobreyectiva / Biyectiva.',
    answer:
      'Sí, No, No. Es inyectiva, pero $y=1 \\notin \\operatorname{ran}(r)$: $\\dfrac{x}{x-2}=1 \\Rightarrow 0=-2$, contradicción.',
  },
  {
    id: 13,
    topic: 'Clasificación',
    type: 'text',
    prompt: '$s: \\mathbb{Z} \\Leftrightarrow \\mathbb{Z}$, $s(x) = 3x - 4$. Inyectiva / Sobreyectiva / Biyectiva.',
    answer:
      'Sí, No, No. Es inyectiva, pero $1 \\notin \\operatorname{ran}(s)$: $3x-4=1 \\Rightarrow x=\\dfrac{5}{3} \\notin \\mathbb{Z}$.',
  },

  // ---- Bloque 4: composición evaluada en un punto --------------------------
  {
    id: 14,
    topic: 'Composición',
    type: 'text',
    prompt: '$f(x) = 2x + 3$, $g(x) = x - 5$. Calcule $(f \\circ g)(4)$.',
    answer: '$g(4) = -1$, luego $f(-1) = 2(-1)+3 = 1$.\n$(f \\circ g)(4) = 1$',
  },
  {
    id: 15,
    topic: 'Composición',
    type: 'text',
    prompt: '$f(x) = x^2 - 1$, $g(x) = x + 2$. Calcule $(f \\circ g)(1)$.',
    answer: '$g(1) = 3$, luego $f(3) = 3^2-1 = 8$.\n$(f \\circ g)(1) = 8$',
  },
  {
    id: 16,
    topic: 'Composición',
    type: 'text',
    prompt: '$f(x) = \\dfrac{x+1}{2}$, $g(x) = 2x - 1$. Calcule $(f \\circ g)(5)$.',
    answer:
      '$g(5) = 9$, luego $f(9) = \\dfrac{9+1}{2} = 5$.\n$(f \\circ g)(5) = 5$\n\n' +
      'El resultado coincide con la entrada: de hecho $f$ y $g$ son funciones inversas entre sí.',
  },

  // ---- Bloque 5: diagramas de flechas (dominio/codominio) -----------------
  // Las propiedades (función / inyectiva / sobreyectiva / biyectiva) se
  // calculan en tiempo real con classifyMapping() a partir de domain/codomain/pairs,
  // así que el enunciado y la respuesta nunca pueden quedar desincronizados.
  {
    id: 17,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['1', '2', '3', '4'],
    codomain: ['a', 'b', 'c', 'd', 'e'],
    pairs: [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd']],
  },
  {
    id: 18,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['1', '2', '3', '4', '5'],
    codomain: ['x', 'y', 'z'],
    pairs: [['1', 'x'], ['2', 'x'], ['3', 'y'], ['4', 'y'], ['5', 'z']],
  },
  {
    id: 19,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['p', 'q', 'r', 's'],
    codomain: ['1', '2', '3', '4'],
    pairs: [['p', '1'], ['q', '2'], ['r', '3'], ['s', '4']],
  },
  {
    id: 20,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['1', '2', '3', '4'],
    codomain: ['a', 'b', 'c'],
    pairs: [['1', 'a'], ['2', 'a'], ['3', 'b'], ['4', 'b']],
  },
  {
    id: 21,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['1', '2', '3'],
    codomain: ['a', 'b', 'c', 'd'],
    pairs: [['1', 'a'], ['1', 'b'], ['2', 'c'], ['3', 'd']],
  },
  {
    id: 22,
    topic: 'Diagrama',
    type: 'diagram',
    prompt:
      'Cada flecha va de un elemento del dominio (izquierda) hacia su imagen en el codominio (derecha).\n' +
      'Según el diagrama: ¿es función? ¿Es inyectiva? ¿Sobreyectiva? ¿Biyectiva?',
    domain: ['1', '2', '3', '4', '5'],
    codomain: ['a', 'b', 'c', 'd'],
    pairs: [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd']],
  },
]
