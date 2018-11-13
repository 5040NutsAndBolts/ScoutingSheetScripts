// Used for data persistance so that data dosent need to be recompiled every time
var properties = PropertiesService.getScriptProperties();

function Team (_number, _name) {
  this.number  = _number;
  this.name    = _name;
  this.properties = PropertiesService.getScriptProperties();
  
  this.matches = 0;
  this.autoScores    = [];
  this.teleopScores  = [];
  this.endgameScores = [];
  
  this.averageAuto    = 0;
  this.averageTeleop  = 0;
  this.averageEndgame = 0;
  
  this.toString = function () {
    this.averageScores();
    return "Team: " + this.number + " " + this.name + " | Auto: " + this.averageAuto + " Teleop: " + this.averageTeleop;
  }
  
  this.addAutoScore = function (score) {
    var m = this.autoScores.push(score);
    if (m == this.matches) {
      return true;
    } else {
      return false;
    }
  }
  
  this.addTeleopScore = function (score) {
    var m = this.teleopScores.push(score);
    if (m == this.matches) {
      return true;
    } else {
      return false;
    }
  }  
  
  this.addEndgameScore = function (score) {
    var m = this.endgameScores.push(score);
    if (m == this.matches) {
      return true;
    } else {
      return false;
    }
  }
  
  this.averageScores = function () {
    this.averageAuto    = this.autoScores.reduce(   function(a, b) {return a + b;}, 0) / this.matches;
    properties.setProperty('auto' + this.number, this.averageAuto.toString());
    Utilities.sleep(1000);
    this.averageTeleop  = this.teleopScores.reduce( function(a, b) {return a + b;}, 0) / this.matches;
    properties.setProperty('teleop' + this.number, this.averageTeleop.toString());
    Utilities.sleep(1000);
    this.averageEndgame = this.endgameScores.reduce(function(a, b) {return a + b;}, 0) / this.matches;
    properties.setProperty('endgame' + this.number, this.averageEndgame.toString());
    Utilities.sleep(1000);
  }
  
  this.addMatch = function () {
    this.matches++;
  }
}

