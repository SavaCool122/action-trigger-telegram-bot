export function createChildLogger(logger, prefix) {
  return logger.child({}, { msgPrefix: `[${prefix}] ` });
}
