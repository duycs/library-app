import { MembersModule } from './members.module';

describe('BooksModule', () => {
  let membersModule: MembersModule;

  beforeEach(() => {
    membersModule = new MembersModule();
  });

  it('should create an instance', () => {
    expect(membersModule).toBeTruthy();
  });
});
