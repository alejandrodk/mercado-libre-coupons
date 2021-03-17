import { plainToClass } from 'class-transformer';
import { validateSync, IsNotEmpty } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  PORT: string;

  @IsNotEmpty()
  REDIS_HOST: string;
  @IsNotEmpty()
  REDIS_PORT: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
