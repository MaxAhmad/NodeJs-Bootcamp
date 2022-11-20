/**
 * NPM**
 * Node package manager is a command line interface app that automatically comes with node.js 
 * and which is used to manage and install open source packages. these packages come from the package repository that also NPM.
 */

/**
 * Types of packages and Instals
 * The two types of packages we can install are simple dependencies and DEVELOPMENT dependencies
 * SIMPLE or REGULAR dependencies are packages that contains code that we will include in our code to use to build our application. 
 * Our project depends on them to work correctly eg; express
 * DEVELOPMENT dependencies are usually tools for development, for example like a code bundler like webpack. 
 * Our code does not rely on the development denpendencies. it is simply just use to develop out project
 */


/**
 * PACKAGE VERSIONING & UPDATING
 * Take a look at this package version;
 * "nodemon": "^2.0.19"
 * most packages on NPM follows the semantic version notification
 * the first version number in this case '2' is called the major version; this version includes major breaking changes that we will need to upgrade to access the module
 * the second version number '0' is called the minor version; this version introduces new features that does not include breaking changes
 * while the last or third number '19' is called the patch number; this version is intended to fix bugs
 * 
 * To check packages that needs upgrading or check for versions that are outdated;
 * we will need to run npm outdated in our terminal
 * To get back our mudules after we lost it
 * You should run npm install; it will install all the packages and modules as well as dependencies you are using 
 */

/**
 * CLIET SERVER ARCHITECTURE
 * This is the communication that goes on between the browser and server
 * the browser sends a requests nd the server sends back a response
 * Let say we want to access a website like; https//www.google.com/maps
 * the http/https is known as the protocol
 * www.google.com is know as the domain name which is a special address in the web
 * maps is know as the resource
 * The fisrt thing that happens when we access a website is that the browser sends a request to the DNS; 
 * Domain name server which are special servers know as the phone or address books of the web, the DNS is a special character encoded for the web to understand
 * The TCP/IP: transmission control protocol opens up a communication portal between the browser and the server this is the channel used to send and recieve data
 * The request made is called HTTP REQUEST; this a protocal the allows the client and the server to commuincate
 * the request message contains the start line which contains the http that is used for the request
 * * the next part of the request is the request headers which contains the information about the request like what browsers is used, what time etc
 * the request body is the last part which contains what the request is sending with methodss like GET, POST etc
 * The third layer of communication is the HTTP RESPONSE
 * this what the server is sending back as the response to the request the client made
 * the response start line has contains http method or status code such as 200 for successful, 404 for error 
 * the http response headers contains information like date etc about the response; these response headers is what is set by the backend developer
 * the last part of commuincation response is the body which is specify by the developer such as doing "res.end"
 * 
 * 
 */


/**
 * NODE PROCESS AND THREADS
 * A process is a program in execution
 * NOde.JS runs in a single thread which makes it easy to block application
 * it is a unique application of Node.js, but we have to be careful to not block the application
 * when a process is initialized; all the top level code are executed i.e all the codes that are not inside a callback function are executed,
 * all the modules required for the application are required and then the event callbacks are registered
 * and finally the even loop starts to run; the event lopp is where most of the work is done in your app
 * it is the heart of the entire node application, but some task are too heavy and extensive to be executed in the event loop; hrnce we use the thread pool
 * The thread pool gives us four additional thread which we can configure to about a 100
 * the thread pool offloads work from the event loop
 * handle heavy and extensive task such as *File system APIs, * cryptography, * Compression, * DNS lookups
 */

/**THE NODE.JS EVENT LOOP 
 * The event loop is where all the application inside the callback functions is executed
 * all codes that are not top level codes are executed
 * the event loop receive events each time an event happens and call the necessary callbacks to execute the codes
 * the event loop extends heavy tasks to the thread pool for execution
 * The event loop is what makes asynchronous task possible
 * it takes care of all incoming events and performs ochestration by offloading heavy task to the thread pool and execute simple task
 *  
*/

