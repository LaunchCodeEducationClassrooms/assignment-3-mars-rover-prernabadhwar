const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts",function() {
    let rover = new Rover(555);
    expect(rover.position).toEqual(555);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message",function() {
    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(555);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);

  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message",function() {
    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(555);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(message.commands.length);

  });

  it("responds correctly to status check command",function() {
    
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with status check command', commands);
    let rover = new Rover(555);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual({mode: rover.mode, generatorWatts: rover.generatorWatts, position: rover.position});

  });

  it("responds correctly to mode change command",function() {
    
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with mode change command', commands);
    let rover = new Rover(555);
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({completed: true});
    expect(rover.mode).toEqual('LOW_POWER');

  });

  it("responds with false completed value when attempting to move in LOW_POWER mode",function() {
    
    let commands = [new Command('MOVE', 1505)];
    let message = new Message('Test message attempting to move in LOW_POWER mode', commands);
    let rover = new Rover(555);
    rover.mode = 'LOW_POWER';
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({completed: false});
    expect(rover.position).toEqual(555);

  });
  
  it("responds with position for move command",function() {
    
    let commands = [new Command('MOVE', 1505)];
    let message = new Message('Test message with move command', commands);
    let rover = new Rover(555);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(1505);

  });

});
