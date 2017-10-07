export function Permissions() {
  let options = {
    permissions: {
      read: ["Height", "Weight", "DateOfBirth", "Steps", "BodyMassIndex", "DistanceWalkingRunning", "ActiveEnergyBurned", "DistanceCycling"],
      write: ["Weight", "Height", "BodyMassIndex"]
    }
  }
  return options
}
