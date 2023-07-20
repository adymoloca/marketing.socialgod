export type stateSetterParam<T> = ((prev: T) => T) | T;
export type stateSetter<N> = (newValue: stateSetterParam<N>) => void;
