module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPass
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPass) {
    errors.confirmPass = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validatePostInput = (title, photo_url) => {
  const errors = {};
  if (title.trim() === "") {
    errors.title = "Post should have a title";
  }
  if (photo_url.trim() === "") {
    errors.photo_url = "Post should have an Image";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
