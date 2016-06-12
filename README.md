# Farewill Mail-server microservice

Registers forwarding addresses and forwards all mail. The receiving addresses can be changed, e.g. if someone passes away their password reset emails an be sent to a nominated person. Uses Mandrill or inbound and outbound sending.

#####To create a frowarding map

` curl https://mailserver.farewill.com/create -d "email=some@email.com" -H "Authorization: Bearer TEST_TOKEN" `.

#####To update a frowarding map

` curl https://mailserver.farewill.com/create -d "oldEmail=some@email.com&newEmail=new@email.com" -H "Authorization: Bearer TEST_TOKEN" `.

#####To run locally

Get a `settings.json` file with development credentials (see `example-setting.json` for details), then run locally with `meteor --settings settings.json -p 4000`.

#####To run tests

`npm test` with optional `-- -w` flag to 'watch' files for changes.
