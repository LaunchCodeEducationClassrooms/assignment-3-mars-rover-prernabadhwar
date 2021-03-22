class Rover {
  constructor(position, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = generatorWatts; 
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: []
    };
    response["message"] = message.name;

    for(let i=0; i < message.commands.length; i++) {

      if(message.commands[i].commandType === "STATUS_CHECK"){
        let objResponse = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        }
        response.results.push(objResponse);

      }

      if(message.commands[i].commandType === "MODE_CHANGE"){
        let objResponse = {
          completed: true
        }
        response.results.push(objResponse);
        this.mode = message.commands[i].value;

      }

      if(message.commands[i].commandType === "MOVE"){
        let objResponse = {
          completed: true
        }

        if(this.mode === 'LOW_POWER'){

          objResponse.completed = false;

        } else {

          this.position = message.commands[i].value;
          
        }
        response.results.push(objResponse);
        

      }


    }
    //response["results"] = message.commands;

    return response;
  }
  
}

module.exports = Rover;