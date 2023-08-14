import { ArgumentMetadata,PipeTransform,BadRequestException } from '@nestjs/common'
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    private isStatus(status : any){
        const index = this.StatusOptions.indexOf(status);
        return index;
    }

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value',value);
        console.log('metadata', metadata);

        if(this.isStatus(value) === -1){
            throw new BadRequestException(`${value} is not a Status Valuse`);
        }

        return value;
    }
}