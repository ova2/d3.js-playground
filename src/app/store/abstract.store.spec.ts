import { Store } from './abstract.store';

class TestState {
  public value = 'initial value';
}

class TestStore extends Store<TestState> {
  constructor() {
    super(new TestState());
  }

  public updateState(nextState: TestState): void {
    this.state = nextState;
  }
}

describe('Store', () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore();
  });

  it('should set correct initial state', () => {
    expect(store.state.value).toEqual('initial value');
  });

  it('should correctly update the state when calling state setter', () => {
    const newState = new TestState();
    newState.value = 'updated value';
    store.updateState(newState);
    expect(store.state).toEqual(newState);
  });

  it('should push updated state to subscribers', done => {
    const newState = new TestState();
    newState.value = 'updated value';
    store.updateState(newState);
    store.select(state => state).subscribe(state => {
      expect(state).toEqual(newState);
      done();
    });
  });

  it('should push updated state slice to subscribers', done => {
    const newState = new TestState();
    newState.value = 'updated value';
    store.updateState(newState);
    store.select(state => state.value).subscribe(value => {
      expect(value).toEqual('updated value');
      done();
    });
  });
});
