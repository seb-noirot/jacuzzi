import React from 'react';
import { Form, FormGroup, Label, Input, Progress } from 'reactstrap';

interface TargetRangeInputProps {
    label: string;
    min: number;
    max: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
}

const TargetRangeInput: React.FC<TargetRangeInputProps> = ({
                                                               label,
                                                               min,
                                                               max,
                                                               onMinChange,
                                                               onMaxChange,
                                                           }) => {
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = parseFloat(event.target.value);
        onMinChange(newMin);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = parseFloat(event.target.value);
        onMaxChange(newMax);
    };

    const calculateProgress = (value: number) => {
        const progress = ((value - min) / (max - min)) * 100;
        return progress.toFixed(2);
    };

    return (
        <div>
            <Label>{label}:</Label>
            <div className="target-range-input">
                <Input
                    type="number"
                    value={min}
                    onChange={handleMinChange}
                    className="target-range-input-min"
                />
                <Progress
                    className="target-range-input-bar"
                    value={calculateProgress(min)}
                    max={100}
                />
                <Input
                    type="number"
                    value={max}
                    onChange={handleMaxChange}
                    className="target-range-input-max"
                />
            </div>
        </div>
    );
};

export default TargetRangeInput;
