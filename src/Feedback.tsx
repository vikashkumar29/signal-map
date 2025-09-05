import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { useState, type MouseEvent } from 'react';
import type { FeedbackData } from './model/model';


export interface FeedbackProps {
    onFeedbackSubmit: (data: FeedbackData) => void;
}

function Feedback({ onFeedbackSubmit }: FeedbackProps) {
    const [selectedCategory, setSelectedCategory] = useState<'weak' | 'noSignal'>('weak');
    const [value, setValue] = useState('');

    const submitFeedback = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onFeedbackSubmit({ category: selectedCategory, comment: value });
    };

    return (
        <div className="w-full flex flex-col">
            <h2 className='font-bold mb-2 text-xl'>Report Signal Issue:</h2>
            <div className='flex flex-col gap-2'>
                <div className="flex items-center">
                    <RadioButton inputId='weak' name="strength" value='weak' onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory === 'weak'} />
                    <label htmlFor='weak' className="ml-2">Weak signal</label>
                </div>
                <div className="flex items-center">
                    <RadioButton inputId='noSignal' name="strength" value='noSignal' onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory === 'noSignal'} />
                    <label htmlFor='noSignal' className="ml-2">No signal</label>
                </div>
            </div>
            <div className='mt-2 flex flex-col gap-2'>
                <label htmlFor="comment">Comment (optional)</label>
                <InputTextarea id="comment" value={value} onChange={(e) => setValue(e.target.value)} rows={5} className='resize-none' placeholder='Add comments' />
            </div>
            <Divider />
            <Button label="Submit" onClick={submitFeedback} />
        </div>
    );
}

export default Feedback;