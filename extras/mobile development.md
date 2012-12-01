# Mobile Development

## Turn your development folder into a web host

For rapid prototyping, it's worth it to set up a good development environment.

In Terminal, in your development folder, do

    python -m SimpleHTTPServer

You can now access that folder at

    http://localhost:8000/

You can also access the folder over the network. Specifically, if you have a mobile device on the same wifi network, you can access it at

    http://LOCALIPADDRESS:8000/

You can find your local IP address (the one starting with 192) with this terminal command (via [StackOverflow](http://stackoverflow.com/questions/8529181/terminal-command-to-get-just-ip-address-and-nothing-else))

    ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2

Now you can just refresh on your device and develop rapidly!

Note: this can also be useful to get around cross origin restrictions.

## Access the Inspector and JS Console on your mobile device ("Remote Debugging")

* [Instructions for iOS](http://developer.apple.com/library/ios/#documentation/AppleApplications/Reference/SafariWebContent/DebuggingSafarioniPhoneContent/DebuggingSafarioniPhoneContent.html)
* [Instructions for Chrome on Android](https://developers.google.com/chrome/mobile/docs/debugging)

## Useful libraries

* [iScroll](http://cubiq.org/iscroll-4) - iOS doesn't support scrollable `div`s (e.g. using `overflow: scroll` CSS). This library emulates the scrolling gesture. It also supports extras like snapping (i.e. swipe gesture) and pinch to zoom. See also [2-way-iScroll](https://github.com/cubiq/2-way-iScroll), a fork that lets you swipe left/right and scroll up/down.
* [Ratchet](http://maker.github.com/ratchet/) - mobile front-end framework. Useful UI components. The [bootstrap](http://twitter.github.com/bootstrap/) of mobile apps.