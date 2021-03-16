import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CouponsGetDTO } from '../dtos';

@Injectable()
export class PayloadToDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): CouponsGetDTO {
    const { items_ids, amout } = value;
    return new CouponsGetDTO(items_ids, amout);
  }
}
