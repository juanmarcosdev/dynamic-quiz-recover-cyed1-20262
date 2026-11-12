//Preguntas específicas (★) de la sustentación del Workshop Deep Learning, grupo G05.
//Cada estudiante se identifica solo por su código y su mes asignado (ambos aparecen en el enunciado público).
//Las preguntas son sobre decisiones de su propio trabajo y de su bitácora de IA.
//El texto entre $...$ se renderiza con KaTeX: los montos se escriben "USD 5", nunca con el signo pesos.

export const sustentacionStudents = [
  {
    code: 'A00403756',
    month: '2025-12',
    questions: [
      {
        prompt:
          'Usted tomó 250.000 viajes con semilla 2026 y terminó con 147.307 válidos. ¿Por qué no bastaba una muestra de 100.000?',
        answer:
          'Porque solo el 61 % de los viajes se paga con tarjeta y la limpieza quita otro 2 % o 3 %. Con 100.000 iniciales habría quedado muy por debajo del mínimo de 100.000 filas válidas.',
      },
      {
        prompt:
          'Sus 69.892 filas con nulos tenían todas payment_type = 0. ¿Qué es un viaje Flex Fare y por qué ninguno quedó en sus filas válidas?',
        answer:
          'Flex Fare es una tarifa acordada por adelantado en la app: el viaje no registra passenger_count, RatecodeID ni recargos. Como no es pago con tarjeta, la propina no es observable y queda fuera del filtro payment_type = 1.',
      },
      {
        prompt:
          'Su ventana de 10 viajes cubre "unos tres minutos de tráfico". ¿Cómo calculó eso y qué le dice sobre la información que la RNN puede usar?',
        answer:
          'Ordenando la muestra por pickup, entre viajes consecutivos pasan unos segundos, así que 10 viajes son unos 3 minutos de toda la ciudad. Es un contexto muy corto y de otros pasajeros: la RNN casi no tiene historia útil.',
      },
      {
        prompt: 'Su bitácora dice que trabajó con Claude Code sobre sus archivos locales. ¿Qué decisión de la limpieza tomó usted y cuál le propuso la herramienta?',
        answer:
          'Debe nombrar una decisión propia concreta (por ejemplo, conservar las diferencias de 1 a 5 USD en total_amount y solo eliminar las mayores a 5 USD) y explicar por qué la aceptó o la cambió.',
      },
    ],
  },
  {
    code: 'A00404150',
    month: '2025-04',
    questions: [
      {
        prompt:
          'Su stakeholder es una flota que paga un bono cuando el modelo predice propina baja. ¿Por qué el falso positivo es el error más grave para esa flota?',
        answer:
          'Con high_tip = 1 como positivo, un FP es un viaje que pagó poco pero el modelo dijo "alta": el conductor no recibe el bono que necesitaba. Un FN solo es un bono pagado de más.',
      },
      {
        prompt: 'Explique qué hizo con el bootstrap de 500 remuestreos y qué significa que la LSTM gane al MLP "solo en el 64 % de los casos".',
        answer:
          'Remuestreó el test con reemplazo y recalculó F1 en cada remuestreo. Un 64 % está cerca del 50 %: la diferencia no es significativa y los modelos empatan.',
      },
      {
        prompt: 'Su bitácora describe "spec-driven development". ¿Qué escribió en la especificación antes de pedir código?',
        answer:
          'Los requisitos y los criterios de aceptación tomados del enunciado (mes, semilla, filas válidas, métricas), luego un diseño (orden de secciones, split, reglas de fuga) y una lista de tareas.',
      },
      {
        prompt: 'El MLP tarda 0,16 s por época y la LSTM 0,64 s. ¿De dónde sale esa diferencia?',
        answer:
          'La LSTM recorre los pasos de la ventana uno tras otro y en cada paso calcula cuatro bloques de compuertas. El MLP hace una sola pasada densa por viaje.',
      },
    ],
  },
  {
    code: 'A00405691',
    month: '2026-09',
    questions: [
      {
        prompt: 'Usted eligió ROC-AUC como métrica principal. ¿Qué mide y por qué la separó de las métricas que dependen del umbral?',
        answer:
          'Mide qué tan bien el modelo ordena los viajes positivos por encima de los negativos, sin fijar un umbral. Accuracy, F1 y kappa dependen del corte en 0.5, así que miden otra cosa.',
      },
      {
        prompt: 'Su contexto recurrente son 4 viajes previos de toda la ciudad. ¿Por qué dice que esto "no garantiza disponibilidad en línea"?',
        answer:
          'Porque un viaje que empezó antes puede seguir en curso cuando termina el actual: su tarifa y su duración todavía no se conocerían en el momento de predecir.',
      },
      {
        prompt: 'La LSTM supera al MLP en ROC-AUC por 0,0013. ¿Concluye que la memoria ayudó? ¿Cómo lo comprobaría?',
        answer:
          'No: es una diferencia mínima, que puede deberse a la semilla. Lo comprobaría con bootstrap del test o repitiendo el entrenamiento con varias semillas.',
      },
      {
        prompt: 'En su bitácora con Antigravity, ¿qué le pidió al agente en la primera interacción y qué revisó usted de lo que produjo?',
        answer:
          'Le dio la rúbrica y el enunciado para planear el proyecto. Debe nombrar algo que verificó o corrigió (el mes, los conteos, las métricas exportadas en results/).',
      },
    ],
  },
  {
    code: 'A00406877',
    month: '2024-12',
    questions: [
      {
        prompt: 'Sus "timesteps" son cuatro grupos de features (pickup, destino, distancia y duración, tarifa). ¿Qué recuerda la RNN de un paso al siguiente?',
        answer:
          'La información de los grupos anteriores del mismo viaje. El orden de los grupos es una decisión de diseño, no tiempo real; él mismo lo aclara en el informe.',
      },
      {
        prompt: '¿Por qué eligió los umbrales de decisión con F0.5 en validación y no con F1?',
        answer:
          'F0.5 pesa más la precisión que el recall. Para una empresa que proyecta ingresos por propinas, prometer una propina alta que no llega (FP) es el error más costoso.',
      },
      {
        prompt: 'Su ROC-AUC de test (0.784) quedó por encima del de validación (0.770). ¿Cómo lo explica sin que haya fuga?',
        answer:
          'Validación es del 20 al 24 de diciembre y test del 25 al 31: semanas con feriados, otra prevalencia y otro comportamiento. Los modelos y umbrales estaban congelados antes del test.',
      },
      {
        prompt: 'En su bitácora, la primera interacción con ChatGPT fue pedirle un prompt. ¿Para qué le sirvió ese prompt inicial?',
        answer:
          'Para darle a ChatGPT el contexto completo del taller (código, mes, entregables) y que las siguientes respuestas siguieran esa estructura. Debe explicar qué ajustó él.',
      },
    ],
  },
  {
    code: 'A00406923',
    month: '2026-08',
    questions: [
      {
        prompt: 'Su filtro de componentes que no cuadran (> 0,50 USD) marcó el 40 % de la muestra. ¿Por qué dice en el informe que puede ser demasiado restrictivo?',
        answer:
          'Porque la diferencia no siempre es un error: hay cargos no listados o convenciones de tarifa. Al eliminar esas filas se puede sesgar la muestra; haría falta un análisis de sensibilidad.',
      },
      {
        prompt: 'Encontró IDs de zona fuera de 1 a 263 y no los borró. ¿Por qué?',
        answer:
          'Porque las zonas especiales como 264 y 265 (desconocida, fuera de NYC) existen en el diccionario. Las marcó para revisión en lugar de tratarlas como errores.',
      },
      {
        prompt: 'Excluyó los primeros 9 viajes de cada partición en todos los modelos, incluido el MLP. ¿Para qué?',
        answer:
          'Para que el MLP, la RNN y la LSTM se evalúen exactamente sobre los mismos 17.577 viajes. Esos 9 viajes no tienen ventana completa para los modelos recurrentes.',
      },
      {
        prompt: 'Su bitácora dice que ya tenía avanzado el notebook antes de usar ChatGPT. ¿Qué parte hizo usted y qué le pidió corregir?',
        answer:
          'Debe nombrar las secciones propias y un cambio concreto que pidió (por ejemplo, la selección del umbral en validación o el alineamiento de los conjuntos de test).',
      },
    ],
  },
  {
    code: 'A00406968',
    month: '2026-04',
    questions: [
      {
        prompt: 'Su stakeholder actúa sobre la clase 0 (propina baja). ¿Por qué eso lo llevó a macro F1 y no al F1 de la clase positiva?',
        answer:
          'La clase de interés es la minoritaria. El F1 positivo se infla con la clase mayoritaria; macro F1 promedia las dos clases y exige detectar las propinas bajas.',
      },
      {
        prompt: 'Diseñó la ventana para que el último paso sea exactamente la entrada del MLP. ¿Por qué eso hace justa la comparación?',
        answer:
          'Porque la RNN y la LSTM ven la misma información del viaje actual que el MLP, más el contexto. Cualquier diferencia se puede atribuir al contexto o a la arquitectura.',
      },
      {
        prompt: '¿Por qué un GridSearchCV con cv=5 normal habría filtrado información del futuro? ¿Qué usó en su lugar?',
        answer:
          'El k-fold baraja filas de todo el mes y entrenaría con viajes posteriores a los de validación. Usó PredefinedSplit: entrena del 1 al 20 de abril y valida en el bloque siguiente.',
      },
      {
        prompt: 'Su bitácora registra Gemini y Claude. ¿Para qué usó cada uno y qué decisión cambió después de consultarlos?',
        answer:
          'Gemini para la explicación inicial del taller (decisión "modificada") y Claude para el análisis y el plan de trabajo. Debe nombrar una decisión propia que haya ajustado.',
      },
    ],
  },
  {
    code: 'A00407291',
    month: '2025-09',
    questions: [
      {
        prompt: 'Probó ventanas de 4, 8 y 16 viajes de la misma zona y no hubo diferencia. ¿Qué concluye sobre la información secuencial?',
        answer:
          'Que la historia reciente de la zona casi no aporta: la señal está en el viaje actual. Si la secuencia importara, las ventanas más largas cambiarían el resultado.',
      },
      {
        prompt: 'Dice que en GPU la LSTM entrenó más barato que la RNN. ¿Por qué, si tiene más parámetros?',
        answer: 'Porque Keras usa el kernel optimizado de cuDNN para la LSTM con su configuración por defecto, y la SimpleRNN no tiene uno equivalente.',
      },
      {
        prompt: 'Usó como semilla 407291. ¿En qué procesos aleatorios la aplicó y por qué importa?',
        answer: 'En el muestreo, los Dummy, la inicialización de pesos y el shuffle de Keras. Fijarla hace reproducible todo el pipeline.',
      },
      {
        prompt: 'En su bitácora le pidió a Claude que revisara su Colab ya ejecutado. ¿Qué observación aceptó y cuál descartó?',
        answer: 'Debe citar una observación concreta de la revisión de la auditoría o la limpieza, y explicar por qué la aceptó o la descartó.',
      },
    ],
  },
  {
    code: 'A00409959',
    month: '2025-06',
    questions: [
      {
        prompt: 'Eligió el umbral 0,54 que maximiza κ en validación. ¿Por qué no elegirlo directamente sobre test?',
        answer: 'Porque el test debe quedar intacto hasta la evaluación final. Elegir el umbral sobre test sobreestimaría el desempeño.',
      },
      {
        prompt: 'Probó T = 1 frente a T mayores y casi no hubo diferencia. ¿Qué dice eso de la memoria de la RNN?',
        answer: 'Que la historia de la zona aporta muy poco: con T = 1 la RNN equivale a una capa densa y rinde casi igual.',
      },
      {
        prompt:
          'En su bitácora, Claude le señaló que su métrica elegida (kappa) no coincidía con la del código (F1) y que la regla de montos quitaba un tercio de la muestra. ¿Qué cambió en cada caso?',
        answer:
          'Alineó la selección del umbral y del modelo con κ, y revisó la regla de "montos que no cuadran" para no eliminar filas válidas sin justificación (solo las marca o usa un criterio más estricto).',
      },
      {
        prompt: '¿Por qué usó PredefinedSplit en el GridSearchCV del MLP?',
        answer: 'Para entrenar en train y evaluar en la validación cronológica fija, sin mezclar tiempos como haría un k-fold aleatorio.',
      },
    ],
  },
  {
    code: 'A00410043',
    month: '2025-03',
    questions: [
      {
        prompt: '¿Por qué dice que la correlación de 0,42 entre congestion_surcharge y high_tip es un "artefacto"?',
        answer:
          'Porque el 0 imputado en los nulos marca registros incompletos (payment_type 0, casi todos clase 0). La correlación refleja cómo se registraron los datos, no el comportamiento del pasajero.',
      },
      {
        prompt: '¿Qué representa el pico de fare_amount en 70 USD y por qué casi todo es clase 0?',
        answer: 'La tarifa plana a JFK. Con una tarifa alta y una propina en dólares fijos, el porcentaje sobre la tarifa queda bajo.',
      },
      {
        prompt: 'Construyó las secuencias con los viajes previos de la misma zona y una capa Masking. ¿Por qué la zona y para qué sirve Masking?',
        answer:
          'Los viajes de la misma zona comparten contexto local (demanda, tipo de pasajero). Masking ignora los pasos de relleno cuando una zona tiene menos de 4 viajes previos.',
      },
      {
        prompt: 'En su bitácora, lo primero que le preguntó a Claude fue si estaba importando bien el parquet. ¿Qué le corrigió y qué decidió usted?',
        answer:
          'Le confirmó que pd.read_parquet lee directo de la URL, y le dijo que display.max_colwidth sobraba y que convenía display.max_columns. Debe explicar qué ajustó.',
      },
    ],
  },
  {
    code: 'A00410773',
    month: '2026-06',
    questions: [
      {
        prompt: 'Su bitácora dice que la estrategia de imputación fue suya. Explique cómo imputó passenger_count y por qué de forma "proporcional".',
        answer:
          'Asignó valores al azar respetando la distribución observada de pasajeros, en lugar de usar siempre la moda. Así no se infla artificialmente la categoría de 1 pasajero.',
      },
      {
        prompt: '¿Por qué eligió un split aleatorio en lugar del cronológico? ¿Qué riesgo acepta con esa decisión?',
        answer:
          'Para que el feriado de Juneteenth y los patrones de fin de semana queden en los tres conjuntos. El riesgo: el modelo ve días posteriores al test y puede sobreestimar el desempeño.',
      },
      {
        prompt: 'Con timesteps = 1, ¿en qué se diferencia matemáticamente su SimpleRNN de una capa Dense?',
        answer: 'Con $h_0 = 0$, $h_1 = \\tanh(W x + b)$: el término recurrente desaparece y la red es una capa densa con tanh.',
      },
      {
        prompt: 'Su MLP tiene recall 0,93 y precisión 0,71 para high_tip. ¿Qué significa eso para el conductor?',
        answer: 'Detecta casi todos los viajes con buena propina, pero cerca del 29 % de los que marca como "alta propina" no lo son.',
      },
    ],
  },
  {
    code: 'A00410889',
    month: '2026-01',
    questions: [
      {
        prompt: 'Excluyó trip_duration_min y speed_mph. ¿En qué momento supone que se hace la predicción y por qué eso cambia las features disponibles?',
        answer: 'Al inicio del viaje: la duración y la velocidad solo se conocen al final. Si la predicción fuera al final del viaje, sí podría usarlas.',
      },
      {
        prompt: 'En su bitácora, Gemini le ayudó con un pairplot que congelaba Colab. ¿Cuál era el problema y cómo lo resolvió?',
        answer: 'Graficar 144.000 filas agota la RAM. Dibujó el pairplot sobre una submuestra de 3.000 viajes, que basta para ver la forma de las relaciones.',
      },
      {
        prompt: 'Su auditoría compara la suma de componentes con total_amount con una tolerancia de 5 centavos. ¿Por qué una tolerancia y no igualdad exacta?',
        answer: 'Por el redondeo de los valores en punto flotante: la igualdad exacta marcaría como error diferencias de fracciones de centavo.',
      },
      {
        prompt: 'Si tuviera que ajustar la LSTM, ¿qué tres hiperparámetros movería y con qué conjunto elegiría el mejor?',
        answer: 'Unidades, learning rate y dropout (o el número de timesteps), eligiendo con la métrica escogida sobre validación, nunca sobre test.',
      },
    ],
  },
  {
    code: 'A00410954',
    month: '2025-05',
    questions: [
      {
        prompt: 'Su auditoría contó 5.985 viajes con distancia 0, pero el filtro de distancia solo quitó 504. ¿Por qué difieren?',
        answer:
          'Porque los filtros se aplican en orden: muchos de esos viajes ya habían salido en pasos anteriores (las filas con nulos o con duración fuera de rango). La auditoría cuenta sobre la muestra cruda.',
      },
      {
        prompt: 'En su bitácora probó su regla de high_tip con propinas de 4, 5 y 6 USD sobre una tarifa de 20 USD. ¿Qué resultado da cada una?',
        answer: '4/20 = 0,20 → 0; 5/20 = 0,25 → 1 (el umbral es ≥); 6/20 = 0,30 → 1.',
      },
      {
        prompt: 'Sus secuencias usan los 7 viajes previos de la misma zona de recogida. ¿Por qué tiene más sentido que tomar los de toda la ciudad?',
        answer: 'Viajes de la misma zona comparten contexto local (demanda, tipo de pasajero, eventos), así que la historia puede aportar algo. Los de toda la ciudad son casi ruido.',
      },
      {
        prompt: '¿Para qué sirven el padding con −99 y la capa Masking en su diseño?',
        answer: 'Cuando una zona tiene menos de 8 viajes previos, se rellena con −99 y Masking le indica a la red que ignore esos pasos.',
      },
    ],
  },
  {
    code: 'A00411205',
    month: '2024-09',
    questions: [
      {
        prompt: '¿Por qué tomó una muestra de 300.000 viajes si el mínimo eran 100.000?',
        answer: 'Para conservar más de 100.000 viajes después de la limpieza y del filtro de tarjeta: terminó con 211.274 válidos.',
      },
      {
        prompt: 'Su RNN y su LSTM restauran los pesos de la época 1. ¿Qué indica eso y qué cambiaría?',
        answer:
          'Que la pérdida de validación no mejoró después de la primera época. Probaría otro learning rate, más paciencia y otras unidades; además, con timesteps = 1 la recurrencia no aporta.',
      },
      {
        prompt: 'Su informe dice que la LSTM tiene cuatro veces los parámetros internos de una RNN simple. Explique de dónde sale el 4.',
        answer: 'La LSTM tiene cuatro bloques (compuertas de olvido, entrada y salida, más la candidata), cada uno con sus propias W, U y b.',
      },
      {
        prompt: 'El most_frequent tiene recall 1,0 en su tabla. ¿Por qué, si es un modelo inútil?',
        answer: 'Porque su clase mayoritaria es high_tip = 1 (53 %): siempre predice 1 y detecta todos los positivos, pero tiene kappa 0 y AUC 0,5.',
      },
    ],
  },
  {
    code: 'A00411232',
    month: '2025-08',
    questions: [
      {
        prompt: 'Construyó ventanas de T = 5 viajes consecutivos de la ciudad. En su bitácora preguntó cómo definir el tiempo sin ID de vehículo. ¿Qué decidió y qué limitación reconoció?',
        answer: 'El tiempo es el flujo de recogidas de la ciudad. La limitación: los 5 viajes son de conductores y pasajeros distintos, así que la memoria aporta poco.',
      },
      {
        prompt: 'Codificó la hora con hour_sin y hour_cos. ¿Por qué no usar la hora directamente (0 a 23)?',
        answer: 'Porque la hora es cíclica: 23 y 0 están cerca, pero como número están lejos. Seno y coseno ponen las horas en un círculo.',
      },
      {
        prompt: 'Su is_airport usa los PULocationID 132 y 138. ¿Qué zonas son y por qué influirían en la propina?',
        answer: 'JFK (132) y LaGuardia (138). Los viajes al aeropuerto tienen tarifas altas o planas y propinas en dólares fijos, así que el porcentaje baja.',
      },
      {
        prompt: 'Su tabla de tuning del MLP ordena por val_auc. ¿Qué configuración ganó y qué aprendió de comparar l2 = 0 con l2 = 0,0001?',
        answer: 'Ganó (128, 64) con lr 0,001, dropout 0,2 y l2 = 0. La regularización L2 extra no mejoró la validación: con dropout ya había suficiente regularización.',
      },
    ],
  },
  {
    code: 'A00411234',
    month: '2024-11',
    questions: [
      {
        prompt: 'Su auditoría encontró 51.229 viajes donde total_amount no coincide con la suma de componentes. ¿Qué hizo con ellos y por qué?',
        answer: 'Debe explicar si los eliminó o los conservó. Lo razonable es marcarlos: total_amount no es feature y muchas diferencias son cargos fijos.',
      },
      {
        prompt: '¿Por qué filtró solo payment_type = 1 antes de crear high_tip?',
        answer: 'Porque la propina en efectivo no se registra: un 0 en efectivo es un dato faltante, no una decisión del pasajero.',
      },
      {
        prompt: 'Usó ventanas de 5 viajes consecutivos ordenados por hora. ¿Por qué esa ventana debería ayudar a predecir la propina del quinto viaje?',
        answer: 'Solo aporta un contexto general del momento (hora, tráfico). Son viajes de pasajeros distintos, por eso la RNN y la LSTM rinden igual que el MLP.',
      },
      {
        prompt: 'Su split es 70/30 cronológico. ¿Qué datos usó para el early stopping y por qué convendría un conjunto de validación separado?',
        answer: 'Debe explicar su configuración. La validación separada permite ajustar hiperparámetros y detener el entrenamiento sin tocar el test.',
      },
    ],
  },
  {
    code: 'A00411438',
    month: '2025-01',
    questions: [
      {
        prompt: 'Su auditoría revisó códigos de VendorID, RatecodeID, velocidades > 100 mph y sumas de montos. ¿Cuál de esos problemas afectó más registros y qué hizo con él?',
        answer: 'Las sumas que no cuadran (115.073). Debe explicar si las eliminó o las conservó, sabiendo que total_amount no se usa como feature.',
      },
      {
        prompt: 'Sus boxplots están separados por clase. ¿Qué variable muestra la diferencia más clara entre propina alta y baja?',
        answer: 'La duración o la tarifa: los viajes con propina alta son más cortos y baratos, porque las propinas en dólares fijos pesan más en tarifas bajas.',
      },
      {
        prompt: 'Su RNN y su LSTM obtuvieron la misma accuracy que el Dummy most_frequent (0,6335) con recall 1,0. ¿Qué significa?',
        answer: 'Que colapsaron a predecir siempre la clase mayoritaria. Ajustaría el learning rate, las épocas o el diseño de la ventana, y lo verificaría con kappa.',
      },
      {
        prompt: 'Diseñó ventanas de 5 viajes. Explique la forma del tensor que obtuvo, (71923, 5, 6).',
        answer: '71.923 muestras, 5 viajes por ventana y 6 features por viaje. Se pierden las primeras filas porque no tienen 4 viajes previos.',
      },
    ],
  },
  {
    code: 'A00411450',
    month: '2026-02',
    questions: [
      {
        prompt: 'Encontró 210 "pares viaje-reversión". ¿Qué son y qué hizo con ellos?',
        answer: 'El mismo viaje registrado dos veces: una con montos positivos y otra con los montos negados (anulación). Se eliminan ambos.',
      },
      {
        prompt: '¿Por qué un Airport_fee distinto de 0 o 1,75 es un valor inválido en su mes?',
        answer: 'El diccionario fija el cargo de aeropuerto en 1,75 USD para pickups en LGA o JFK. Otros valores son errores de registro.',
      },
      {
        prompt: 'Eligió macro F1 en lugar del F1 de la clase positiva. ¿Qué diferencia hay en su caso?',
        answer: 'Macro F1 promedia ambas clases y no se infla con la mayoritaria: el Dummy most_frequent obtiene macro F1 de 0,375.',
      },
      {
        prompt: 'En su bitácora le pidió a Claude trabajar "un paso por respuesta" esperando su salida. ¿Por qué ese método y en qué paso corrigió algo?',
        answer: 'Para ejecutar y revisar cada salida antes de avanzar. Debe nombrar un paso donde su salida cambió la siguiente decisión.',
      },
    ],
  },
  {
    code: 'A00411481',
    month: '2026-07',
    questions: [
      {
        prompt: 'Para las ventanas de validación y test usó las últimas 9 filas del bloque anterior. ¿Por qué y hay fuga?',
        answer: 'Para que cada muestra de test tenga ventana completa y se evalúen los mismos viajes que con el MLP. Usa solo features del bloque anterior, no etiquetas, así que no hay fuga del target.',
      },
      {
        prompt: 'Imputó passenger_count = 1 cuando era 0 o nulo. ¿Qué limitación reconoce en su informe?',
        answer: 'Puede asignar mal la ocupación real del viaje y la bandera de aeropuerto. Lo aceptó para conservar filas válidas.',
      },
      {
        prompt: 'Su heatmap muestra que la mayor asociación con high_tip es duration_min (r = −0,34). ¿Qué significa el signo negativo?',
        answer: 'Que los viajes más largos tienden a tener un porcentaje de propina menor: la propina en dólares fijos pesa menos sobre tarifas altas.',
      },
      {
        prompt: 'Eligió F1. ¿Cuánto obtiene el Dummy que siempre dice "propina alta" y qué implica eso para su elección?',
        answer: 'F1 = 0,738. Como la clase positiva es mayoritaria, el F1 parte alto: conviene leerlo junto con kappa.',
      },
    ],
  },
  {
    code: 'A00411667',
    month: '2025-11',
    questions: [
      {
        prompt: 'Encontró un viaje de 164.868 millas. ¿Qué hizo con ese registro y por qué?',
        answer: 'Lo eliminó con el filtro 0 < distancia ≤ 100: es un error de unidad o de digitación, imposible para un taxi.',
      },
      {
        prompt: 'Concluye que las tres redes rinden "esencialmente igual". ¿Qué experimento haría para comprobar si la ventaja del MLP es real?',
        answer: 'Repetir con varias semillas o hacer bootstrap del test y comparar los intervalos de confianza de kappa.',
      },
      {
        prompt: 'Creó la columna desajuste_total en lugar de borrar las filas. ¿Por qué?',
        answer: 'Porque el desajuste no involucra la decisión de propina y total_amount no es feature. Lo dejó como marca de calidad.',
      },
      {
        prompt: 'En su bitácora, la respuesta sobre la auditoría aparece como "modificada parcialmente". ¿Qué aceptó y qué cambió usted?',
        answer: 'Aceptó las detecciones lógicas y los filtros de eliminación. Debe explicar qué umbral o qué regla ajustó con su criterio.',
      },
    ],
  },
  {
    code: 'A00411822',
    month: '2024-07',
    questions: [
      {
        prompt: 'Casi todas las diferencias del total eran exactamente ±2,50. ¿Qué cargo es y por qué no eliminó esas filas?',
        answer: 'El congestion surcharge. Es una particularidad del registro y total_amount no se usa como feature.',
      },
      {
        prompt: 'En su bitácora le preguntó a Gemini cómo hacer las ventanas sin mezclar train, val y test. ¿Qué hizo y qué forma le quedó?',
        answer: 'Primero el split cronológico y luego las ventanas dentro de cada conjunto. Pierde 9 filas por bloque: (126905, 10, 10) en train.',
      },
      {
        prompt: 'Su validation loss queda por debajo del training loss. ¿Es un error?',
        answer: 'No: el dropout solo actúa en entrenamiento y Keras promedia la pérdida de entrenamiento durante la época.',
      },
      {
        prompt: 'Sus modelos detectan solo el 56 % al 58 % de los viajes con propina baja. ¿Qué haría si al conductor le costaran más los falsos positivos?',
        answer: 'Subir el umbral de decisión por encima de 0,5, elegido en validación, para ganar precisión a costa del recall.',
      },
    ],
  },
  {
    code: 'A00411900',
    month: '2024-10',
    questions: [
      {
        prompt: 'Usted eligió kappa en lugar de F1. ¿Por qué el F1 engaña en su mes en particular?',
        answer: 'Porque la clase positiva es la mayoritaria: el Dummy que siempre dice "alta" obtiene F1 de 0,706 sin aprender nada. Kappa lo deja en 0.',
      },
      {
        prompt: '¿Por qué extras_ratio (recargos / tarifa) resultó ser la mejor variable? Explique el mecanismo.',
        answer: 'La pantalla de pago sugiere la propina sobre el total, que incluye recargos. Si los recargos pesan mucho, un 20 % del total supera el 25 % de la tarifa.',
      },
      {
        prompt: 'La RNN tiene menos parámetros que el MLP pero tardó 2,9 veces más. ¿Por qué?',
        answer: 'Porque repite el cálculo recurrente en cada uno de los 12 pasos, en orden. El costo depende de los pasos, no solo de los parámetros.',
      },
      {
        prompt: 'En su bitácora usó como guía los prompts del ejercicio de Netflix de clase. ¿Cuál adaptó y cómo lo tradujo a su problema?',
        answer: 'Por ejemplo, el de la nube de palabras: no aplicaba a datos de taxis y lo reemplazó por las gráficas del EDA. Debe explicar otro ejemplo con sus palabras.',
      },
    ],
  },
  {
    code: 'A00411935',
    month: '2024-08',
    questions: [
      {
        prompt: 'Explique con sus palabras qué hace build_sequences y por qué ordena por zona y luego por tiempo.',
        answer: 'Agrupa los viajes por PULocationID, mantiene el orden cronológico y toma los 5 anteriores de la misma zona más el actual (6 pasos). Si faltan, rellena con −9 y Masking los ignora.',
      },
      {
        prompt: '¿Para qué usó PredefinedSplit en el GridSearchCV en lugar de cv=5?',
        answer: 'Para respetar el split cronológico: entrena en train y evalúa en la validación fija, sin mezclar el futuro.',
      },
      {
        prompt: 'Para su stakeholder, ¿por qué un falso positivo es peor que un falso negativo?',
        answer: 'Una alerta de "propina alta" que falla erosiona la confianza del conductor en la app. Un FN solo oculta un buen viaje.',
      },
      {
        prompt: 'En su bitácora, Claude interpretó sus diferencias en total_amount (2,50 / 1,75 / 4,25). ¿A qué cargos corresponden?',
        answer: '2,50 es el congestion surcharge, 1,75 el airport fee y 4,25 la suma de ambos.',
      },
    ],
  },
  {
    code: 'A00412281',
    month: '2025-02',
    questions: [
      {
        prompt: 'En su bitácora preguntó cómo hacer que el modelo entienda que las 00:00 van después de las 23:00. ¿Qué solución aplicó?',
        answer: 'La codificación cíclica: $\\sin(2\\pi h/24)$ y $\\cos(2\\pi h/24)$. En el círculo, 23 y 0 quedan vecinas.',
      },
      {
        prompt: 'Sus 45.350 filas con nulos eran todas Flex Fare. ¿Por qué las eliminó en lugar de imputarlas?',
        answer: 'Porque no son pagos con tarjeta: no se puede suponer que su propina quedó registrada, así que no son filas válidas para la tarea.',
      },
      {
        prompt: 'Marcó 28.233 filas con amount_mismatch pero no las borró. ¿Por qué?',
        answer: 'Porque total_amount no es feature (contiene la propina) y esas filas pasan todos los demás chequeos.',
      },
      {
        prompt: 'En su tabla de tuning, la RNN de 32 unidades sin dropout ganó. ¿Qué le dice eso sobre la capacidad que necesita el problema?',
        answer: 'Que una red pequeña basta: más unidades o capas no mejoran la validación, porque el límite está en la información de las features.',
      },
    ],
  },
  {
    code: 'A00412453',
    month: '2025-07',
    questions: [
      {
        prompt: 'Hizo frequency encoding de PULocationID ajustado solo con train. Explique qué es y por qué solo con train.',
        answer: 'Reemplaza cada zona por su frecuencia relativa. Ajustarlo con todos los datos filtraría información de validación y test.',
      },
      {
        prompt: '¿Por qué puso en 0 los nulos de congestion, airport y CBD fee, pero imputó passenger_count con la mediana?',
        answer: 'En las tarifas, nulo significa "el cargo no aplica" (0 es el valor correcto). passenger_count es un conteo desconocido y la mediana es el valor más plausible.',
      },
      {
        prompt: 'En su mes, ¿qué valores tienen el recall, el F1 y el kappa del Dummy most_frequent?',
        answer: 'La mayoría es la clase positiva (57,8 %): recall 1,0, F1 0,7396 y kappa 0.',
      },
      {
        prompt: 'En su bitácora pidió explicaciones "sin darme el código final". ¿Qué parte del notebook escribió con base en esa explicación?',
        answer: 'Debe describir la carga, el filtrado y la tabla de auditoría (problema, columna, registros) que construyó a partir de la explicación.',
      },
    ],
  },
  {
    code: 'A00412508',
    month: '2026-05',
    questions: [
      {
        prompt: 'Filtró payment_type = 1. ¿Por qué los pagos en efectivo no son filas válidas para esta tarea?',
        answer: 'En efectivo la propina no queda registrada (tip_amount = 0 aunque haya propina): es un dato faltante disfrazado.',
      },
      {
        prompt: 'Su enunciado define high_tip con tip_ratio ≥ 0,25. ¿Qué pasa con un viaje con tarifa de 20 USD y propina de 5 USD?',
        answer: 'tip_ratio = 0,25 exactamente, así que es clase 1. Con > en lugar de ≥ quedaría como 0, y los botones de propina del 25 % hacen frecuente ese caso.',
      },
      {
        prompt: 'Terminó con 97.813 filas válidas. ¿Qué tendría que cambiar para cumplir el mínimo de 100.000?',
        answer: 'Tomar una muestra inicial más grande con la misma semilla (por ejemplo, 160.000) y reportar los tamaños antes y después.',
      },
      {
        prompt: 'Su auditoría encontró 1.902 viajes con duración cero o negativa. ¿Qué indican y qué hizo con ellos?',
        answer: 'Errores del taxímetro o del reloj (drop-off antes o igual al pickup). Se eliminan porque la duración y la velocidad quedan indefinidas.',
      },
    ],
  },
]

//Convierte las preguntas de un estudiante al formato de QuestionPanel.
export function starredQuestions(student) {
  if (!student) return []
  return student.questions.map((q, i) => ({
    id: `${student.code}-${i + 1}`,
    label: `★${i + 1}`,
    starred: true,
    topic: `Específica ${student.code}`,
    type: 'text',
    prompt: q.prompt,
    answer: q.answer,
  }))
}
