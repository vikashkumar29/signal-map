import SignalMap from './SignalMap';
import { Panel } from 'primereact/panel';

function App() {
  

  return (
    <div className='m-4 flex flex-grow'>
      <Panel header="Moșnița Signal Map" className='flex flex-col flex-grow border border-gray-300'
        pt={{
          toggleableContent: { className: 'h-full' },
          content: { className: 'h-full flex flex-col p-0 relative' },
          title: { className: 'px-4' }
        }}>
        <SignalMap />
      </Panel>
    </div>
  )
}

export default App
