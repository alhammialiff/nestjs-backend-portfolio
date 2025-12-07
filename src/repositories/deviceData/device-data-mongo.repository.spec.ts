import { Test, TestingModule } from '@nestjs/testing';
import { DeviceDataMongoRepository } from './device-data-mongo.repository';

describe('DeviceDataMongoRepository', () => {
  let provider: DeviceDataMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceDataMongoRepository],
    }).compile();

    provider = module.get<DeviceDataMongoRepository>(DeviceDataMongoRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
