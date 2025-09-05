import { Divider } from 'primereact/divider';
import type { MarkerData } from './model';

export interface SummaryProps {
    markerData: MarkerData;
}

function Summary({ markerData }: SummaryProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className={`flex flex-row gap-2 font-bold py-2 mb-2`}>
                <span className='text-xl'>{markerData.category === 'weak' ? 'Weak signal' : 'No signal'}</span>
            </div>
            <div className='font-bold'>Comment:</div>
            <div className='font-mono'>{markerData.comment || 'No comment provided'}</div>
            <Divider />
            <div className='flex flex-row gap-2 text-cyan-800' >
                <i className="pi pi-map-marker"></i>
                <span className=''>{markerData.lat}, {markerData.lng}</span>
            </div>
        </div>
    );
}

export default Summary;