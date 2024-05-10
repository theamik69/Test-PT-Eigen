import { Test, TestingModule } from '@nestjs/testing';
import { ReturningController } from './returning.controller';

describe('ReturningController', () => {
  let controller: ReturningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturningController],
    }).compile();

    controller = module.get<ReturningController>(ReturningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
