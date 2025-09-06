import type { MarkerData } from '../model/model';
import { downloadFile } from './downloader';

export function exportToCSV(markers: MarkerData[], filename: string) {
    let content = `Lattitue,Longitude,Category,Comment\n`;
    markers.forEach(marker => {
        const catergory = marker.category === 'weak' ? 'Weak signal' : 'No signal';
        const row = `${marker.lat},${marker.lng},"${catergory}","${marker.comment?.replace(/"/g, '""') || ''}"\n`;
        content += row;
    });
    const file = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    downloadFile(filename, file);
}