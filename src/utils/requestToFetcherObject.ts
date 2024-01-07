import type { MatchFetcherObjectRequest } from '../durable-object/MatchFetcherObject'


export function getMatchFetcherObject(
    objectNamespace: DurableObjectNamespace,
  ) {
    const objectId = objectNamespace.idFromName('SINGLETON')
    const object = objectNamespace.get(objectId)
    return object
  }
  
  export default function requestToFetcherObject(
    payload: MatchFetcherObjectRequest,
    objectNamespace: DurableObjectNamespace,
  ) {
    const object = getMatchFetcherObject(objectNamespace)
    return object.fetch('https://fetcherobject.com', {
      method: 'post',
      body: JSON.stringify(payload),
    })
  }