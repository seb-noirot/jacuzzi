export interface MeasurementData {
    pH: number;
    alkalinity: number;
}

export interface ProductData {
    persons: number;
    hours: number;
}

export interface TargetRanges {
    pH: Range;
    alkalinity: Range;
}

export interface ProductRatio {
    pH: Ratio ;
    alkalinity: Ratio;
}

export interface Ratio {
    value: number;
    unit: string;
}

export interface Range {
    min: number;
    max: number;
    minAcceptable: number;
    maxAcceptable: number;
}



export interface TargetRangeData {
    pH: {
        min: number;
        max: number;
        minAcceptable: number;
        maxAcceptable: number;
    };
    alkalinity: {
        min: number;
        max: number;
        minAcceptable: number;
        maxAcceptable: number;
    };
}
