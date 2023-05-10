import { useEffect, useState } from "react"




function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 1, y: 2})

  

  useEffect(() => {
    console.log('efecto', {enabled});


    const handleMove = (event) => {

      const {clientX, clientY} = event
      
      setPosition({x:clientX, y:clientY})

      // console.log({clientX, clientY, enabled});
    }
    if (enabled){
      window.addEventListener('pointermove', handleMove)
      
    } 

    console.log(position);

    // clean up
    // cuando el componente se desmonta
    // cuando cambian las dependencias, antes de ejecutar el efecto nuevamente
    return () => {
      window.removeEventListener('pointermove', handleMove)
      
    }


  }, [enabled,position])




  return (
    <main>

      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: '0.8',
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`
      }}>
        
      </div>
      <h1>Mouse Follower</h1>



      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Desactivar': 'Activar'} puntero</button>
    </main>
  )
}

export default App
