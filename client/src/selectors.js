export function toBuy(list=[]) {
  return list.filter(({bought, deleted}) =>
    bought === null && deleted === null
  );
}

export function bought(list=[]) {
  return list.filter(({bought}) => bought !== null);
}

export function deleted(list=[]) {
  return list.filter(({deleted}) => deleted !== null);
}
