You'll want to install nodejs (using the mac os x installer from the
website is fine). You'll want to use npm (which is like gem for ruby)
to install express and socket.io.

    npm install express
    npm install socket.io

Express is like Sinatra for Ruby. To get it to serve, for example,
static web pages, you just require it and set some configuration. Make
a file called app.js with contents:


    var express = require('express');

    var app = express.createServer();
    app.use(express.static(__dirname + '/public'));

    app.listen(3000);


All that does is sets up an express server which serves static content
in the public folder.

In the folder with app.js make a folder called public and in that
public folder put hello.html with some content in it.

Now in terminal run: `node app.js`

Now in the browser go to: `http://localhost:3000/hello.html`

OK, hello world complete!

Now we'll get socket working.

Make your app.js look like this now:


    var express = require('express');

    var app = express.createServer();
    app.use(express.static(__dirname + '/public'));

    app.listen(3000);

    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
      console.log("client connected!");
    });


What we've added is that we're now requiring socket.io and attaching
it to our express app. We're also registering a callback for when a
client connects, and when they do we're console.logging that event.

In your hello.html, add this stuff somewhere:


    <script src="/socket.io/socket.io.js"></script>
    <script>
    var socket = io.connect('http://localhost');
    </script>


Note that `/socket.io/socket.io.js` is the code that socket.io wants to
run on the client. This javascript file is automatically served by
socket.io when we attached  it to our app. The code creates a variable
io which has method connect which does that, connects.

If you restart your node app (ctrl-C to stop, then again `node app.js`),
and then you go to `http://localhost:3000/hello.html` and then you look
at your Terminal, you'll see that the client connected.

OK. Now the point of socket.io is to be able to send real time
messages from the clients to the server and for the server to send
real time messages to the clients and everybody respond accordingly.
You'll definitely want to understand how callbacks work, and having a
general idea of how "closures" work will be helpful in that respect.

Now let's send a message from the server to each client when the
client connects. Make app.js look like:


    var express = require('express');

    var app = express.createServer();
    app.use(express.static(__dirname + '/public'));

    app.listen(3000);

    var currentServerSlogan = "Hello World";

    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
      socket.emit("serverSlogan", currentServerSlogan);
    });


And make hello.html have this code somewhere:

    <script src="/socket.io/socket.io.js"></script>
    <script>
    var socket = io.connect('http://localhost');
    socket.on("serverSlogan", function (data) {
      console.log("The current server slogan is: "+data);
    });
    </script>


Now when we reboot app.js and go to the url in a browser, we can open
our javascript console in the browser to see The current server slogan
is Hello World. Now open another tab and go to the url. You'll see
that new tab will get the server slogan too. But the first tab won't
get the server slogan again. This is because the socket variable on
app.js refers to a *particular* client. This is why socket is a
*parameter on the callback* for the connection. So every time the
connection callback is run (i.e. every time a client connects), a new
socket variable is instantiated. This is where being familiar with how
closures work is helpful!

Here's a further example. Make app.js look like this:


    var express = require('express');

    var app = express.createServer();
    app.use(express.static(__dirname + '/public'));

    app.listen(3000);

    var currentServerSlogan = "Hello World";

    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
      socket.emit("serverSlogan", currentServerSlogan);
      socket.broadcast.emit("newClient", socket.id);
    });


And put this code in hello.html:

    <script src="/socket.io/socket.io.js"></script>
    <script>
    var socket = io.connect('http://localhost');
    socket.on("serverSlogan", function (data) {
      console.log("The current server slogan is: "+data);
    });
    socket.on("newClient", function (data) {
      console.log("A new client connected whose id is: "+data);
    });
    </script>


Now when we reboot and visit hello.html in multiple tabs, each client
still receives the server slogan on connection, but now the *first*
client will receive a message about the second client connecting. This
is because socket.broadcast.emit sends its message to *every client
except the one on socket*. Open up more tabs to confirm how this
works.

OK, finally I will show how you can also send messages from the client
to the server. This is a lot simpler because on the client, socket
always refers to the single server. We'll also use broadcast to move
messages around the way you probably will in your application.

Make app.js look like:


    var express = require('express');

    var app = express.createServer();
    app.use(express.static(__dirname + '/public'));

    app.listen(3000);

    var currentServerSlogan = "Hello World";

    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
      socket.emit("serverSlogan", currentServerSlogan);
      socket.broadcast.emit("newClient", socket.id);

      socket.on("setServerSlogan", function (data) {
        currentServerSlogan = data; // set it
        socket.broadcast.emit("serverSlogan", currentServerSlogan); // tell everyone else the new slogan
      });
    });


And make hello.html have:

    <script src="/socket.io/socket.io.js"></script>
    <script>
    var socket = io.connect('http://localhost');
    socket.on("serverSlogan", function (data) {
      console.log("The current server slogan is: "+data);
    });
    socket.on("newClient", function (data) {
      console.log("A new client connected whose id is: "+data);
    });
    function setServerSlogan(newSlogan) {
      socket.emit("setServerSlogan", newSlogan);
    }
    </script>


Ok now reboot and open up two tabs with hello.html. In one of them, in
the js console, type setServerSlogan("goodbye"). This will then tell
that client to send the server the message setServerSlogan with
data="goodbye". The server receives this message and then executes the
socket.on("setServerSlogan"... callback, broadcast emitting the new
slogan to the other client. You will see in the other client that it
receives this message!

Yay! Now you understand socket.io :)