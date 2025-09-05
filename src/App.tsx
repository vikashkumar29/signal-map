import { Card } from "primereact/card";
import SignalMap from './SignalMap';

function App() {
  

  return (
    <div className='m-4 flex flex-grow'>
      <Card title="Moșnița Signal Map" className='h-full w-full border border-gray-300 rounded-xl'
        pt={{
          body: { className: 'h-full flex flex-col p-0 pt-4' },
          content: { className: 'h-full flex flex-col p-0 relative' },
          title: { className: 'px-4' }
        }}>
        <SignalMap />
      </Card>
    </div>
  )
}

export default App
