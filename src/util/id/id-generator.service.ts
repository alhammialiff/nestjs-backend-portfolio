import { TimestampService } from 'src/util/timestamp/timestamp.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class IdGeneratorService {

    constructor(
        private readonly timestampService: TimestampService
    ){}


    generateTimestampWithBase36SuffixId(){
        
        const timestamp = this.timestampService.getNoWhitespaceTimestamp();

        const suffix = Math
            .random() // Decimal - "0.7394857261..."
            .toString(36) // Base 36 - (a-z, 0-9) "0.ql4k9f2..."
            .slice(2, 6) // Skip "0." and take from pos 2-5 "ql4k" 
            .toUpperCase(); // Uppercase "QL4K" 

        return `${timestamp}-${suffix}`;

    }

}
