export function normalizeUrl(url: string): string {
  if (!url) return url;

  const hostname = window.location.hostname;
  const currentPort = window.location.port;

  // Port only with optional path/query/hash: 8088/api or :8088/api?key=1
  const portPathMatch = url.match(/^(\d+|:\d+)(\/.*)$/);
  if (portPathMatch) {
    const portPart = portPathMatch[1].startsWith(':') ? portPathMatch[1] : ':' + portPathMatch[1];
    return window.location.protocol + '//' + hostname + portPart + portPathMatch[2];
  }

  // Port only: 8088 or :8088
  if (/^\d+$/.test(url) || /^:\d+$/.test(url)) {
    return window.location.protocol + '//' + hostname + (url.startsWith(':') ? url : ':' + url);
  }

  // Protocol + port with optional path/query/hash: http://:8088 or http://:8088/api?key=1
  const portMatch = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/:(\d+)(.*)$/);
  if (portMatch) {
    return portMatch[1] + '://' + hostname + ':' + portMatch[2] + portMatch[3];
  }

  // Protocol only: http:// or https://
  const protoMatch = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\/$/);
  if (protoMatch) {
    return protoMatch[1] + '://' + hostname + (currentPort ? ':' + currentPort : '');
  }

  return url;
}
