# Farewill Mail-server microservice

Registers forwarding addresses and forwards all mail. The receiving addresses can be changed, e.g. if someone passes away their password reset emails an be sent to a nominated person. Uses Mandrill for inbound and outbound sending.

###API endpoints

`/api/mail_maps`

#####POST - Creates a new mailMap

```Shell
curl http://localhost:8080/api/mail_maps -d "email=some@email.com" -H "Authorization: Bearer TEST_TOKEN"
```
```js
// => {"inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com"}
```

#####GET - Returns mailMaps (optional email query)

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_maps
```
```js
// => [{"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}]
```
OR
```Shell
curl -i -d "email:some@email.com" -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_maps
```
```js
// => [{"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}]
```

`/api/mail_maps/:id`

#####GET - Returns map with the given id

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_maps/57c1f96277721591077f3f44
```
```js
// => {"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}
```

#####PUT - changes the forwardingAddress

```Shell
curl -i -d "email=some2@email.com" -H "Authorization: Bearer TEST_TOKEN" -X PUT http://localhost:8080/api/mail_maps/57c1f96277721591077f3f44
```

#####DELETE - removes the mailMap

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X DELETE http://localhost:8080/api/mail_maps/57c1f96277721591077f3f44
```

`/inbound`

#####Route for Mandril inbound messages.

###To run locally

Get a `settings.json` file with development credentials (see `example-setting.json` for details), then run locally with `npm start`.

###To run tests

`npm test` with optional `-- -w` flag to 'watch' files for changes.
