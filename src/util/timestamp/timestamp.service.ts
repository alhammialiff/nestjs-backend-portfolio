import { Injectable } from '@nestjs/common';

@Injectable()
export class TimestampService {

    getTimestamp(){

        // Returns 22/02/26, 17:48:28
        return new Date().toLocaleString('en-SG', {
            timeZone: 'Asia/Singapore',
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    }

    getNoWhitespaceTimestamp(){
        
        const now = new Date();

        const dd  = String(now.getDate()).padStart(2, '0');
        const mm  = String(now.getMonth() + 1).padStart(2, '0');
        const YY  = String(now.getFullYear());
        const hh  = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss  = String(now.getSeconds()).padStart(2, '0');
        const ms  = String(now.getMilliseconds()).padStart(3, '0');

        return `${dd}-${mm}-${YY}--${hh}-${min}-${ss}-${ms}`;
    }

}
