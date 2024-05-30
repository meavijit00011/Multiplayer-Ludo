import { cellId, safeZone, safeZoneStartAfter, startCell } from "./Pattern";

// binary search to find if entry to safezone exist in the path.
function findEntryToSafeZoneExist(playerId, startCell, endCell) {
  let entryToSafeZoneCells = safeZoneStartAfter[`p${playerId}`];
  let entryToSafeZoneCellsInd = cellId.indexOf(entryToSafeZoneCells);
  let i = startCell;
  let j = endCell;
  while (i <= j) {
    let mid = parseInt((i + j) / 2);
    if (cellId[mid] == entryToSafeZoneCells) {
      return mid;
    }
    else if (mid < entryToSafeZoneCellsInd) {
      i = mid + 1;
    }
    else {
      j = mid - 1;
    }
  }
  return false;
}

export const checkIfPlayerPiecesCanMove = (pos, num, playerId) => {

  let arr = [false, false, false, false];

  for (let i = 0; i < pos.length; i++) {
    let tempPos = pos[i];
    // pos = 1 means that piece is finished so no need to change it's positon.
    if(tempPos == 1){
      continue
    }
    let tempPosInd = cellId.indexOf(tempPos);
    let nextInd = tempPosInd + num;
    let safeZoneInd = safeZone[`p${playerId}`].indexOf(tempPos)


    // if pieces is in it's home 
    if (tempPos == 0) {
      if (num == 6) {
        arr[i] = startCell[`p${playerId}`];
      }
    }
    // if piece is in safeZone....
    else if (safeZoneInd >= 0) {
      nextInd = safeZoneInd + num;
      if (nextInd < 5) {
        arr[i] = safeZone[`p${playerId}`][nextInd];
      }
      else if(nextInd == 5){
        arr[i] = 1
      }
    }
    // if piece is crossing the entry to safe zone..
    else if (findEntryToSafeZoneExist(playerId, tempPosInd, nextInd)) {
      let ind = findEntryToSafeZoneExist(playerId, tempPosInd, nextInd);
      let diff = nextInd - ind;
      diff == 0 ? arr[i] = cellId[ind] : arr[i] = safeZone[`p${playerId}`][diff - 1]
    }
    // when a whole loop is ended then start from the begining.
    else if (nextInd >= 52) {
      let diff = nextInd - 52;
      let cell = cellId[diff];
      arr[i] = cell;
    }
    // otherwise just move the piece.
    else {
      arr[i] = cellId[nextInd];
    }
  }

  return arr;
}