function checkBodyFront(state) {
  let isValid = true;

  for (const field of state) {
    if (!field|| field === '') {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBodyFront };
