// Validate if request body has the correct json format
// https://docs.nestjs.com/pipes
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class PayloadValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error || !Object.keys(value).length) throw new BadRequestException('Validation failed');
    return value;
  }
}
