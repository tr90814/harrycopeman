# Farewill Mail-server microservice

Registers forwarding addresses and forwards all mail. The receiving addresses can be changed, e.g. if someone passes away their password reset emails an be sent to a nominated person. Uses Mandrill for inbound and outbound sending.

###API endpoints

`/api/mail_map`

#####POST - Creates a new mailMap

```Shell
curl http://localhost:8080/api/mail_map -d "email=some@email.com" -H "Authorization: Bearer TEST_TOKEN"
```
```js
// => {"inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com"}
```

#####GET - Returns all mailMaps

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_map
```
```js
// => [{"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}]
```

`/api/mail_map/:email`

#####GET - Returns maps with the given forwardingAddress

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_map/some@email.com
```
```js
// => [{"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}]
```

#####PUT - changes the forwardingAddress

```Shell
curl -i -d "newEmail=some2@email.com" -H "Authorization: Bearer TEST_TOKEN" -X PUT http://localhost:8080/api/mail_map/some@email.com
```

#####DELETE - removes the mailMap

```Shell
curl -i -H "Authorization: Bearer TEST_TOKEN" -X DELETE http://localhost:8080/api/mail_map/some@email.com
```

`/inbound`

#####Route for Mandril inbound messages.

###To run locally

Get a `settings.json` file with development credentials (see `example-setting.json` for details), then run locally with `npm start`.

###To run tests

`npm test` with optional `-- -w` flag to 'watch' files for changes.
