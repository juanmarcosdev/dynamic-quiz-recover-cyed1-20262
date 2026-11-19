//Nivel 4: Seguimiento 6 - 1 Pregunta de la Tarea Integradora 2 de CyED3 (GoEmotions: Dense, RNN, LSTM y BERT).
//28 preguntas de entendimiento de la TI, de desarrollo temprano, conceptuales de RNN y de BERT
//(basadas en el notebook NTM_Transformers_Sentiment_CyED3). Se muestran todas juntas, sin secciones.
//El texto entre $...$ se renderiza con KaTeX: los montos se escriben "USD 5", nunca con el signo pesos.

export const seguimiento6Questions = [
  {
    id: 1,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt: '¿De dónde viene GoEmotions y qué contiene cada fila de los archivos train.tsv, dev.tsv y test.tsv?',
    answer:
      'Es un corpus de comentarios de Reddit en inglés creado por Google Research (Demszky et al., ACL 2020). La versión filtrada tiene 54.263 comentarios en la que al menos 2 evaluadores coincidieron.\n' +
      'Cada fila trae el texto del comentario, la lista de ids de emociones (27 emociones o Neutral) y el id del comentario.',
  },
  {
    id: 2,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'GoEmotions tiene 27 emociones y la TI pide un clasificador binario. ¿Cómo se pasa de una a otra y qué grupos oficiales existen?',
    answer:
      'Con el mapeo oficial de los autores a tres grupos de sentimiento: positivo (p. ej. joy, love, gratitude, admiration), negativo (p. ej. anger, sadness, fear, disappointment) y ambiguo (realization, surprise, curiosity, confusion).\n' +
      'Los comentarios Neutral no expresan emoción. Para la TI solo se usan positivo y negativo.',
  },
  {
    id: 3,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'Un comentario está etiquetado con admiration y con anger. ¿Entra al dataset de la TI? ¿Qué otros comentarios se descartan?',
    answer:
      'No. Es un comentario mixto: sus emociones pertenecen a grupos distintos (positivo y negativo). Solo se conservan los comentarios cuyas emociones pertenecen todas al mismo grupo.\n' +
      'También se descartan los neutrales, los ambiguos y los duplicados.',
  },
  {
    id: 4,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'Hay 19.020 comentarios positivos y 10.217 negativos, pero la TI usa 500 y 500. ¿Por qué se balancea y cómo se garantiza que el muestreo sea reproducible?',
    answer:
      'Porque el desbalance (casi 2 a 1) haría que la exactitud engañe y que el modelo favorezca a la clase mayoritaria. Con 500 y 500 el azar vale 0,5 y las métricas son más fáciles de leer.\n' +
      'Se muestrea aleatoriamente con una semilla fija (random_state / seed), de modo que cualquier integrante obtiene exactamente las mismas 1000 filas.',
  },
  {
    id: 5,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'La TI dice que un comentario puede expresar varias emociones y que hay ironía y jerga. ¿Por qué esto vuelve más difícil el problema que el de reseñas de Amazon, IMDb o Yelp?',
    answer:
      'Los comentarios son cortos (unas 13 palabras), informales, con emojis, jerga, groserías e ironía. El sentimiento depende del contexto y no de palabras sueltas: una frase positiva en apariencia puede ser sarcasmo.\n' +
      'Además las etiquetas son subjetivas (el acuerdo entre evaluadores no es total), lo que pone un techo al rendimiento posible.',
  },
  {
    id: 6,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'En GoEmotions los nombres de personas y los términos religiosos aparecen como [NAME] y [RELIGION]. ¿Por qué lo hicieron los autores y qué efecto tiene en su preprocesamiento?',
    answer:
      'Para reducir sesgos y proteger la privacidad: evita que el modelo aprenda a asociar un nombre o una religión concreta con una emoción.\n' +
      'En el preprocesamiento hay que decidir qué hacer con esos tokens (conservarlos como una palabra más o quitarlos), y la puntuación de los corchetes cambia si se limpia el texto.',
  },
  {
    id: 7,
    topic: 'Entendimiento de la TI',
    type: 'text',
    prompt:
      'La TI relaciona Dense, RNN, LSTM y Transformers con la Máquina de Turing. ¿Qué concepto de la máquina corresponde a la memoria en cada arquitectura?',
    answer:
      'La cinta de la MT corresponde, en la RNN y la LSTM, al estado oculto $h_t$ (y a la celda $c_t$): memoria de tamaño fijo. En la Red Neuronal de Turing es una matriz externa de $N$ filas con cabezales de lectura y escritura.\n' +
      'En el Transformer la "memoria" son los vectores de todos los tokens de la oración, a los que cada token accede por atención. La Dense no tiene memoria de la secuencia.',
  },
  {
    id: 8,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'Ya tienen las 1000 filas balanceadas. ¿Por qué hacen el split train/test antes de ajustar el vocabulario o el tokenizador, y para qué sirve stratify?',
    answer:
      'Si el vocabulario (o el TF-IDF, o el escalado) se ajusta con todo el dataset, información del test se filtra al entrenamiento (data leakage) y las métricas salen optimistas. Todo se aprende solo con train.\n' +
      'stratify mantiene la proporción 50/50 de clases en cada partición, y con pocas filas evita un test desbalanceado por azar.',
  },
  {
    id: 9,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'La TI pide quitar stopwords. Al usar la lista de scikit-learn, "I am not happy at all" queda como "happy". ¿Qué pasó y qué hacen ustedes?',
    answer:
      'La lista de scikit-learn incluye "not", "no", "nor" y "never"; quitarlas invierte el sentimiento.\n' +
      'Para sentimiento se conservan las negaciones: se usa una lista de stopwords modificada, se quitan solo en las nubes de palabras y el conteo, o no se quitan para los modelos neuronales.',
  },
  {
    id: 10,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'En el EDA graficaron la longitud de los comentarios por clase y las dos distribuciones se superponen casi por completo. ¿Qué concluyen y para qué más les sirve esa gráfica?',
    answer:
      'Que la longitud casi no da señal: el modelo tiene que leer las palabras.\n' +
      'Sirve para escoger el largo máximo de secuencia (maxlen / MAX_LEN) y así decidir cuánto padding y cuánta truncación habrá: con comentarios de unas 13 palabras, un valor corto cubre casi todos.',
  },
  {
    id: 11,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'Construyen un vocabulario con las N palabras más frecuentes del train. ¿Qué es el id de <OOV> y qué problema trae para comentarios con jerga, typos o "sooooo"?',
    answer:
      'Toda palabra que no está en el vocabulario se reemplaza por el mismo id (OOV, fuera de vocabulario), generalmente 1; el 0 se reserva para el padding.\n' +
      'Con jerga, errores de escritura o alargamientos, muchas palabras emocionales colapsan en el mismo id y el modelo no las distingue. WordPiece lo evita partiendo la palabra en piezas conocidas.',
  },
  {
    id: 12,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'Un DummyClassifier (estrategia más frecuente) sobre su test balanceado da exactitud 0,5. ¿Para qué sirve el baseline y cuánto valen precisión, recall, F1 y kappa de la clase positiva?',
    answer:
      'Es el piso: cualquier modelo que valga la pena debe superarlo. Responde siempre la misma clase.\n' +
      'Si responde "negativo" siempre: exactitud 0,5; precisión y recall de la clase positiva 0 (F1 = 0); kappa = 0, que significa acuerdo igual al del azar.',
  },
  {
    id: 13,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'La TI pide kappa de Cohen además de exactitud. ¿Qué mide y qué significa kappa = 0,40?',
    answer:
      'Mide el acuerdo entre predicción y realidad más allá del azar: $\\kappa = (p_o - p_e)/(1 - p_e)$, con $p_o$ la exactitud y $p_e$ el acuerdo esperado por azar.\n' +
      '0 es azar y 1 es perfecto. Un 0,40 es un acuerdo moderado: por ejemplo, exactitud 0,70 con $p_e = 0{,}5$ da $(0{,}7 - 0{,}5)/0{,}5 = 0{,}4$.',
  },
  {
    id: 14,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'Entrenan la RNN con padding al final (post) y obtienen un rendimiento cercano al azar, y con padding al inicio (pre) mejora. ¿Por qué?',
    answer:
      'La RNN lee de izquierda a derecha y clasifica con su último estado. Con padding post, los últimos pasos que lee son ceros y el estado olvida el contenido real.\n' +
      'Con padding pre, los ceros van primero y el último estado viene de los tokens reales. Por eso pad_sequences de Keras usa padding="pre" por defecto. Otra solución es enmascarar (mask_zero).',
  },
  {
    id: 15,
    topic: 'Desarrollo temprano',
    type: 'text',
    prompt:
      'Con solo 1000 comentarios (unos 800 de entrenamiento), la LSTM se sobreajusta: la pérdida de entrenamiento baja y la de validación sube. ¿Qué hacen?',
    answer:
      'Reconocer que hay pocos datos para tantos parámetros. Opciones: early stopping con la pérdida de validación, dropout, menos unidades ocultas o embeddings más pequeños, regularización L2, y menos épocas.\n' +
      'También se ajustan hiperparámetros (épocas, batch size, unidades) con validación y no con el test, que solo se usa al final.',
  },
  {
    id: 16,
    topic: 'RNN conceptual',
    type: 'text',
    prompt: '¿Qué diferencia a una RNN de una red densa al procesar un comentario, y qué papel cumple el estado oculto $h_t$?',
    answer:
      'La densa recibe un vector de tamaño fijo y no tiene noción de orden. La RNN procesa un token por paso y reutiliza los mismos pesos en cada paso.\n' +
      '$h_t = f(W_x x_t + W_h h_{t-1} + b)$ es la memoria: resume lo leído hasta el paso $t$ en un vector de tamaño fijo.',
  },
  {
    id: 17,
    topic: 'RNN conceptual',
    type: 'text',
    prompt:
      'Para clasificar un comentario como positivo o negativo, ¿qué tipo de arquitectura es la RNN (uno a uno, uno a muchos, muchos a uno) y qué estado usan para decidir?',
    answer:
      'Muchos a uno: entra una secuencia de tokens y sale una sola etiqueta.\n' +
      'Se toma el último estado oculto $h_T$ (o $h_T$ de la LSTM) y se pasa a una capa densa con sigmoide (o softmax de 2 clases). Por eso importa que los últimos pasos sean tokens reales.',
  },
  {
    id: 18,
    topic: 'RNN conceptual',
    type: 'text',
    prompt: '¿Qué es el desvanecimiento del gradiente en una RNN simple y por qué afecta a comentarios largos?',
    answer:
      'En la retropropagación en el tiempo (BPTT) el gradiente se multiplica por $W_h$ y por la derivada de la activación en cada paso. Si esos factores son menores que 1, el gradiente se encoge exponencialmente.\n' +
      'Los pasos tempranos casi no reciben señal de aprendizaje, así que la red no aprende dependencias lejanas, como una negación al inicio de la frase que cambia el final.',
  },
  {
    id: 19,
    topic: 'RNN conceptual',
    type: 'text',
    prompt: '¿Cómo ayuda una LSTM con ese problema? Nombren las compuertas y el estado de celda.',
    answer:
      'Agrega un estado de celda $c_t$ que se actualiza de forma aditiva, lo que deja pasar el gradiente casi intacto.\n' +
      'Compuerta de olvido (qué borrar de $c_{t-1}$), de entrada (qué escribir) y de salida (qué parte de $c_t$ mostrar como $h_t$). Cada compuerta es una sigmoide entre 0 y 1.',
  },
  {
    id: 20,
    topic: 'RNN conceptual',
    type: 'text',
    prompt:
      'Una LSTM tiene unas 4 veces los parámetros de una RNN simple con las mismas unidades. ¿De dónde sale ese factor?',
    answer:
      'La RNN simple tiene un bloque de pesos ($W_x$, $W_h$, $b$). La LSTM tiene cuatro: compuerta de olvido, de entrada, de salida y el candidato de celda, cada una con sus propios pesos.\n' +
      'Para $n$ unidades y entrada $d$: $4\\,(nd + n^2 + n)$ frente a $nd + n^2 + n$. Es más costosa de entrenar, y con pocos datos eso pesa.',
  },
  {
    id: 21,
    topic: 'RNN conceptual',
    type: 'text',
    prompt:
      'Una RNN y una LSTM procesan el texto paso a paso. ¿Qué limitación de eficiencia tiene eso frente a un Transformer?',
    answer:
      'El paso $t$ necesita $h_{t-1}$, así que no se puede paralelizar sobre la longitud de la secuencia: se calcula un token tras otro.\n' +
      'El Transformer procesa todos los tokens a la vez (atención en paralelo) y por eso aprovecha la GPU. A cambio, el costo de la atención crece con el cuadrado de la longitud.',
  },
  {
    id: 22,
    topic: 'BERT conceptual',
    type: 'text',
    prompt: 'En la atención propia, ¿qué son la consulta $q$, la clave $k$ y el valor $v$, y qué calcula la fórmula?',
    answer:
      '$q$: qué busca el token. $k$: qué ofrece. $v$: lo que entrega si lo atienden. Se obtienen con tres matrices aprendidas: $Q = XW_Q$, $K = XW_K$, $V = XW_V$.\n' +
      '$\\mathrm{Attention}(Q,K,V) = \\mathrm{softmax}(QK^\\top/\\sqrt{d})V$: cada token produce una suma ponderada de los valores de todos los tokens, y queda con contexto de toda la oración.',
  },
  {
    id: 23,
    topic: 'BERT conceptual',
    type: 'text',
    prompt: '¿Por qué se divide entre $\\sqrt{d}$ en la atención? Piensen en $d = 768$ como en BERT.',
    answer:
      'El producto punto suma $d$ términos, así que con $d$ grande los puntajes crecen. El softmax se satura: casi todo el peso va a un solo token y su gradiente se desvanece.\n' +
      'Dividir entre $\\sqrt{d}$ mantiene los puntajes en un rango donde el softmax todavía aprende.',
  },
  {
    id: 24,
    topic: 'BERT conceptual',
    type: 'text',
    prompt:
      'Si se quita la codificación posicional, ¿"not good, bad" y "bad, not good" producen distintos resultados en un Transformer? ¿Cómo lo resuelve BERT?',
    answer:
      'No: la atención sin posiciones no ve el orden; trata la oración como una bolsa de tokens. Cambiar el orden solo intercambia las filas de la salida.\n' +
      'BERT suma a cada embedding un vector de posición aprendido (no senoidal), con un límite de 512 posiciones.',
  },
  {
    id: 25,
    topic: 'BERT conceptual',
    type: 'text',
    prompt: '¿Qué hace WordPiece con "sooooo" o con un emoji, y qué significan los ids 101, 102 y 100?',
    answer:
      'Una palabra desconocida se parte en piezas conocidas, y las que siguen a la primera llevan el prefijo ##: "sooooo" se vuelve algo como soo ##oo ##o, así que nunca necesita [UNK] para palabras de letras.\n' +
      '101 = [CLS] (abre la entrada), 102 = [SEP] (la cierra) y 100 = [UNK]: el vocabulario uncased no tiene pieza para muchos emojis y quedan como desconocidos. Se pueden pasar a palabras antes (demojize).',
  },
  {
    id: 26,
    topic: 'BERT conceptual',
    type: 'text',
    prompt:
      'Pasan "I love it" a BERT con padding hasta 11 tokens y con la attention mask de unos en lugar de ceros en el padding. ¿Qué cambia y por qué?',
    answer:
      'Cambia el vector de [CLS]. Con la máscara correcta, los puntajes de las columnas [PAD] se ponen en $-\\infty$ antes del softmax, su peso es 0 y nadie los lee: el resultado es igual al de la oración sola.\n' +
      'Sin máscara, los [PAD] entran al softmax como palabras reales, quitan atención y alteran el resultado. El padding es inofensivo solo si la máscara viaja con él.',
  },
  {
    id: 27,
    topic: 'BERT conceptual',
    type: 'text',
    prompt:
      'Para afinar BERT o DistilBERT, ¿qué entrada le dan: texto limpio (minúsculas, sin stopwords ni puntuación) o texto crudo? ¿Qué se entrena y cómo clasifica?',
    answer:
      'Texto crudo: el tokenizador uncased ya pasa a minúsculas, la atención necesita las negaciones ("not") y la puntuación como "!!!" lleva emoción.\n' +
      'Se agrega una capa lineal sobre el vector de [CLS] y en el ajuste fino se mueven todos los pesos (66 M en DistilBERT), no solo la capa nueva. El padding se hace por lote (padding dinámico).',
  },
  {
    id: 28,
    topic: 'BERT conceptual',
    type: 'text',
    prompt:
      'Comparan DistilBERT (o BERT) con la LSTM y ven un mapa de atención donde [CLS] mira "not". ¿Sirve eso como explicación de la decisión? ¿Qué diferencia hay entre atención y memoria recurrente?',
    answer:
      'Solo como pista: los pesos muestran dónde mira el modelo, no por qué decide (Jain y Wallace, 2019).\n' +
      'La LSTM comprime todo lo leído en un estado de tamaño fijo y lo lee en orden. La atención conserva los vectores de todos los tokens y cada uno consulta directamente a los demás por contenido, en paralelo; el orden lo da la codificación posicional.\n' +
      'BERT preentrenado (110 M de parámetros; DistilBERT 66 M) suele superar a la LSTM con pocos datos, pero cuesta más de entrenar.',
  },
]
