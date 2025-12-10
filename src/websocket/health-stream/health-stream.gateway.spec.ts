import { Test, TestingModule } from '@nestjs/testing';
import { HealthStreamGateway } from './health-stream.gateway';

describe('HealthStreamGateway', () => {
  let gateway: HealthStreamGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthStreamGateway],
    }).compile();

    gateway = module.get<HealthStreamGateway>(HealthStreamGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
