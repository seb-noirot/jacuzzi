import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {ProductData} from "./dataInterfaces";

interface GranulesCalculatorProps {
    granulesConfig: {
        spoonsPerPersonPerHour: number;
        unit: string;
    };
    initialValue: ProductData;
}

const GranulesCalculator: React.FC<GranulesCalculatorProps> = ({ granulesConfig, initialValue }) => {

    const [formValues, setFormValues] = useState<ProductData>(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Replace comma with period for consistent decimal format
        const sanitizedValue = value.replace(',', '.');

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: sanitizedValue,
        }));
    };

    const renderGranulesQuantity = (persons: number, hours: number, spoonsPerPersonPerHour: number, unit: string) => {

        const calculatedQuantity = persons * hours * spoonsPerPersonPerHour;

        return (
            <div>
                Granules Quantity: {calculatedQuantity} {unit}
            </div>
        )
    }

    return (
        <Form>
            <FormGroup>
                <Label for="persons">Number of persons:</Label>
                <Input
                    type="number"
                    id="persons"
                    name="persons"
                    value={formValues.persons}
                    onChange={handleInputChange}
                    min={0}
                />
            </FormGroup>

            <FormGroup>
                <Label for="hours">Duration (in hours):</Label>
                <Input
                    type="number"
                    id="hours"
                    name="hours"
                    value={formValues.hours}
                    onChange={handleInputChange}
                    min={0}
                    step="any"
                />
            </FormGroup>
            {
                renderGranulesQuantity(formValues.persons, formValues.hours, granulesConfig.spoonsPerPersonPerHour, granulesConfig.unit)
            }

        </Form>
    );
};

export default GranulesCalculator;
