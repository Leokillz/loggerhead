
/** Message interface

Message = {
	source:String,
	message:String,
	time:Date,
	name:String,
	group:String,
	severity:Number,
	trace:String
}

Option = {
	destination:String,
	notification:[String] | String,
}

*/

function logToConsole(message){
	console.log(`${message.id}: ${message.message} with stack trace ${message.trace} from ${message.source} and severity ${message.severity} in group ${message.group}was recorded at time: ${new Date(message.time)}, `)
	return;
}

function logToRemote(message, address){
	console.log("logging to remote")
	console.log(message);
}

function logToFile(message, fileAddress){
	console.log("logging to file")
	console.log(message);
}

function triggerNotification(message, people){
	console.log("triggering notification")
	console.log(message);
}

function log(message, options){
	if(arguments.length === 0){
		return;
	}
	if(arguments.length == 1){
		if(this.destination){
			switch(this.destination.type){
				case 'file':
					logToFile(message, this.destination.address);
					break;
				case 'remote':
					logToRemote(message, this.destination.address);
					break;
				default:
					logToConsole(message)
			}
			return;
		}
		logToConsole(message);
		return;
	}
	if(options.notification){
		triggerNotification(message, options.notification)
	}
	if(options.destination){
		switch(options.destination.type){
			case 'file':
				logToFile(message, options.destination.address);
				break;
			case 'remote':
				logToRemote(message, options.destination.address);
				break;
			default:
				logToConsole(message)
		}
		return;
	} else {
		switch(this.destination.type){
			case 'file':
				logToFile(message, this.destination.address);
				break;
			case 'remote':
				logToRemote(message, this.destination.address);
				break;
			default:
				logToConsole(message)
		}
		return;
	}
}

let message = {
	id: (Date.now()).toString(16),
	source:"index.html",
	message:"There was an error",
	time:Date.now(),
	name:"hello",
	group:"general",
	severity:2,
	trace:"what is this?"
}

let options = {
	destination:{type:"file", address:"errors.log"},
}
log()
log(message, options);