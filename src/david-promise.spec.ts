import 'jest';
import DavidPromise from './david-promise';

describe('DavidPromise', () => {
  it('Creates a rejected promise.', () => {
    const p = DavidPromise.reject(new Error('error'));

    expect(p.isPending).toBeFalsy();
    expect(p.value).toBeUndefined();
  });

  it('Creates a resolved promise.', () => {
    const p = DavidPromise.resolve(5);

    expect(p.isPending).toBeFalsy();
    expect(p.value).toBe(5);
  });

  it('Rejects correctly.', (done) => {
    const p = new DavidPromise((resolve, reject) => {
      setTimeout(() => reject(new Error('problem')));
    }).catch(error => {
      expect(error).toBeInstanceOf(Error);
      expect(p.isPending).toBeFalsy();
      done();
    });
  });

  it('Resolves correctly.', (done) => {
    const p = new DavidPromise(resolve => {
      setTimeout(() => resolve(1));
    }).then((value) => {
      expect(p.isPending).toBeFalsy();
      expect(p.value).toBe(1);
      expect(value).toBe(1);
      done();
    });
  });
});