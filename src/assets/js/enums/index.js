import { SOUNDS } from "@lib_enums/index.mjs";

export * from "@lib_enums/index.mjs";
export function getSoundsWithFile() {
  let promises = [];
  let soundsWithFiles = Object.keys(SOUNDS).map((soundName) => {
    promises.push(
      import(`../../sounds/${soundName}.mp3`).then((file) => ({
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
