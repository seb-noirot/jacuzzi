import React, {useEffect, useState} from 'react';
import {Alert, Badge, Card, CardBody, CardTitle, Form, FormGroup, Input, Progress} from 'reactstrap';
import {MeasurementData, ProductRatio, Ratio, TargetRanges} from './dataInterfaces';

interface Props {
    initialValues: MeasurementData;
    targetRanges: TargetRanges;
    productRatios: ProductRatio;
    localStorageKey: string;
}

const MeasurementForm: React.FC<Props> = ({
                                              initialValues,
                                              targetRanges,
                                              productRatios,
                                              localStorageKey,
                                          }) => {
    const [formValues, setFormValues] = useState<MeasurementData>(() => {
        const storedValues = localStorage.getItem(localStorageKey);
        return storedValues ? JSON.parse(storedValues) : initialValues;
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(formValues));
    }, [formValues, localStorageKey]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Replace comma with period for consistent decimal format
        const sanitizedValue = value.replace(',', '.');

        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: sanitizedValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const renderProgressBar = (
        value: number,
        min: number,
        max: number,
        minAcceptable: number,
        maxAcceptable: number,
        productRatio: Ratio
    ) => {
        const rangePercentage = ((minAcceptable - min) / (max - min)) * 100;
        const acceptableRangePercentage = ((maxAcceptable - minAcceptable) / (max - min)) * 100;
        const excessRangePercentage = ((max - maxAcceptable) / (max - min)) * 100;

        const valuePercentage = ((value - min) / (max - min)) * 100;

        const getBadgeColor = (value: number) => {
            if (value >= minAcceptable && value <= maxAcceptable) {
                return 'success';
            } else if (value >= (minAcceptable - min) / 2 && value <= maxAcceptable + (max -maxAcceptable) / 2) {
                return 'warning';
            } else {
                return 'danger';
            }
        };

        const isValueInRange = (value: number, min: number, max: number) => {
            return value >= min && value <= max;
        }

        const valueInRange = isValueInRange(value, minAcceptable, maxAcceptable);

        const badgeColor = getBadgeColor(value);

        const calculateProductQuantityToIncreaseValue = (value: number, target: number, ratio: number) => {
            if (value < target) {
                return ((target - value) * ratio).toFixed(0);
            }
            return 0;
        }

        const calculateProductQuantityToDecreaseValue = (value: number, target: number, ratio: number) => {
            return ((target - value) * ratio).toFixed(0);
        }

        let productQuantityMin: string | number = 0;
        let productQuantityMax: string | number = 0;
        if (value < minAcceptable) {
            productQuantityMin = calculateProductQuantityToIncreaseValue(value, minAcceptable, productRatio.value);
            productQuantityMax = calculateProductQuantityToDecreaseValue(value, maxAcceptable, productRatio.value);

        } else if (value > maxAcceptable) {
            productQuantityMin = calculateProductQuantityToIncreaseValue(maxAcceptable, value, productRatio.value);
            productQuantityMax = calculateProductQuantityToDecreaseValue(minAcceptable, value, productRatio.value);
        }

        const showAlert = (quantityMin: any, quantityMax: any, unit: any) => {
                const message = `Add between ${quantityMin} and ${quantityMax} ${unit} of product.`;
                return <Alert color="info" className="mt-3">{message}</Alert>;
        };

        return (
            <div className="mt-5 position-relative">
                <Progress multi>
                    <Progress bar color="danger" value={rangePercentage}>
                        {`${min} - ${minAcceptable}`}
                    </Progress>
                    <Progress bar color="success" value={acceptableRangePercentage}>
                        {`${minAcceptable} - ${maxAcceptable}`}
                    </Progress>
                    <Progress bar color="danger" value={excessRangePercentage}>
                        {`${maxAcceptable} - ${max}`}
                    </Progress>
                </Progress>
                <div className="position-absolute top-0 start-0 w-100">
                    <Badge
                        color={badgeColor}
                        pill
                        style={{ position: 'absolute', left: `${valuePercentage}%`, top: '-30px' }}
                    >
                        {value}
                    </Badge>
                </div>
                {!valueInRange && showAlert(productQuantityMin, productQuantityMax, productRatio.unit)}
            </div>
        );
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">pH</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                type="number"
                                name="pH"
                                id="pH"
                                step="any"
                                min={targetRanges.pH.min}
                                max={targetRanges.pH.max}
                                value={formValues.pH}
                                onChange={handleInputChange}
                            />
                            {renderProgressBar(
                                formValues.pH,
                                targetRanges.pH.min,
                                targetRanges.pH.max,
                                targetRanges.pH.minAcceptable,
                                targetRanges.pH.maxAcceptable,
                                productRatios.pH
                            )}
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>

            <Card className="mt-3 mb-3">
                <CardBody>
                    <CardTitle tag="h5">Alkalinity</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                type="number"
                                name="alkalinity"
                                id="alkalinity"
                                min={targetRanges.alkalinity.min}
                                max={targetRanges.alkalinity.max}
                                value={formValues.alkalinity}
                                onChange={handleInputChange}
                            />
                            {renderProgressBar(
                                formValues.alkalinity,
                                targetRanges.alkalinity.min,
                                targetRanges.alkalinity.max,
                                targetRanges.alkalinity.minAcceptable,
                                targetRanges.alkalinity.maxAcceptable,
                                productRatios.alkalinity
                            )}
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default MeasurementForm;
