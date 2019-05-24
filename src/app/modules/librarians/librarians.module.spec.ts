import { LibrariansModule } from './librarians.module';

describe('LibrariansModule', () => {
  let librariansModule: LibrariansModule;

  beforeEach(() => {
    librariansModule = new LibrariansModule();
  });

  it('should create an instance', () => {
    expect(librariansModule).toBeTruthy();
  });
});
