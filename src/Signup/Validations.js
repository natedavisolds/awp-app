export const isPresent = function() { 
  return Object.values(arguments).map((value) => (value !== '' && value !== undefined)).reduce((all,next) => (all && next), true)
}

export const validatePasswordMatch = function(password,passwordConfirm) {
  return(isPresent(password, passwordConfirm) && (password === passwordConfirm))
}

const EmailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export const isEmail = candidate => {
  return(
    candidate &&
    EmailRegex.test(candidate)
  )
}

const PhoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
export const isPhone = candidate => PhoneRegex.test(candidate)

export const validateEmail = candidate => (isPresent(candidate) && isEmail(candidate))
export const validatePhone = candidate => (isPresent(candidate) && isPhone(candidate))