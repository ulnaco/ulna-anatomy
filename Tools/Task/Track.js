import btoa from 'base-64'

export function Track(event, properties=false) {
  const request = {
    event: event,
    properties: {
      "token": "49c5f6717d062ca82db0f8d431b13ba5",
    }
  }
  if (properties) {
    request.properties = Object.assign(request.properties, properties);
  }
  console.log('Track', request)
  const requestMash = 'http://api.mixpanel.com/track/?data='+btoa.encode(JSON.stringify(request));
  fetch(requestMash)
}
