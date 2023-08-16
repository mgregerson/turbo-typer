export function renderStoryText(story: string, userInput: string) {
  if (!story) return null;

  const storyCharacters = story.split("");
  const userInputCharacters = userInput.split("");

  return storyCharacters.map((char: string, index: number) => {
    let textColorClass = "text-gray-300";

    if (userInputCharacters[index] === char) {
      textColorClass = "text-green-500";
    } else if (
      userInputCharacters[index] &&
      userInputCharacters[index] !== char
    ) {
      textColorClass = "text-red-500";
    }

    return (
      <span key={index} className={textColorClass}>
        {char}
      </span>
    );
  });
}
