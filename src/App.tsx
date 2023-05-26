import React from 'react';
import {Card, CardBody, CardTitle, Container, Row, Col} from 'reactstrap';
import MeasurementForm from './MeasurementForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MeasurementData} from './dataInterfaces';
import GranulesCalculator from './GranulesCalculator';

const App: React.FC = () => {

    const localStorageKey = 'measurementData';

    const initialMeasurementData: MeasurementData = {
        pH: 7.6,
        alkalinity: 90,
    };

    const initialProductData = {
        persons: 2,
        hours: 1,
    }
    const granulesConfig = {
        spoonsPerPersonPerHour: 4,
        unit: 'spoon'
    };

    const targetRanges = {
        pH: {
            min: 6.2,
            max: 9.0,
            minAcceptable: 7.2,
            maxAcceptable: 7.8,
        },
        alkalinity: {
            min: 0,
            max: 240,
            minAcceptable: 80,
            maxAcceptable: 120,
        },

    }

    const productRatios = {
        pH: {value: 22, unit: "spoon"},
        alkalinity: {value: 3, unit: "g"},
    }

    return (
        <Container>
            <h1>My Jacuzzi</h1>
            <Row>
                <Col xs={12} md={6}>
                    <MeasurementForm
                        initialValues={initialMeasurementData}
                        targetRanges={targetRanges}
                        productRatios={productRatios}
                        localStorageKey={localStorageKey}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Granules Calculator</CardTitle>
                            <GranulesCalculator granulesConfig={granulesConfig} initialValue={initialProductData}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
