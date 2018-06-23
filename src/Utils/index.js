export const CamelCaseSeparator = (string) => string.replace(/([a-z](?=[A-Z]))/g, '$1 ')

export const LIMIT = 10

export const OFFSET = 0

export const MillisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes  }:${  seconds < 10 ? '0' : ''  }${seconds}`;
}