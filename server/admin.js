const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "blue-ocean-b857a",
    private_key_id: "7b4603a7b52169e28ca086725a3e981bdd15bee4",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSBY649PQGPa8e\nyVKlyuyyJDu2e+khy1Hi9P+MtxsNwSvpO4Pt5j4KkacNyo4fZda8/fuE797XSXOh\nK95GCLhHQIWvXyuQeCvW5Gv6yrWCSn4SBoURgqwEBdi5azoHFhRw7whRnYU5GjrC\nQYOdiBiWITXZ3UNaNi1hwoWh9CQE4cHrsmRfUmIz7XHqxOwGZCR8rW8/070WpDlV\nrFgSErti27tFzyDqWRoaeTWSt9eEOs0/CNoNjBNZyULLfELKw5UF/OEN/fKcszln\nPx6jX437u7p9WnxzmRG5C2AG0LGnazpsmbqSNBBDBdjkiX7ihWLLHA3OQIPuvudh\n4TZsIw7RAgMBAAECggEAJAExzWI8z1MjXHx4n/+2uEAd5yOLevU2tjcB0hEOHyib\n6rDtmVnVv2Zlog1pWM2UEtqvS3qX4E6wr7Nw5aTdx1fd/r2BMOioqp59D4QvGDbE\n+i3YXtZxErbcVu/dCYVEugn+a51jDY7toRtlWBEIOvBqZlNb+aD1NK8xoxrfTMJ8\nRdzCBp4JhEoKgX7qOwU8raWf39iCoyoLk/HxWZy2nmft5JnJRvW2adfjP6v2nkhN\nuB1BUhYHKPHB8bu2SJhXxFiJnqW3z6sxboG5R/ah9NVoZphmB5kCHapbyCHcnS/z\nKwNPD9uZ/BsZe/puY64o1HbA9EOfdJ7WDZHUkQ3NyQKBgQDLXq/vDI695+a8ZUug\nluknJKuNA3eG3XhF0mg6Vl7HZVRZyLjRvXU6QJXccoHhI0zVuvgsQ7VU1s37Ytix\nZw9X05jk+Xki0ovuJ5WI2Lu/cs29JOOFWgoTfuH4CzW6W+l8sMRRAsLKwh4HJyL1\nXpdVrKuNPKLufiRil/VkZ/7sJQKBgQC3z4m0L8aoVuafyxvg19Uq4DBfOOiQn5Rz\nGt/Y08Yi2WyKI4+M9J6HGlpF7J4iozK8vjrP1+7J3vAs57SrT2aDGNUdDXChKQoe\ngethcD8Re+jcavKaTAnqkH5YJBJXDTTy8J6rOyLjLSm6k9cW20hFjekwPcUpZJ9S\n83oOaHKCPQKBgBDpfOP6PVyZjlyYZ+Og6R6yM/n0EdqLTFcyGizPxe37BTq6MHRw\ntvDzMgM1GovobZlQhRbZQpkdi9+d5rtKAMKi/BH+lQ5KSAy0CgFpVKOlHmreSHVs\neW4JnS0NcZhf0FjoMksyWZSW8/xQSt3w0dD0HQgPxNTkdI4maOfCpjZpAoGAXIVe\nrxANUtbLJ0u5MKfzaK2IK6Ydig6JTpcMbbvLU+dVNwNHUpAe66pcHi5IOu8irtai\nC9SJIZvSEQhgbIp+8yYgv4rwUm6x5UFIFbfGRyqzv58lln0H0MYCkqM1iBPhvxdX\nBqGxoeAtzPh1n8+oxTn1Uo8FGxzHBZ4Aphf065ECgYEAtzz0cWkhB7+lxznMHhJ5\nv+Htbr8pKVv/OdLLMlOXngugAoKIXesALfPambf4/Ot/xO9hKDOVUtRliiWUvzzp\nxCFGu0eKmd02qOPG6IpPEzardjVS/Azmt93UMm978GwBQcRXHorMR6+4Q69dIgeE\nflMOEf0LDmk2gTwPMgJjR3I=\n-----END PRIVATE KEY-----\n".replace(
        /\\n/g,
        "\n"
      ),
    client_email:
      "firebase-adminsdk-u0kdk@blue-ocean-b857a.iam.gserviceaccount.com",
    client_id: "108105269828046290677",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u0kdk%40blue-ocean-b857a.iam.gserviceaccount.com",
  }),
});
module.exports = admin;