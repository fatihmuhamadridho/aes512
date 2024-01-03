export function parseJSONRecursively(obj: any, seenObjects = new Set()) {
  if (seenObjects.has(obj)) {
    return;
  }

  seenObjects.add(obj);

  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      try {
        obj[key] = JSON.parse(obj[key]);
      } catch (e) {
        // Do nothing if it's not valid JSON
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      parseJSONRecursively(obj[key], seenObjects);
    }
  }
}
