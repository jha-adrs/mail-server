const SMTPServer = require('smtp-server').SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, callback) {
        console.log('Connected', session.id);
        return callback();
    },
    onMailFrom(address, session, callback) {
        console.log('Mail from:', address.address);
        return callback();
    },
    onRcptTo(address, session, callback) {
        console.log('Rcpt to:', address.address);
        return callback();
    },
    onData(stream, session, callback) {
        stream.on('data', (chunk) => {
            console.log('Data chunk:', chunk.toString());
        });
        stream.on('end', callback);
    }
})

server.listen(25, () => console.log('SMTP server started on port 25'));