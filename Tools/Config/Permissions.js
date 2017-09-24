export function Permissions() {
  let options = {
    permissions: {
      read: ["Height", "Weight", "DateOfBirth", "Steps", "BodyMassIndex", "DistanceWalkingRunning"],
      write: ["Weight", "Height", "BodyMassIndex"]
    }
  }
  return options
}
