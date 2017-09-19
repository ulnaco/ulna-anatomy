export function Permissions() {
  let options = {
    permissions: {
      read: ["Height", "Weight", "DateOfBirth", "Steps", "BodyMassIndex"],
      write: ["Weight", "Height", "BodyMassIndex", "Steps"]
    }
  }
  return options
}
