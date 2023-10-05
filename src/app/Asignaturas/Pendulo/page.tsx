'use client'

import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const Pendulo = () => {
   // Estados para el péndulo y la simulación
  const [amplitude, setAmplitude] = useState(0.1); // Amplitud en grados
  const [length, setLength] = useState(1.5); // Longitud en metros
  const [gravity, setGravity] = useState(9.86); // Aceleración debido a la gravedad en m/s^2
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false); // variable que determina si se esta ejecutando el pendulo
  const [dragging, setDragging] = useState(false);  // Estado que determina cuando hay un arrastre
  const [dragStartX, setDragStartX] = useState(0); // Posición X al inicio del arrastre
  const animationRef = useRef<number>();
  const [initialTime, setInitialTime] = useState(0); // Guarda el tiempo inicial
  const [pausedTime, setPausedTime] = useState(0); // Guarda el tiempo cuando se pausa
  const [periodText, setPeriodText] = useState(""); // Variable para almacenar el texto del periodo
  const positionChartRef = useRef<any>();
  const [positionData, setPositionData] = useState<any>([]); // Almacena los datos de posición
  const [lastUpdateTime, setLastUpdateTime] = useState(0); // Estado para almacenar el último tiempo de actualización
  const [isSlidersLocked, setIsSlidersLocked] = useState(false); //Estado que bloquea los slider cuando la simulacion esta en ejecucion



  useEffect(() => {
    if (!isRunning) return;

    const pendulum = document.getElementById("pendulum");
    const ball = document.getElementById("ball");
    const shadow = document.getElementById("shadow");

    if (!pendulum || !ball || !shadow) return;

    const thetaMax = (amplitude * Math.PI) / 180; // Convierte amplitud a radianes
    const frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length); // Frecuencia angular

    // Función para actualizar la posición del péndulo

    const updatePosition = () => {
      const currentTime = performance.now() / 1000 - initialTime; // Tiempo actual en segundos
      const angularPosition = thetaMax * Math.cos(2 * Math.PI * frequency * currentTime);
      const x = length * Math.sin(angularPosition);
      const h = length - length * Math.cos(thetaMax);
      const y = length * Math.cos(angularPosition) - h * Math.cos(angularPosition);

      if(amplitude=== 0.1){
        setAmplitude(0)
      }
      
      // Verifica si ha transcurrido al menos 0.1 segundos para agregar un punto en el gráfico
    if (currentTime - lastUpdateTime >= 0.1) {
      const newPositionData = [...positionData, { time: currentTime, position: x }];
      setPositionData(newPositionData);
      updatePositionChart(newPositionData);
      setLastUpdateTime(currentTime); // Actualiza el último tiempo de actualización
    }

      ball.setAttribute("cx", `${50 + x * 50}%`);
      ball.setAttribute("cy", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);
      shadow.setAttribute("cx", `${50 + x * 50}%`);
      shadow.setAttribute("cy", "94%");
      pendulum.setAttribute("x1", "50.02%");
      pendulum.setAttribute("y1", `${0} *50%`);
      pendulum.setAttribute("x2", `${50 + x * 50}%`);
      pendulum.setAttribute("y2", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);

      setTime(currentTime);

      if (isRunning) {
        // Actualiza la posición de los elementos del péndulo en la pantalla
        animationRef.current = requestAnimationFrame(updatePosition);
      }

    };
    // Continúa actualizando la posición llamando a esta función de nuevo
    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [amplitude, length, gravity, initialTime, isRunning,positionData,lastUpdateTime]);
  
  // Funciones para controlar la simulación

  const startSimulation = () => {
    if (!isRunning) {
      // Inicia la simulación
      setIsRunning(true);
  
      if (pausedTime) {
        const currentTime = performance.now() / 1000;
        setInitialTime(currentTime - pausedTime);
        setPausedTime(0);
      } else if (!initialTime) {
        const currentTime = performance.now() / 1000;
        setInitialTime(currentTime - time);
      }

      // Bloquea los sliders cuando el péndulo está en movimiento
      setIsSlidersLocked(true);
      setLastUpdateTime(0);
    }
  };
  
  const pauseSimulation = () => {
    // Pausa la simulación
    setIsRunning(false);
    const currentTime = performance.now() / 1000;
    setPausedTime(currentTime - initialTime);
  
    // Desbloquea los sliders cuando se pausa el péndulo
    setIsSlidersLocked(false);
  };
  
  const resetSimulation = () => {
    // Reinicia la simulación
    setIsRunning(false);
    setAmplitude(0.1);
    setInitialTime(0);
    setPausedTime(0);
    setIsSlidersLocked(false);
    setTime(0);
    
    setPositionData([]); // Borra los datos de posición

  // Elimina la gráfica de posición existente
  if (positionChartRef.current) {
    positionChartRef.current.destroy();
  }

  // Crea una nueva gráfica de posición
  initializePositionChart();
  };
  
  const handleLengthChange = (e:any) => {
    // Maneja el cambio en la longitud del péndulo
    const newLength = parseFloat(e.target.value);
    setLength(newLength);
  };

  const handleMouseDown = (e:any) => {
    // Comienza el arrastre cuando se hace clic en la bola
    setDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e:any) => {
    if (dragging) {
      // Calcula el cambio en la posición X del ratón
      const deltaX = e.clientX - dragStartX;

      // Calcula el cambio de amplitud proporcional a la velocidad
      const speedFactor = 0.05; 
      const deltaAmplitude = deltaX * speedFactor;

      // Calcula la nueva amplitud
      const newAmplitude = amplitude + deltaAmplitude;

      // Limita la nueva amplitud dentro del rango [-4, 4]
      const minAmplitude = -4;
      const maxAmplitude = 4;
      const clampedAmplitude = Math.min(Math.max(newAmplitude, minAmplitude), maxAmplitude);

      // Actualiza la amplitud
      setAmplitude(clampedAmplitude);

      // Actualiza la posición de inicio del arrastre
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    // Detiene el arrastre cuando se suelta el clic
    setDragging(false);
  };

  useEffect(() => {
    // Agrega los event listeners para el arrastre de la bola
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Limpia los event listeners al desmontar el componente
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);


  // Calcula la posición inicial del péndulo cuando se carga el componente
  useEffect(() => {
    const pendulum = document.getElementById("pendulum");
    const ball = document.getElementById("ball");
    const shadow = document.getElementById("shadow");

    if (!pendulum || !ball || !shadow) return;

    const thetaMax = (amplitude * Math.PI) / 180; // Convierte amplitud a radianes
    const angularPosition = thetaMax;

    const x = length * Math.sin(angularPosition);
    const h = length - length * Math.cos(thetaMax);
    const y = length * Math.cos(angularPosition) - h * Math.sin(angularPosition);

    ball.setAttribute("cx", `${50 + x * 50}%`);
    ball.setAttribute("cy", `${0 + y * 50 + h * Math.cos(angularPosition)}%`);
    shadow.setAttribute("cx", `${50 + x * 50}%`);
    shadow.setAttribute("cy", "94%");
    pendulum.setAttribute("x1", "50%");
    pendulum.setAttribute("y1", `${0}%`);
    pendulum.setAttribute("x2", `${50 + x * 50}%`);
    pendulum.setAttribute("y2", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);
  }, [amplitude, length]);


  // Función para manejar cambios en el slider de gravedad
  const handleGravityChange = (e:any) => {
    const newGravity = parseFloat(e.target.value);
    setGravity(newGravity);
  };

  const calculatePeriod = () => {
    if(amplitude>0.1){
      // Calcula el periodo utilizando la fórmula T = 2π√(L/g)
      const period = 2 * Math.PI * Math.sqrt(length / gravity);

      // Muestra el resultado en un texto
      setPeriodText(`El periodo es ≈ ${period.toFixed(2)} s`);
    }
    else{
      setPeriodText("");
    }
  };

  // Renderiza la interfaz de usuario
  const initializePositionChart = () => {
    const positionCanvas:any = document.getElementById("position-chart");
  
    if (positionCanvas) {
      positionChartRef.current = new Chart(positionCanvas, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Posición (m)",
              data: [],
              borderColor: "red",
              backgroundColor: "red",
              borderWidth: 1.3,
              pointRadius: 0,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Tiempo (s)",
              },
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Posición (m)",
              },
            },
          },
        },
      });
    }
  };
  
  // Inicializa la gráfica de posición

  const updatePositionChart = (data:any) => {
    if (positionChartRef.current) {
      const timeData = data.map((point:any) => point.time.toFixed(2));
      const positionData = data.map((point:any) => point.position);
  
      positionChartRef.current.data.labels = timeData;
      positionChartRef.current.data.datasets[0].data = positionData;
      positionChartRef.current.update();
    }
  };  
  useEffect(() => {
    initializePositionChart();
  }, []);

  return (
    <div className="container p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Péndulo Simple</h1>
        <div className="relative h-96  w-50 ">
          {/* Espacio donde se muestra el tiempo del pendulo*/}
          <div className="absolute bg-gray-200 rounded-lg w-40 h-16 ml-60">
              <p className=" mt-4 text-lg font-semibold"> {time.toFixed(2)} seg</p>
          </div>
          {/* ESpacio para la renderizacion de los diagramas*/}
          <div className=" absolute bg-red-500 p-6 rounded-lg w-1/3 -right-4 -top-20 ">
            <h2 className="text-xl text-white mb-4 font-semibold">Diagramas</h2>
            <div className="mb-4 bg-white">
              <canvas id="position-chart" width="400" height="350"></canvas>
            </div>
            <div className="mb-4">
              <h3 className="text-white text-l">Velocidad</h3>
              {/* Aqui se Agregara la gráfica de velocidad aquí */}
            </div>
            <div>
              <h3 className="text-white text-l">Aceleración</h3>
              {/*  Aqui se Agregara la gráfica de aceleración aquí */}
            </div>
          </div>
           {/* se dibuja el pendulo, y el soporte*/}
          <svg width="100%" height="100%">
            <defs>
              {/* Cuerda del pendulo*/}
              <linearGradient id="yellowGradient" x1="0%" y1="10%" x2="0%" y2="110%">
                <stop offset="0%" style={{ stopColor: "orange", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "dark", stopOpacity: 1 }} />
              </linearGradient>
              {/* Soporte del pendulo */}
              <linearGradient id="supportGradient" x1="0%" y1="-30%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "gray", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "gray", stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            <line
              x1="50%"
              y1="10%"
              x2="50%"
              y2="50%"
              stroke="url(#yellowGradient)"
              strokeWidth="3"
              id="pendulum"
            />
            <rect
              x="38%"
              y="0%"
              width="0.5%"
              height="90%" 
              fill="url(#supportGradient)" 
              id="support2"
            />
            <rect
              x="35%"
              y="90%"
              width="10%"
              height="2%"
              fill="gray"
              id="labSupport"
            />
            <rect
              x="38%"
              y="0%"
              width="12%"
              height="1.5%"
              fill="gray"
              id="labSupport"
            />
          <defs>
            {/* masa del pendulo */}
            <radialGradient id="redGradient" cx="50%" cy="30%" r="50%">
              <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "darkred", stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          <circle
            cx="50%"
            cy="60%"
            r="12"
            fill="url(#redGradient)"
            id="ball"
            onMouseDown={handleMouseDown} 
            style={{ cursor: "grab" }}
          />
          <circle
            cx="50%"
            cy="100%"
            r="12"
            fill="rgba(0, 0, 0, 0.4)"
            id="shadow"
            filter="blur(8px)" 
          />
        </svg>
      </div>
      {/* sliders del pendulo */}
      <div className="my-4">
        <label>Longitud (m): {length.toFixed(2)}</label>
        <input
          type="range"
          min="0.1"
          max="1.5"
          step="0.01"
          value={length}
          onChange={handleLengthChange}
          disabled={isSlidersLocked} 
        />
      </div>
      <div className="my-4">
        <label>Gravedad (m/s²): {gravity.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="9.86"
          step="0.01"
          value={gravity}
          onChange={handleGravityChange}
          disabled={isSlidersLocked} 
        />
      </div>
      {isSlidersLocked && (
      <p className="text-red-500 font-semibold mt-2">No se pueden modificar los sliders mientras el péndulo está en movimiento.</p>
       )}
      <div className="my-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Botones del pendulo */}
          <div>
            <button
              onClick={startSimulation}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mr-2"
            >
              Start
            </button>
            <button
              onClick={pauseSimulation}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 mr-2"
            >
              Pause
            </button>
            <button
              onClick={resetSimulation}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
            >
              Reset
            </button>
          </div>
          {isRunning && (
            <button
              onClick={calculatePeriod}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            >
              Periodo
            </button>
          )}
        </div>
        {periodText && (
          <p className="text-lg font-semibold mt-2">{periodText}</p>
        )}
      </div>
    </div>
  );
};

export default Pendulo;