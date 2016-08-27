# Farewill Mail-server microservice

Registers forwarding addresses and forwards all mail. The receiving addresses can be changed, e.g. if someone passes away their password reset emails an be sent to a nominated person. Uses Mandrill for inbound and outbound sending.

###API endpoints

`/api/mail_map`

#####POST - Creates a new forwarding map

```curl
curl http://localhost:8080/api/mail_map -d "email=some@email.com" -H "Authorization: Bearer TEST_TOKEN"
```
`=> {"inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com"}`

#####GET - Returns all mail maps

`curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_map`
`=> [{"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}]`

`/api/mail_map/:email`

#####GET - Returns map with given forwardingAddress

`curl -i -H "Authorization: Bearer TEST_TOKEN" -X GET http://localhost:8080/api/mail_map/some`

`=> {"_id":"57c1f96277721591077f3f44","updatedAt":"2016-08-27T20:34:42.593Z","createdAt":"2016-08-27T20:34:42.593Z","inboundAddress":"edtxjbvc264cbck2wkyv@farewill-mailserver.com","forwardingAddress":"some@email.com","__v":0}`







#####To create a frowarding map


curl -i -H "Accept: application/json" -H "Authorization: Bearer TEST_TOKEN" -H "Content-Type: application/json" -X GET http://localhost:8080/mail_map/some@email.com


curl -i -H "Accept: application/json" -H "Authorization: Bearer TEST_TOKEN" -H "Content-Type: application/json" -X DELETE http://localhost:8080/mail_map/57c19678dde5ef8df2dde361



#####To update a frowarding map

` curl https://mailserver.farewill.com/create -d "oldEmail=some@email.com&newEmail=new@email.com" -H "Authorization: Bearer TEST_TOKEN" `.

#####To run locally

Get a `settings.json` file with development credentials (see `example-setting.json` for details), then run locally with `meteor --settings settings.json -p 4000`.

#####To run tests

`npm test` with optional `-- -w` flag to 'watch' files for changes.
