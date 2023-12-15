import React from 'react';
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';
import './day-picker.css';

import { useDateRangeSelector } from './hooks/useDateRangeSelector';

const currDate = new Date();

export default function DateRangeSelector(props) {
    const { selectedRange, setSelectedRange } = useDateRangeSelector();
    return (
        <div
            className="bg-white text-black shadow-xl h-[350px] pt-1 rounded-lg"
            style={{ marginTop: '-20px' }}
        >
            <DayPicker
                id="test"
                mode="range"
                defaultMonth={currDate}
                numberOfMonths={2}
                selected={props.range}
                onSelect={props.setRange}
                selected={selectedRange}
                onSelect={setSelectedRange}
                modifiersClassNames={{
                    today: 'my-today',
                }}
            />
        </div>
    );
}