function wrapAction(creator) {
  return async arg => onAction(creator(arg));
}

export function initialize() {
  onStart();
}
