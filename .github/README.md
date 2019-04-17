# International Child Nutrution Stats

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A project to aid NGOs as they fight child malnutrition internationally

## Table of Contents

- [Background](#background)
- [API](#api)
- [Maintainer](#maintainer)
- [License](#license)


## API

### Authorization

#### `POST /api/auth/login`

Allows a user to login.

Takes an object containing valid `username` and `password` properties, and returns a JSON Web Token to the client. This token must be included in the `authorization` request header to access any other routes.

#### `POST /api/auth/register`

Allows an Admin user to create new users, will return 401 to clients attempting to access the resource with no credentials and 403 to clients attempting to access the resource with insufficient credentials.

Takes an object containing:

1. A unique `username` (**String**)
2. A `password` (**String**)
3. A `role_id` (**Integer**) [Admin=1, User=2]
4. A `country_id` (**Integer**) [Default=Null, Integer corresponds to the specific country a user should have access to]

If a `country_id` is not specified, will default to `null`.

### Countries

#### `GET /api/countries`

Returns a array of objects listing all known countries to an authenticated client.

```json
[
  {
      "Code": "AF",
      "Country": "Afghanistan"
  },
  {
      "Code": "AX",
      "Country": "Åland Islands"
  },
  {
      "Code": "AL",
      "Country": "Albania"
  },
]
```

#### `GET /api/countries/active`

Returns a list of active countries, defined as a country that has at least one community in our database.

If user is not an Admin, it will return only the country specified in the token provided by the client.

```json
[
    {
        "Communities": "5",
        "Country": "United States"
    }
]
```

### Communities

#### `GET /api/communities/:country_id`

Returns a list of communities associated with a particular country based on the `country_id` parameter.

Returns a 404 status and a message if no communities exist for a particular country.

Returns a 200 status and an array of communities if they exist for a particular country

```json
[
  {
    "id": 1,
    "Community": "Albany Park",
    "City": "Chicago",
    "Country": "United States"
  }
]
```

#### `POST /api/communities/:country_id`

Creates a new community associated with a particular country based on the `country_id` parameter.

Takes a JSON object which specifies a unique name and a city as properties:

```json
{
    "name": "Share Naw",
    "city": "Kandahar",
},
```

If the POST succeeds, it will return a 200 status and the new Community object:

```json
{
  "id": 13,
  "Community": "Share Naw",
  "City": "Kandahar",
  "Country": "Afghanistan"
}
```

#### `GET /api/communities/:country_id/:community_id`

Returns a 200 status code and a community object which will also contain an array of associated children.

```json
{
  "id": 6,
  "community": "Share Naw",
  "city": "Kandahar",
  "country": "Afghanistan",
  "children": [{
      "id": 1,
      "name": "Jay Cannariato",
      ...
  }]
}
```

#### `PUT /api/communities/:country_id/:community_id`

Updates a specified community.

Takes a JSON object which contains updates to either the `name` or `city` properties on the specified community:

```json
{
    "name": "NEW NAME",
},
```

If the PUT succeeds, it will return a 200 status and the new Community object:

```json
{
  "id": 13,
  "community": "NEW NAME",
  "city": "Kandahar",
  "country": "Afghanistan"
}
```

#### `DELETE /api/communities/:country_id/:community_id`

Deletes a specified community based on the `:community_id` parameter

Returns the deleted community

```json
{
  "id": 13,
  "community": "NEW NAME",
  "city": "Kandahar",
  "country": "Afghanistan"
}
```

#### `GET /api/communities/:country_id/:community_id/children`

Returns an array of children associated with that particular community.

### Children

#### `POST /api/children/`

Creates a new Child record.

Takes a JSON object with the following properties (required properties are marked with an asterisk):

```json
{
  "name": "String*",
  "dob": "Date (format 'mmddyyyy')*",
  "height": "Integer (inches)",
  "weight": "Integer (pounds)",
  "sex": "String ('M' || 'F' || 'I')*",
  "guardian": "String",
  "contact": "String ('000-000-0000')",
  "country_id": "Integer (ref: > ID of the country the child is in)",
  "community_id": "Integer (ref: > ID of the community the child is in)"
}
```

If the POST succeeds, it will return the newly created child object.

#### `GET /api/children/:id`

Returns a specific child from the database

#### `PUT /api/children/:id`

Takes a JSON object containing any properties that you would like to alter about the child.

Returns the updated child object from the database.

#### `DELETE /api/children/:id`

Deletes a specified child from the database.

Returns the deleted child object.

## Maintainer

[@nickcannariato](https://github.com/nickcannariato)

## License

MIT © 2019 Nick Cannariato
