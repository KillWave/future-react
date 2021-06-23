export default function pluck(...args: string[]) {
  return async (value: unknown) => {
    let key: string;
    const keys = [].concat(args);
    while ((key = keys.shift())) {
      value = await value[key];
    }
    return value;
  };
}
