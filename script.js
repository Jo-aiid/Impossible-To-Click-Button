const evil = document.getElementById("evil-button");
const OFFSET = 100;
evil.addEventListener("click", () => {});

document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const buttonBox = evil.getBoundingClientRect();
  console.log(`mouseX=${x}`, `mouseY=${y}`, buttonBox);
  const horizontaDistance = distanceFromCenter(buttonBox.x, x, buttonBox.width);
  const verticalDistance = distanceFromCenter(buttonBox.y, y, buttonBox.height);
  console.log(
    `horizontaDistanceFromButton=${horizontaDistance}`,
    `verticalDistanceFromButton=${verticalDistance}`,
    buttonBox
  );
  const horizontalOffset = buttonBox.width / 2 + 100;
  const verticalOffset = buttonBox.height / 2 + 100;
  console.log(
    `horizontaOffsetFromButton=${horizontalOffset}`,
    `verticalOffsetFromButton=${verticalOffset}`,
    buttonBox
  );
  if (
    Math.abs(
      horizontaDistance <= horizontalOffset &&
        Math.abs(verticalDistance <= verticalOffset)
    )
  ) {
    setButtonPosition(
      buttonBox.x + (horizontalOffset / horizontaDistance) * 10,
      buttonBox.y + (verticalOffset / verticalDistance) * 10
    );
  }
});
function setButtonPosition(left, top) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = evil.getBoundingClientRect();

  if (distanceFromCenter(left, windowBox.left, buttonBox.width / 2) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET;
  }
  if (distanceFromCenter(left, windowBox.right, buttonBox.width / 2) > 0) {
    left = windowBox.left + OFFSET;
  }
  if (distanceFromCenter(top, windowBox.top, buttonBox.height / 2) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
  }
  if (distanceFromCenter(top, windowBox.bottom, buttonBox.height / 2) > 0) {
    top = windowBox.top + OFFSET;
  }
  evil.style.top = `${top}px`;
  evil.style.left = `${left}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
