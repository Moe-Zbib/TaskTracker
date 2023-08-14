const validateGroupInput = (name, description) => {
  if (!name || typeof name != "string" || name.trim() === "" || name) {
    throw console.error("Inalid Group name");
  } else if (name.length < 4) {
    throw console.error("Name too short");
  } else if (name.length > 30) {
    throw console.error("Name too big");
  }
};

module.exports = { validateGroupInput };
