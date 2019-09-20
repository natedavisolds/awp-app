export const isPresent = function() { 
  return Object.values(arguments).map((value) => (value !== '' && value !== undefined)).reduce((all,next) => (all && next), true)
}

export const validatePasswordMatch = function(password,passwordConfirm) {
  return(isPresent(password, passwordConfirm) && (password === passwordConfirm))
}

export const isEmail = candidate => {
  return(
    candidate &&
    candidate.indexOf("@") > 0 &&
    candidate.indexOf(".") > 3 &&
    candidate.length > 4
  )
}

export const isPhone = candidate => (candidate.length === 10)

export const validateEmail = candidate => (isPresent(candidate) && isEmail(candidate))
export const validatePhone = candidate => (isPresent(candidate) && isPhone(candidate))