# containership.analytics

##About

###Description
Analytics package for ContainerShip

###Author
ContainerShip Developers - developers@containership.io

###Installation
`npm install containership.analytics -g`

###Available Backends
* Segment

###Usage
`./application.js segment`

### What does it do?
Sends analytics regarding package installs (`Package Install` event) as well as package updates (`Package Update` event) to specified backend.

### What if I don't want to share my analytics?
That's fine too! Simply export `CS_NO_ANALYTICS=true` and we won't ship any `Package Install` or `Package Update` events.

##Contributing
Pull requests and issues are encouraged!
