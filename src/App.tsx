import { Button } from 'primereact/button';
import SignalMap, { type SignalMapHandle } from './SignalMap';
import { Panel } from 'primereact/panel';
import { exportToCSV } from './api/csvCreator';
import { useRef } from 'react';

function App() {

  const mapRef = useRef<SignalMapHandle>(null)

  const onDownload = () => {
    if (mapRef.current) {
      exportToCSV(mapRef.current.markers, 'export.csv');
    } else {
      console.error("Map reference is null");
    }
  };

  const headerTemplate = () => {
    return (
      <div className="flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-2">
          <i className='pi pi-map' />
          <span className="p-panel-title">Moșnița Signal Map</span>
        </div>
        <Button size='small' icon='pi pi-file-export' label='Export' onClick={onDownload} />
      </div>
    );
  };


  return (

    <div className='m-4 flex flex-grow'>
      <Panel headerTemplate={headerTemplate} className='flex flex-col flex-grow border border-gray-300'
        pt={{
          toggleableContent: { className: 'h-full' },
          content: { className: 'h-full flex flex-col p-0 relative' },
          title: { className: 'px-4' }
        }}>
        <SignalMap ref={mapRef} />
      </Panel>
    </div>
  )
}

export default App
