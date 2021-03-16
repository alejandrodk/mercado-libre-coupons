import { Injectable } from '@nestjs/common';

@Injectable()
export class CouponsService {
  //List<String> calculate(Map<String, Float> items, Float amount)
  calculate(items: Record<string, number>, amount: number): string[] {
    return [];
  }
}
