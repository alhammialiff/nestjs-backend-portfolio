import { Injectable } from '@nestjs/common';

@Injectable()
export class TimestampService {

    getTimestamp(){
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

}
