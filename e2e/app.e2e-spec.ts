import { NgrxPage } from './app.po';

describe('ngrx App', () => {
  let page: NgrxPage;

  beforeEach(() => {
    page = new NgrxPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
