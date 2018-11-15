//Step One:
// Google Form to gather data
//Step Two:
// Sheet to compile data
//Step Three:
// Project to Summarize, Analyze, and Present Data

// Used for data persistance so that data dosent need to be recompiled every time
var properties = PropertiesService.getScriptProperties();

function robotScore(pickups, intakeMethod, scoringLoc, parkingLoc, goodRobot) {
  
  robotRating = 0;
  
  if (pickups == "Both") {
    robotRating += 5;
  }
  else if (pickups == "Only two of the same") {
    robotRating += 3;
  }
  else if (pickups == "Silver" || pickups == "Gold") {
    robotRating += 2;
  }
  
  if (intakeMethod == "Reaching in the Crater") {
    robotRating += 5;
  }
  else if (intakeMethod == "Going into the Crater") {
    robotRating += 3;
  }
  else if (intakeMethod == "Neither") {
    robotRating += 2;
  }
  
  if (scoringLoc == "Lander") {
    robotRating += 5;
  }
  else if (scoringLoc == "Depot") {
    robotRating += 2;
  }
  else if (scoringLoc == "Both") {
    robotRating += 4;
  }
  
  if (parkingLoc == "Latched") {
    robotRating += 5;
  }
  else if (parkingLoc == "Parked in  Crater") {
    robotRating += 4;
  }
  else if (parkingLoc == "Parked on Crater") {
    robotRating += 3;
  }
  
  robotRating += goodRobot
  
  robotRating = robotRating / 5;
  
  return robotRating;

}


/**
 * Adds match data to a team object
 *
 * @param {team, data} team = the team object
 */
function generateData (team, data) { 
  var currentData;
  var teamNumCol = 2;
  var autoCol = 4;
  var teleopCol = 5;
  var auto;
  var teleop;
  var endgame;
  
  
  for (var dataRow = 0; dataRow < data.length; dataRow++) {
    if (data[dataRow][2] == team.number) {
      team.addMatch();
      team.addAutoScore(data[dataRow][autoCol]);
      team.addTeleopScore(data[dataRow][teleopCol]);
    }
  }
  team.averageScores();
}

function compileData(currentData) {
  var teams = generateTeams(currentData);
  
  for (var i = 0; i < teams.length; i++) {
    generateData(teams[i], currentData);
  }
  
  Logger.log("Generated Team JSON: " + JSON.stringify(teams));
  properties.setProperty('allTeamData', teams.toString());
  return teams;
}

function generateTeams(data) {
  var teams = [];
  var teamList = [""];
  for(var i = 0; i < data.length; i++) {
    if (typeof data[i][2] == "number") {
      teamList[i] = data[i][2];
    }
  }
  Logger.log("Teamlist:" + teamList);
  teamList = teamList.filter(function(value, index, self) {
    return self.indexOf(value) == index;
  });
  
  for (var i = 0; i < teamList.length; i++) {
    teams[i] = new Team(teamList[i].toString(), "");
  }
  
  return teams;
}

/**
 * Uses timestamps to determine what Competition data is from.
 *
 * @param {day} input the date or timestamp.
 * @return Name of the Competition where data was submitted from.
 * @customfunction
 */             
function getComp(day) {
  
  var TestDay = '10/21/18';
  var timeStampDate = day.toString().split(' ');
   
  if (timeStampDate[0] == TestDay) {
    return "Test Day"
  }
  else {
    return null;
  }
}

/**
 * Create UI Options to compile the sheet
 * All functions are listed under the tab:
 * 'Compile Averages'
 */
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Compile Averages')
    .addItem('Compile All Sheets', 'compileAll')
    .addSeparator()
    .addItem('Compile Active Sheet', 'compileActiveSheet')
    .addToUi();
}

function compileAll() {
  var ui = SpreadsheetApp.getUi();
  ui.alert('Compile All sheets?', 'This will compile ALL team averages and may take a while to run', ui.ButtonSet.YES_NO);
  
}

function compileActiveSheet() {
  var ui = SpreadsheetApp.getUi();
  ui.alert(JSON.stringify(compileData(SpreadsheetApp.getActive().getActiveSheet().getDataRange().getValues())));
}
