import { OpenModule } from './open.module';

describe('OpenModule', () => {
  let openModule: OpenModule;

  beforeEach(() => {
    openModule = new OpenModule();
  });

  it('should create an instance', () => {
    expect(openModule).toBeTruthy();
  });
});
