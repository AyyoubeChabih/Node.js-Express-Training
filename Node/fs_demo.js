const fs = require('fs');
const path = require('path');

// Note: it is necessary to comment some code to run the file

// Create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if (err) throw err;
    console.log('Folder Created');
});

// Create and write to file
fs.writeFile(
    path.join(__dirname, '/test', 'hello.txt'),
    'Hello World!',
    err => {
        if (err) throw err;
        console.log('File written to...');

        // File append
        fs.appendFile(
            path.join(__dirname, '/test', 'hello.txt'),
            ' I Love Node.js',
            err => {
                if (err) throw err;
                console.log('File written to...');
            }
        );
    }
);

// Read file
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Rename file
fs.rename(
    path.join(__dirname, '/test', 'hello.txt'),
    path.join(__dirname, '/test', 'helloworld.txt'),
    err => {
        if (err) throw err;
        console.log('File renamed...');
    }
);

// delete a folder
// NOTE : it is necessary to create a folder named "myFolderToDelete".
// NOTE : myFolderToDelete must be an empty folder.
fs.rmdir(path.join(__dirname, '/myFolderToDelete'), err => {
    if (err) throw err;
    console.log('Folder deleted ...');
});

// Read the contents of a folder
// NOTE: the first argument can be whatever route, it doesn't have to be the actual dirname.
fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    console.log(files);
});

// Copy a file
fs.copyFile('source.txt', 'destination.txt', err => {
    if (err) throw err;
    console.log('File copied...');
});
