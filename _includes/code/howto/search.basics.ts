import assert from 'assert';

// ===== Instantiation, not shown in snippet
import weaviate, { WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWCS(
  'https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud/',
  {
    authCredentials: new weaviate.ApiKey(
      'xLNI2ItFMTLIcMZBgf60sMhvaIclJ6LtaOSy'
    ),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '', // Replace with your inference API key
    },
  }
);

// ==============================
// ===== BASIC GET EXAMPLES =====
// ==============================

// START-ANY
let result, myCollection;
// END-ANY

// BasicGetJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
});

console.log(JSON.stringify(result, null, 2));

// END BasicGetJS

// Test
let questionKeys = new Set(Object.keys(result.objects[0].properties));
assert.deepEqual(questionKeys, new Set(['question']));
// End test

// // ===================================
// // ===== GET WITH LIMIT EXAMPLES =====
// // ===================================

// GetWithLimitJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
  limit: 1,
})

console.log(JSON.stringify(result, null, 2));
// END GetWithLimitJS

// Test
assert.equal(result.objects.length, 1)
// End test

// ===================================
// ===== GET WITH LIMIT AND OFFSET EXAMPLES =====
// ===================================

// GetWithLimitOffsetJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
  limit: 1,
  offset: 1,
})

console.log(JSON.stringify(result, null, 2));
// END GetWithLimitOffsetJS

// Test
assert.equal(result.objects.length, 1)
// End test

// ===================================
// ===== GET PROPERTIES EXAMPLES =====
// ===================================

// GetPropertiesJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
// highlight-start
  returnProperties: ['question', 'answer', 'points'],
// highlight-end
  limit: 1,
  offset: 1,
})

console.log(JSON.stringify(result, null, 2));
// END GetPropertiesJS

// Test
assert.ok(result.objects[0].properties.hasOwnProperty('points'));
// End test

// ======================================
// ===== GET OBJECT VECTOR EXAMPLES =====
// ======================================

// GetObjectVectorJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  returnProperties: ['question', 'answer', 'points'],
  limit: 1,
  // highlight-start
  includeVector: true
  // highlight-end

})

console.log(JSON.stringify(result, null, 2));
// END GetObjectVectorJS

// Test
assert.ok(Array.isArray(result.objects[0].vectors.default))
assert.ok(typeof(result.objects[0].vectors.default[0]) === 'number')
// End test

// ==================================
// ===== GET OBJECT ID EXAMPLES =====
// ==================================

// GetObjectIdJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  limit: 1,
})

for (let object of result.objects) {
   console.log(JSON.stringify(object.uuid, null, 2));
}
// END GetObjectIdJS

// Test
assert.ok(typeof(result.objects[0].uuid) === 'string');
// End test

// =======================================
// ===== GET WITH CROSS-REF EXAMPLES =====
// =======================================

// GetWithCrossRefsJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  limit: 2,
  // highlight-start
  returnReferences: [{
  linkOn: 'hasCategory',
  returnProperties: ['title'],
}]
// highlight-end
})

console.log(JSON.stringify(result, null, 2));
// END GetWithCrossRefsJS

// Test
assert.ok(result.objects[0].references.hasCategory.objects.length > 0);
// End test

// ===================================
// ===== GET WITH METADATA EXAMPLES =====
// ===================================

// GetWithMetadataJS
myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.fetchObjects({
  limit: 2,
  returnMetadata: ['creationTime']
})

for (let object of result.objects) {
  console.log(JSON.stringify(object.properties, null, 2));
  console.log(JSON.stringify(object.metadata?.creationTime, null, 2));
}
// END GetWithMetadataJS

// Test
assert.ok(typeof(result.objects[0].metadata.creationTime) === 'object')
// End test

// =========================
// ===== MULTI-TENANCY =====
// =========================

// <!-- NEEDS TESTS -->

// MultiTenancy
myCollection = client.collections.get('WineReviewMT');
const collectionTenantA = myCollection.withTenant('tenantA');

result = await collectionTenantA.query.fetchObjects({
  limit: 1,
  returnProperties: ['review_body','title']
})

console.log(JSON.stringify(result.objects[0].properties, null, 2));
// END MultiTenancy

// Test results
assert.equal(result.objects.length, 1)
// End test
