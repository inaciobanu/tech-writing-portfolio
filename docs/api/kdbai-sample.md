---
id: kdbai-sample
title: "Sample: KDB.AI Vector Search API"
sidebar_label: "KDB.AI Vector Search (Sample)"
---

:::info Portfolio sample
This is a **portfolio writing sample** demonstrating documentation style for a vector database API. It is written in the style of real-time database and AI tooling documentation — the category I work in daily at KX.
:::

# KDB.AI Vector Search API

KDB.AI is a real-time vector database built on kdb+, designed for AI and machine learning workloads requiring low-latency similarity search over high-dimensional data.

This reference documents the Vector Search endpoints — used to insert, index, and query vector embeddings in KDB.AI tables.

---

## Concepts

### Embeddings and Vector Search

A **vector embedding** is a numerical representation of data — text, images, audio, or time-series — produced by a machine learning model. Similar items produce embeddings that are geometrically close in high-dimensional space.

**Vector search** (also called similarity search or approximate nearest neighbour search) retrieves the embeddings closest to a query vector. This powers use cases including:

- Semantic search over documents
- Recommendation engines
- Anomaly detection in time-series data
- Retrieval-augmented generation (RAG) for LLMs

### Indexes

KDB.AI supports two index types:

| Index | Algorithm | Best for |
|---|---|---|
| `flat` | Exact brute-force search | Small datasets; highest accuracy |
| `ivf` | Inverted file index | Large datasets; faster search with minor accuracy trade-off |
| `hnsw` | Hierarchical Navigable Small World | Very large datasets; fast, high-recall approximate search |

---

## Authentication

All requests require a bearer token:

```bash
Authorization: Bearer <your-api-token>
```

Tokens are generated in the KDB.AI Cloud console under **Settings → API Tokens**.

---

## Endpoints

### Insert Vectors

```
POST /v1/tables/{table}/insert
```

Inserts one or more vector embeddings into a KDB.AI table.

**Path parameters:**

| Parameter | Type | Description |
|---|---|---|
| `table` | string | Name of the target table |

**Request body:**

```json
{
  "rows": [
    {
      "id": "doc_001",
      "embedding": [0.12, 0.87, 0.34, 0.56],
      "metadata": {
        "source": "earnings_report_q1.pdf",
        "timestamp": "2026-03-18T09:00:00Z"
      }
    }
  ]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | ✅ | Unique identifier for this vector |
| `embedding` | float[] | ✅ | The vector values — must match table dimension |
| `metadata` | object | | Arbitrary key-value pairs for filtering |

**Example:**

```bash
curl -X POST https://api.kdbai.cloud/v1/tables/earnings_docs/insert \
  -H "Authorization: Bearer eyJhbG..." \
  -H "Content-Type: application/json" \
  -d '{
    "rows": [{
      "id": "doc_001",
      "embedding": [0.12, 0.87, 0.34, 0.56],
      "metadata": { "source": "earnings_report_q1.pdf" }
    }]
  }'
```

---

### Query (Similarity Search)

```
POST /v1/tables/{table}/query
```

Returns the `n` vectors most similar to the query vector, ranked by distance.

**Request body:**

```json
{
  "vector": [0.11, 0.85, 0.36, 0.58],
  "n": 5,
  "filter": {
    "source": "earnings_report_q1.pdf"
  },
  "index": "hnsw"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `vector` | float[] | ✅ | Query embedding — same dimension as table |
| `n` | integer | ✅ | Number of nearest neighbours to return |
| `filter` | object | | Metadata filter to narrow the search space |
| `index` | string | | Index to use: `flat`, `ivf`, or `hnsw` (default: table's index) |

**Response:**

```json
{
  "results": [
    {
      "id": "doc_001",
      "score": 0.982,
      "metadata": { "source": "earnings_report_q1.pdf" }
    },
    {
      "id": "doc_047",
      "score": 0.941,
      "metadata": { "source": "earnings_report_q2.pdf" }
    }
  ],
  "latency_ms": 4
}
```

| Field | Description |
|---|---|
| `id` | The vector's identifier |
| `score` | Cosine similarity score (0–1, higher = more similar) |
| `metadata` | Metadata fields stored with this vector |
| `latency_ms` | Query execution time in milliseconds |

---

### Delete Vectors

```
DELETE /v1/tables/{table}/vectors
```

Deletes vectors by ID.

```json
{
  "ids": ["doc_001", "doc_047"]
}
```

---

## PyKX Integration

KDB.AI is natively accessible via **PyKX**, KX's Python interface to kdb+. This allows Python-native workflows without leaving your data science environment:

```python
import kdbai_client as kdbai

# Connect to your KDB.AI instance
session = kdbai.Session(api_key="your-api-key", endpoint="https://api.kdbai.cloud")

# Get a table handle
table = session.table("earnings_docs")

# Insert embeddings
table.insert([
    {"id": "doc_001", "embedding": [0.12, 0.87, 0.34, 0.56],
     "metadata": {"source": "earnings_report_q1.pdf"}}
])

# Run a similarity query
results = table.search(
    vectors=[[0.11, 0.85, 0.36, 0.58]],
    n=5
)
print(results)
```

---

## Error Codes

| Code | Meaning |
|---|---|
| `400 Bad Request` | Malformed request body or mismatched vector dimension |
| `401 Unauthorized` | Invalid or missing API token |
| `404 Not Found` | Table does not exist |
| `409 Conflict` | Vector ID already exists in the table |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | KDB.AI server error — contact support |

---

## Further Reading

- [KDB.AI Documentation](https://code.kx.com/kdbai/)
- [PyKX Documentation](https://code.kx.com/pykx/)
- [KX Developer Hub](https://code.kx.com/)
