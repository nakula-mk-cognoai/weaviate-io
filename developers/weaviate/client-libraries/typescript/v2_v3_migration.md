---
title: v2 to v3 migration guide
sidebar_position: 12
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';


:::note Typescript client version
The current Typescript client version is `v||site.typescript_client_version||`
:::

The `v3` Weaviate typescript client API is very different to the `v2` API. This guide will help you understand the major changes and how to migrate your code at a high level.

## Installation

To go from `v2` to `v3`, you must

1. Install the new client package
    - Depending on your usecase, i.e. web or node, the cleint name changes. 

    For Web, the new Typscript client is usable under the `weavaite-client-web` package. 

    For Node.js, new Typscript client is usable under the `weavaite-client` package. 

    The previous client had a single package for both use cases.

    ```bash
     npm install weavaite-ts-client
    ```

2. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v4.4.1`. Generally, we recommend you use the latest versions of Weaviate and the client.

3. Make sure you have the correct Typescript configuration if you're using Typescript
    - 

<details>
      <summary> tsconfig.json file</summary>

    To properly use the client, add the following to your `tsconfig.json` file:

    ```json
  {
      "compilerOptions": {
        ...
        "target": "esnext",
        "module": "esnext", 
        "moduleResolution": "Node16",
        "include": ["*.ts"], 
        "esModuleInterop": true,
        "lib": [ "es2018" ],
        ...
     }
  }
    ```
</details>

4. Update your version on Node.

    - The minimum version of Node supported by the client is 16. 

3. Make sure a port for gRPC is open to Weaviate.
    - The default port is 50051.

    <details>
      <summary>docker-compose.yml example</summary>

    If you are running Weaviate with Docker, you can map the default port (`50051`) by adding the following to your `docker-compose.yml` file:

    ```yaml
        ports:
        - 8080:8080
        - 50051:50051
    ```

    </details>

## Instantiation

The `v3` client is instantiated through the `WeaviateClient` object, which is the main entry point for all API operations.

You can directly instantiate the client, but in most cases you can use helper functions starting with `connectTo`, such as `connectToLocal`, `connectToWCS`. 

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'some-endpoint.weaviate.network', {
    authCredentials: new weaviate.ApiKey('api-key'),
  } 
)

console.log(client)
```

</TabItem>
<TabItem value="local" label="Local">

```ts
import weaviate, { WeaviateClient } from 'weaviate-client'

const client: WeaviateClient = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  })
 
console.log(client)
```

</TabItem>
</Tabs>

Once it has been instantiated, you will notice that the client API is different from `v2`.

## Major changes

From a user's perspective, major changes with the `v3` client include:
 

### Better Typescript Support

  - generics, functions and methods

The `v3` client introduces an extensive set of helper classes to interact with Weaviate. These classes are used to provide strong typing, and to make the client more user-friendly such as through IDE autocompletion.

Take a look at the examples below.

import QuickStartCode from '!!raw-loader!/_includes/code/graphql.filters.nearText.generic.py';

<Tabs groupId="languages">
<TabItem value="create" label="Create a collection">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateCollectionExample"
    endMarker="# END CreateCollectionExample"
    language="py"
  />

</TabItem>
<TabItem value="query" label="NearText query">

  <FilteredTextBlock
    text={QuickStartCode}
    startMarker="# NearTextExample"
    endMarker="# END NearTextExample"
    language="py"
  />

</TabItem>
</Tabs>

In both of these examples, you can see how the helper classes and methods abstract away the need for manual JSONs or strings.

### Interaction with collections

Interacting with the `client` object for CRUD and search operations have been replaced with the use of collection objects.

This conveniently removes the need to specify the collection for each operation, and reduces potential for errors.

import ManageDataCode from '!!raw-loader!/_includes/code/howto/manage-data.read.py';
import ManageDataCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.read-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={ManageDataCode}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={ManageDataCodeV3}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>
</Tabs>

Note here that the collection object can be re-used throughout the codebase.

### Collection creation from JSON

You can still create a collection from a JSON definition. This may be a useful way to migrate your existing data, for example. You could [fetch an existing definition](../../manage-data/collections.mdx#read-a-single-collection-definition) and then use it to create a new collection.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START CreateCollectionFromJSON"
  endMarker="# END CreateCollectionFromJSON"
  language="py"
/>

### Removal of builder patterns

The builder patterns for constructing queries as been removed, as they could be confusing and potentially lead to invalid queries.

In `v4`, queries are constructed using specific methods and its parameters.

import SearchSimilarityCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SearchSimilarityCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={SearchSimilarityCode}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={SearchSimilarityCodeV3}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>
</Tabs>

This makes it easier to understand and use. Additionally, some parameters typed (e.g. `MetadataQuery`) which makes it easier to use and reduces errors.

### Seperate packages for Web and Node platforms

  - talk a bit more about this and package specifics 
  - Introduction of gRPC?

### Improved Functionality

(with examples)

#### InsertMany
#### Migration?
#### Client.close()
#### Filters
#### Named vectors? 
#### cleaner return object 
#### Error handling 


## How to migrate your code

The migration will likely involve significant changes to your codebase. Review the [Typescript client library documentation](./index.mdx) to get started, including instantiation details and various submodules.

Then, take a look at the how-to guides for [Managing data](../../manage-data/index.md) and [Queries](../../search/index.md).

In particular, check out the pages for:

- [Client instantiation](./index.md#instantiate-a-client),
- [Manage collections](../../manage-data/collections.mdx),
- [Batch import](../../manage-data/import.mdx)
- [Cross-reference](../../manage-data/cross-references.mdx)
- [Basic search](../../search/basics.md)
- [Similarity search](../../search/similarity.md)
- [Filters](../../search/filters.md)

## Can we help?

If you have any questions, please don't hesitate to reach out to us on the [Weaviate Community Forum](https://forum.weaviate.io/c/support/6).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />