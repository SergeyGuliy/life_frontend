import { SOUNDS } from "@enums/index.mjs";

export const SOUNDS_WITH_FILES = Object.keys(SOUNDS).map(async (soundName) => {
  return {
    name: "soundName",
    sound: await import(`../assets/sounds/${soundName}.mp3`),
  };
});

export function getSoundsWithFile() {
  let promises = [];
  let soundsWithFiles = Object.keys(SOUNDS).map((soundName) => {
    promises.push(
      import(`../assets/sounds/${soundName}.mp3`).then((file) => ({
        file,
        soundNameAsync: soundName,
      }))
    );
    return { name: soundName };
  });
  return Promise.allSettled(promises).then((files) => {
    files.forEach(({ value }) => {
      const { file, soundNameAsync } = value;
      soundsWithFiles.find(({ name }) => name === soundNameAsync).sound =
        file.default;
    });
    return soundsWithFiles;
  });
}
