/**
 * Converts Form answers "Yes" and "No" to 1 or 0.
 *
 * @param {answer} input The answer given in the Form.
 * @return If the input was yes, it becomes 1.
 * @customfunction
 */             
function YES_NO(answer) {
  
  if(answer == 'Yes' || answer == 1) {
    return 1;
  }
  else {
    return 0;
  }
  
}  

/**
 * Totals Autonomous Points
 *
 * @param {hanging, sample, tm, lander, depot, parked} input the scoring cells.
 * @return Autonomous score.
 * @customfunction
 */
function AUTO_PTS(hanging, sample, tm, lander, depot, parked) {
  
  autoTotal = 0;
  
  autoTotal += YES_NO(hanging) * 30;
  autoTotal += YES_NO(sample) * 25;
  autoTotal += YES_NO(tm) * 15;
  autoTotal += lander * 5;
  autoTotal += depot * 2;
  autoTotal += YES_NO(parked) * 10; 
  
  return autoTotal;
  
}

/**
 * Totals Driver Points
 *
 * @param {landerMineral, depotMineral} input the scoring cells.
 * @return Driver score.
 * @customfunction
 */
function DRIVER_PTS(landerMineral, depotMineral) {
  
  driverTotal = 0;
  
  driverTotal += landerMineral * 5;
  driverTotal += depotMineral * 2;
  
  return driverTotal;
  
}

/**
 * Totals Endgame Points
 *
 * @param {parkingLoc} input Parking Location.
 * @return Endgame score.
 * @customfunction
 */
function END_PTS(parkingLoc) {
  
  endTotal = 0;
  
  if(parkingLoc == 'Latched') {
    endTotal += 50;
  }
  else if(parkingLoc == 'Parked in Crater') {
    endTotal += 25;
  }
  else if(parkingLoc == 'Parking on Crater') {
    endTotal += 15;
  }
  else {
    endTotal += 0;
  }
  
  return endTotal;
  
}
/**
 * Returns the average auto score for the secified team
 *
 * @param {teamNum} the team to get averages for
 * @return Average auto score for Team
 */
function GET_AVG_AUTO(teamNum) {
  Logger.log(properties.getProperty('auto' + teamNum));
  return properties.getProperty('auto' + teamNum); // Truncate the sting(to avoid large decimals)
}

/**
 * Returns the average teleop score for the secified team
 *
 * @param {teamNum} the team to get averages for
 * @return Average teleop score for Team
 */
function GET_AVG_TELEOP(teamNum) {
  Logger.log(properties.getProperty('teleop' + teamNum));
  return properties.getProperty('teleop' + teamNum).toString().slice(5); // Truncate the sting(to avoid large decimals)
}

/**
 * Returns the average endgame score for the secified team
 *
 * @param {teamNum} the team to get averages for
 * @return Average endgame score for Team
 */
function GET_AVG_ENDGAME(teamNum) {
  Logger.log(properties.getProperty('endgame' + teamNum));
  return properties.getProperty('endgame' + teamNum).toString().slice(5); // Truncate the sting(to avoid large decimals)
}


