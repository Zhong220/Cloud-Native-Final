#!/bin/bash

# Insert data into Redis
redis-cli -h redis -p 6379 <<EOF
RPUSH room:a "{\"sender\":\"system\",\"message\":\"Room a created.\",\"timestamp\":\"2024-12-10T16:14:31.872Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"af\",\"timestamp\":\"2024-12-10T16:14:33.866Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"af\",\"timestamp\":\"2024-12-10T16:14:34.352Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"a\",\"timestamp\":\"2024-12-10T16:14:34.677Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"fa\",\"timestamp\":\"2024-12-10T16:14:34.909Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"f\",\"timestamp\":\"2024-12-10T16:14:35.099Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"asfd\",\"timestamp\":\"2024-12-10T16:14:35.308Z\"}"
RPUSH room:a "{\"sender\":\"neo\",\"message\":\"sadf\",\"timestamp\":\"2024-12-10T16:14:35.513Z\"}"
EOF

echo "Data has been inserted into Redis."
