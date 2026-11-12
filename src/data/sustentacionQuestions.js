//Nivel 2: sustentación del Workshop Deep Learning (CyED3 2026-2).
//Banco general: aplica a cualquier entrega. Las preguntas específicas de cada
//estudiante (marcadas con ★) están en sustentacionStudents.js.
//El texto entre $...$ se renderiza con KaTeX: los montos se escriben "USD 5", nunca con el signo pesos.

export const sustentacionQuestions = [
  //---- Datos y filas válidas -------------------------------------------------
  {
    id: 1,
    topic: 'Datos y filas válidas',
    type: 'text',
    prompt:
      'En un viaje pagado en efectivo, tip_amount = 0. ¿Significa que el pasajero no dejó propina? ¿Qué filas son válidas para la tarea?',
    answer:
      'No. Según el diccionario de la TLC, la propina solo queda registrada en pagos con tarjeta; la de efectivo no se registra.\n' +
      'Ese 0 es un dato faltante disfrazado. Las filas válidas son las de payment_type = 1 (tarjeta) con fare_amount > 0.',
  },
  {
    id: 2,
    topic: 'Datos y filas válidas',
    type: 'text',
    prompt:
      'passenger_count, RatecodeID, store_and_fwd_flag, congestion_surcharge y Airport_fee suelen faltar exactamente en las mismas filas. ¿Qué tienen en común esas filas?',
    answer:
      'Casi todas tienen payment_type = 0 (Flex Fare o registros incompletos del proveedor).\n' +
      'Es un faltante estructural, no aleatorio: se trata como bloque (se excluye o se marca), no se imputa columna por columna como si fuera ruido.',
  },
  {
    id: 3,
    topic: 'Datos y filas válidas',
    type: 'text',
    prompt:
      'Después de limpiar y quedarse con los pagos con tarjeta le quedan 70.000 viajes. ¿Cumple el enunciado? ¿Qué debe hacer?',
    answer:
      'No: se exigen al menos 100.000 filas válidas y limpias.\n' +
      'Hay que tomar una muestra inicial más grande con la misma semilla y reportar los tamaños antes y después de cada paso.',
  },
  {
    id: 4,
    topic: 'Datos y filas válidas',
    type: 'text',
    prompt: '¿Para qué se fija una semilla? Nombre al menos tres procesos aleatorios del taller que deberían usarla.',
    answer:
      'Para que los resultados se puedan reproducir.\n' +
      'Procesos aleatorios: el muestreo del mes, el DummyClassifier stratified, la inicialización de pesos de las redes, el shuffle de los batches y el split (si es aleatorio).',
  },

  //---- Auditoría y limpieza ----------------------------------------------------
  {
    id: 5,
    topic: 'Auditoría y limpieza',
    type: 'text',
    prompt:
      '¿Cuál es la diferencia entre un outlier y un error de registro? Dé un ejemplo de cada uno con trip_distance.',
    answer:
      'Error: un valor imposible, como 298.000 millas o una distancia de 0 con tarifa y duración positivas. Se elimina o se corrige.\n' +
      'Outlier: un valor extremo pero posible, como un viaje de 40 millas al aeropuerto. Se conserva y, si hace falta, se transforma (log) o se acota.',
  },
  {
    id: 6,
    topic: 'Auditoría y limpieza',
    type: 'text',
    prompt:
      'total_amount no coincide con la suma de sus componentes en miles de filas. ¿Hay que eliminarlas?',
    answer:
      'No necesariamente. Muchas diferencias son montos fijos (2.50 del congestion surcharge, 1.75 del airport fee), es decir, particularidades del registro.\n' +
      'Además, total_amount no se usa como feature (contiene la propina). Lo razonable es marcar esas filas, documentarlas y justificar la decisión.',
  },
  {
    id: 7,
    topic: 'Auditoría y limpieza',
    type: 'text',
    prompt: '¿Por qué la auditoría de calidad debe hacerse ANTES de limpiar y no al mismo tiempo?',
    answer:
      'Porque la auditoría es la evidencia: cuántos registros tiene cada problema, en qué columnas y en qué proporción.\n' +
      'Sin ese diagnóstico no se puede justificar la estrategia (eliminar, imputar, corregir, acotar) ni reportar el antes y el después.',
  },
  {
    id: 8,
    topic: 'Auditoría y limpieza',
    type: 'text',
    prompt: '¿Cuándo conviene imputar un valor y cuándo eliminar la fila? Use passenger_count = 0 y fare_amount ≤ 0 como ejemplos.',
    answer:
      'Se imputa cuando el valor es plausible y el resto de la fila es útil: passenger_count = 0 → moda o mediana (1).\n' +
      'Se elimina cuando el valor hace imposible la tarea: con fare_amount ≤ 0 el tip_ratio no está definido, y suele tratarse de un reembolso o una anulación.',
  },

  //---- EDA ---------------------------------------------------------------------
  {
    id: 9,
    topic: 'EDA',
    type: 'text',
    prompt: 'La hora del pickup tiene una correlación de Pearson ≈ 0.05 con high_tip. ¿Es una variable inútil?',
    answer:
      'No. Pearson solo mide relación lineal. La hora puede tener un efecto no lineal (pico en la tarde, caída en la madrugada) que el coeficiente no capta.\n' +
      'Por eso se mira la tasa de high_tip por hora y se usa codificación cíclica.',
  },
  {
    id: 10,
    topic: 'EDA',
    type: 'text',
    prompt: 'fare_amount y trip_distance tienen r ≈ 0.94. ¿Qué problema indica y qué opciones hay?',
    answer:
      'Multicolinealidad: aportan información casi redundante.\n' +
      'Opciones: dejar solo una, combinarlas (tarifa por milla) o conservar ambas justificándolo (las redes toleran la redundancia, pero aumenta el costo y complica la interpretación).',
  },
  {
    id: 11,
    topic: 'EDA',
    type: 'text',
    prompt: 'En su mes, el 58 % de los viajes válidos son high_tip = 1. ¿Qué accuracy obtiene un modelo que siempre dice "propina alta"?',
    answer:
      '0.58, sin aprender nada.\n' +
      'Por eso la accuracy sola no sirve para este problema: cualquier modelo debe compararse contra ese piso.',
  },
  {
    id: 12,
    topic: 'EDA',
    type: 'text',
    prompt: "¿Qué información le da un pairplot con hue='high_tip' que no le da el heatmap de correlación?",
    answer:
      'Muestra la forma de la relación entre pares de variables y cómo se separan (o se solapan) las dos clases.\n' +
      'Si las clases se mezclan en todos los pares, no hay una frontera lineal simple y eso justifica un modelo no lineal.',
  },

  //---- Features y fuga ---------------------------------------------------------
  {
    id: 13,
    topic: 'Features y fuga',
    type: 'text',
    prompt: '¿Por qué total_amount no puede ser una feature? ¿Qué le pasaría al ROC-AUC si la incluye?',
    answer:
      'Porque incluye tip_amount: es información posterior a la decisión que se quiere predecir (fuga de datos).\n' +
      'El ROC-AUC se dispara a valores cercanos a 1, pero el modelo es inútil en la práctica.',
  },
  {
    id: 14,
    topic: 'Features y fuga',
    type: 'text',
    prompt: 'Explique la codificación cíclica de la hora. ¿Por qué no basta con usar la hora de 0 a 23?',
    answer:
      '$h_{\\sin} = \\sin\\left(\\dfrac{2\\pi h}{24}\\right)$, $h_{\\cos} = \\cos\\left(\\dfrac{2\\pi h}{24}\\right)$.\n' +
      'Como número, 23 y 0 están lejos (diferencia de 23). En el círculo quedan vecinos, que es lo que pasa en la realidad. Hacen falta seno y coseno para que cada hora tenga un punto único.',
  },
  {
    id: 15,
    topic: 'Features y fuga',
    type: 'text',
    prompt: '¿Por qué el StandardScaler (o cualquier codificador) se ajusta solo con el conjunto de entrenamiento?',
    answer:
      'Si se ajusta con todo, la media y la desviación incluyen datos de validación y test: es una fuga sutil.\n' +
      'Se hace fit con train y luego transform sobre validación y test con esos mismos parámetros.',
  },
  {
    id: 16,
    topic: 'Features y fuga',
    type: 'text',
    prompt: '¿Por qué es un error meter PULocationID a la red como un número? ¿Qué alternativas hay?',
    answer:
      'Es una variable categórica: la zona 140 no es "el doble" de la 70.\n' +
      'Alternativas: one-hot (unas 265 columnas), frequency encoding ajustado con train, agrupar por borough o crear banderas como is_airport.',
  },

  //---- Split y baseline --------------------------------------------------------
  {
    id: 17,
    topic: 'Split y baseline',
    type: 'text',
    prompt: '¿Split aleatorio o cronológico? ¿Qué riesgo tiene el aleatorio en datos con orden temporal?',
    answer:
      'El cronológico entrena con el pasado y evalúa con el futuro, como se usaría el modelo en producción.\n' +
      'El aleatorio mezcla días y permite que el modelo vea patrones de fechas posteriores al test, lo que puede sobreestimar el desempeño. En la RNN, además, las ventanas cruzarían particiones.',
  },
  {
    id: 18,
    topic: 'Split y baseline',
    type: 'text',
    prompt:
      'La clase mayoritaria es high_tip = 1 con proporción $p$. Para el Dummy most_frequent, ¿cuánto valen el recall, el F1, el kappa y el ROC-AUC?',
    answer:
      'Recall = 1 (predice 1 siempre). Precisión = $p$.\n' +
      '$F_1 = \\dfrac{2p}{1+p}$, que es alto (con $p = 0.58$ da 0.73).\n' +
      'κ = 0 y ROC-AUC = 0.5: no tiene ninguna capacidad de discriminar.',
  },
  {
    id: 19,
    topic: 'Split y baseline',
    type: 'text',
    prompt: '¿Qué significa mantener el test "intacto"? Dé dos ejemplos de cómo se contamina sin darse cuenta.',
    answer:
      'El test solo se usa una vez, al final.\n' +
      'Se contamina si se usa para elegir hiperparámetros, para el early stopping (validation_data = test), para elegir el umbral de decisión o para ajustar el scaler.',
  },
  {
    id: 20,
    topic: 'Split y baseline',
    type: 'text',
    prompt: '¿Qué aporta el Dummy stratified que no aporta el most_frequent?',
    answer:
      'Predice al azar respetando las proporciones de clase: es el desempeño del puro azar.\n' +
      'Su kappa ≈ 0 y su AUC ≈ 0.5 confirman que cualquier mejora sobre él viene de las features.',
  },

  //---- MLP ---------------------------------------------------------------------
  {
    id: 21,
    topic: 'MLP',
    type: 'text',
    prompt: '¿Por qué hay que escalar las entradas de una red neuronal y no las de un árbol de decisión?',
    answer:
      'La red se entrena por descenso de gradiente: con escalas muy distintas (millas, dólares, seno) los gradientes se desbalancean y la convergencia es lenta o inestable.\n' +
      'Un árbol solo compara umbrales por variable y la escala no le afecta.',
  },
  {
    id: 22,
    topic: 'MLP',
    type: 'text',
    prompt: '¿Qué hace el EarlyStopping? ¿Qué debería monitorear y qué hace restore_best_weights?',
    answer:
      'Detiene el entrenamiento cuando la métrica de validación deja de mejorar durante "patience" épocas.\n' +
      'Debe monitorear validación (val_loss o val_auc), nunca test. restore_best_weights vuelve a los pesos de la mejor época.',
  },
  {
    id: 23,
    topic: 'MLP',
    type: 'text',
    prompt: '¿Qué problema tiene usar GridSearchCV con cv=5 en este taller y cómo se resuelve?',
    answer:
      'El k-fold baraja filas de todo el mes: se entrena con viajes posteriores a los de validación (fuga temporal).\n' +
      'Se usa PredefinedSplit (train → validación fija) o TimeSeriesSplit.',
  },
  {
    id: 24,
    topic: 'MLP',
    type: 'text',
    prompt: 'Su validation loss queda por debajo del training loss. ¿Hay un error?',
    answer:
      'No necesariamente. El dropout solo actúa en entrenamiento, y Keras promedia la pérdida de entrenamiento durante la época mientras los pesos cambian.\n' +
      'También puede ser que el periodo de validación sea algo más "fácil".',
  },

  //---- RNN y LSTM --------------------------------------------------------------
  {
    id: 25,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt:
      'Explique la forma (samples, timesteps, features) con un ejemplo: ventanas de 10 viajes y 15 features por viaje. ¿Cuál es la etiqueta?',
    answer:
      'Cada muestra es una matriz de 10 × 15: los 9 viajes anteriores más el actual, cada uno con sus 15 features.\n' +
      'El tensor queda (N, 10, 15) y la etiqueta es el high_tip del último viaje de la ventana (nunca las propinas de los anteriores).',
  },
  {
    id: 26,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt: 'Con timesteps = 1, ¿en qué se diferencia una SimpleRNN de una capa Dense?',
    answer:
      '$h_1 = \\tanh(W x_1 + U h_0 + b)$ con $h_0 = 0$, así que $h_1 = \\tanh(W x_1 + b)$.\n' +
      'Es una capa densa con activación tanh: la recurrencia nunca se usa. Una LSTM con un solo paso tampoco aprovecha su memoria.',
  },
  {
    id: 27,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt: 'Calcule los parámetros de una SimpleRNN y de una LSTM con u = 32 unidades y f = 5 features de entrada.',
    answer:
      'SimpleRNN: $u(u + f + 1) = 32 \\cdot 38 = 1216$.\n' +
      'LSTM: $4u(u + f + 1) = 4864$ (cuatro bloques: compuertas de olvido, entrada y salida, más la candidata).',
  },
  {
    id: 28,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt: '¿Qué problema de la RNN vanilla resuelve la LSTM y con qué mecanismo?',
    answer:
      'El desvanecimiento (o explosión) del gradiente en secuencias largas.\n' +
      'La LSTM tiene una celda de memoria $c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t$ que se actualiza de forma aditiva y está controlada por compuertas, así que el gradiente fluye mejor a través del tiempo.',
  },
  {
    id: 29,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt: 'Su RNN tiene menos parámetros que el MLP pero tarda más en entrenar. ¿Por qué?',
    answer:
      'Porque procesa los pasos de la ventana uno tras otro ($h_t$ depende de $h_{t-1}$) y eso no se paraleliza en el tiempo.\n' +
      'El costo crece con el número de timesteps, no solo con los parámetros. Además, las ventanas multiplican el tamaño de los datos.',
  },
  {
    id: 30,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt:
      'Si la ventana son los viajes anteriores de toda la ciudad (de otros conductores y pasajeros), ¿qué "memoria" puede aprender la red?',
    answer:
      'Muy poca: solo un contexto general (hora, tráfico, mezcla de viajes de aeropuerto). La propina depende sobre todo del viaje actual.\n' +
      'Por eso la RNN y la LSTM suelen empatar con el MLP. Sería más útil una secuencia con sentido (misma zona, mismo conductor).',
  },
  {
    id: 31,
    topic: 'RNN y LSTM',
    type: 'text',
    prompt: '¿Para qué sirven el padding y la capa Masking en las secuencias?',
    answer:
      'Cuando un viaje no tiene suficientes viajes previos (por ejemplo, en su zona), la ventana se rellena con un valor especial.\n' +
      'Masking le indica a la RNN que ignore esos pasos, para que el relleno no se interprete como datos reales.',
  },

  //---- Métricas ----------------------------------------------------------------
  {
    id: 32,
    topic: 'Métricas',
    type: 'text',
    prompt: '¿Qué mide el kappa de Cohen? Escriba su fórmula.',
    answer:
      '$\\kappa = \\dfrac{p_o - p_e}{1 - p_e}$, donde $p_o$ es el acuerdo observado (accuracy) y $p_e$ el acuerdo esperado por azar según las proporciones de clase.\n' +
      'Vale 0 para los modelos triviales y penaliza los errores en ambas clases.',
  },
  {
    id: 33,
    topic: 'Métricas',
    type: 'text',
    prompt: 'Cuando la clase positiva es la mayoritaria, ¿por qué el F1 de esa clase es engañoso?',
    answer:
      'El modelo que siempre dice "positivo" tiene recall 1 y precisión $p$, así que su F1 ya es alto (≈ 0.73 con p = 0.58).\n' +
      'Además, el F1 ignora los verdaderos negativos. Alternativas: kappa, F1 macro, o el F1 de la clase minoritaria si es la que interesa.',
  },
  {
    id: 34,
    topic: 'Métricas',
    type: 'text',
    prompt: '¿Qué mide el ROC-AUC y por qué no depende del umbral? ¿Es una ventaja o una desventaja?',
    answer:
      'Es la probabilidad de que un positivo al azar reciba un puntaje mayor que un negativo al azar; resume todos los umbrales posibles.\n' +
      'Sirve para comparar la capacidad de ordenar. Pero el stakeholder decide con un umbral concreto, así que también hay que mirar las métricas en ese punto.',
  },
  {
    id: 35,
    topic: 'Métricas',
    type: 'text',
    prompt:
      'Su modelo tiene recall 0.92 y precisión 0.71 para high_tip. Si al conductor le cuestan más los falsos positivos, ¿qué cambia sin reentrenar? ¿Dónde lo elige?',
    answer:
      'Sube el umbral de decisión (por ejemplo, de 0.5 a 0.6): la precisión aumenta y el recall baja.\n' +
      'El umbral se elige en validación, con la métrica escogida, nunca en test.',
  },
  {
    id: 36,
    topic: 'Métricas',
    type: 'text',
    prompt: 'Explique con un stakeholder concreto qué es un falso positivo y qué es un falso negativo en este problema.',
    answer:
      'Con high_tip = 1 como positivo: FP = se predijo propina alta y no la hubo (el conductor prioriza un viaje que paga poco). FN = no se detectó una propina alta (se pierde una oportunidad).\n' +
      'La métrica se elige según cuál de los dos le cuesta más a ese stakeholder.',
  },

  //---- Comparación de arquitecturas --------------------------------------------
  {
    id: 37,
    topic: 'Comparación',
    type: 'text',
    prompt: 'En casi todas las entregas el MLP empata con la RNN y la LSTM o les gana. ¿Por qué?',
    answer:
      'Los datos son tabulares: la señal está en las features del viaje actual, que el MLP ve directamente.\n' +
      'Las secuencias artificiales aportan poco contexto, y la memoria recurrente o con compuertas no tiene qué aprovechar. El MLP es además el más barato.',
  },
  {
    id: 38,
    topic: 'Comparación',
    type: 'text',
    prompt: 'El MLP tiene κ = 0.450 y la LSTM 0.445. ¿Puede afirmar que el MLP es mejor? ¿Cómo lo comprobaría?',
    answer:
      'No, con una sola corrida no: la diferencia puede deberse a la semilla o a la muestra de test.\n' +
      'Se puede hacer bootstrap del test (intervalos de confianza) o repetir con varias semillas y comparar las distribuciones.',
  },
  {
    id: 39,
    topic: 'Comparación',
    type: 'text',
    prompt: '¿Cuándo sí valdría la pena una RNN o una LSTM con estos datos?',
    answer:
      'Si existiera una secuencia real: el historial de un mismo conductor o vehículo, el de un mismo pasajero, o una serie temporal agregada (demanda por zona y hora) donde el orden sí aporte información.',
  },
  {
    id: 40,
    topic: 'Comparación',
    type: 'text',
    prompt: '¿Cuánto mejora su mejor modelo sobre el baseline? ¿En qué métrica se ve mejor esa mejora y por qué?',
    answer:
      'Se ve mejor en κ (de 0 a ≈ 0.4–0.5) y en ROC-AUC (de 0.5 a ≈ 0.75–0.78).\n' +
      'En accuracy o en el F1 positivo la mejora parece pequeña porque el baseline ya está inflado por la clase mayoritaria.',
  },
]
