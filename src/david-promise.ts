/**
 * Something that can be null.
 */
export type Maybe<T> = T | null;

/**
 * My implementation of a promise.
 * @template T The response type.
 */
export class DavidPromise<T> {
  // has the promise been resolved or rejected yet?
  private _isPending: boolean;

  // the resolved value
  private _value: T | undefined;

  // the callback for when the promise resolves
  private _onResolve: Maybe<(value: T) => void>;

  // the callback for when the promise rejects
  private _onReject: Maybe<(error: Error) => void>;

  /**
   * Constructs a promise instance.
   * @param fn  The promised function.
   */
  constructor(
    fn: (
      resolve: (value: T) => void,
      reject: (error: Error) => void
    ) => void
  ) {
    this._isPending = true;
    this._value = undefined;
    this._onReject = null;
    this._onReject = null;

    try {
      fn(this.resolve, this.reject);
    }
    catch (err) {
      this.reject(err);
    }
  }

  /**
   * Creates a promise that resolves.
   * @param value The value to resolve.
   * @template T  The resolve type.
   */
  static resolve<T>(value: T): DavidPromise<T> {
    return new DavidPromise((resolve) => {
      resolve(value);
    });
  }

  /**
   * Creates a promise that rejects.
   * @param error The rejection error.
   * @template T  The resolve type.
   */
  static reject<T>(error: Error): DavidPromise<T> {
    return new DavidPromise((resolve, reject) => {
      reject(error);
    });
  }

  /**
   * Resolves the promise with a value.
   * @param value The resolved value.
   * (Note the = () => syntax - that preserves 'this' when passing functions)
   */
  private resolve = (value: T): void => {
    // no longer pending
    this._isPending = false;

    // store resolved value
    this._value = value;

    // trigger resolve listener (set by .then())
    if (this._onResolve) {
      this._onResolve(value);
    }
  }

  /**
   * Rejects the promise with an error.
   * @param error The rejection error.
   * (Note the = () => syntax - that preserves 'this' when passing functions)
   */
  private reject = (error: Error): void => {
    // no longer pending
    this._isPending = false;
    
    // trigger rejection listener (set by .catch())
    if (this._onReject) {
      this._onReject(error);
    }
  }

  /**
   * Subscribe listener for promise resolving.
   * @param cb  The callback function.
   */
  then(cb: (value: T) => void): DavidPromise<T> {
    // set callback
    this._onResolve = cb;

    // return this for chaining
    return this;
  }

  /**
   * Subscribe listener for promise rejecting.
   * @param cb  The callback function.
   */
  catch(cb: (error: Error) => void): DavidPromise<T>  {
    // set callback
    this._onReject = cb;

    // return this for chaining
    return this;
  }

  /**
   * Getter for the pending state.
   */
  get isPending(): boolean {
    return this._isPending;
  }

  /**
   * Getter for the resolved value.
   */
  get value(): T | undefined {
    return this._value;
  }
}

export default DavidPromise;