
export const  validateName = (name) => {
    var errorMessage = '*';
    let error = false;
    if (name.length < 1) {
        error = true
        return errorMessage = '*'
    }
    if (name.length < 2) {
        error = true
        return errorMessage = 'invalid'
    } return error;


};
export const  validateComfirmPassword = (name,password) => {
    var errorMessage = '*';
    if (password != name) {
        return errorMessage = 'invalid';
    }
};
export const  validateNumTel = (name) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    if (name.length < 1) {
        return errorMessage = '*'
    }
    if (name.length < 4 || reg.test(name) === false) {
        return errorMessage = 'format invalid'
    }
};
export const  validatePassword = (name) => {
    var errorMessage = '*';
    if (name.length < 1) {
        return errorMessage = '*'
    }
    if (name.length < 5) {
        return errorMessage = 'mot de passe trop court'
    }
};
export const  validateEmail = (name) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = '*';
    if (name.length < 1) {
        return errorMessage = '*'
    }
    if (name.length < 2 || reg.test(name) === false) {
        return errorMessage = 'format email invalid'
    }
};

export const validateNumCin = (name) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    if (name.toString().length < 2) {
        return errorMessage = '*'
    }
    if (name.toString().length < 4 || reg.test(name) === false) {
        return errorMessage = 'format invalid'
    }
};
export const validateAdresse = (name) => {
    var errorMessage = '*';
    if (name.length < 1) {
        return errorMessage = '*'
    }
    if (name.length < 2) {
        return errorMessage = 'trop court'
    }
};
export const validateImage = (fileSize) => {
    var errorMessage = '*';
    let error = false ; 
    if (fileSize < 1) {
        error= true;
        return errorMessage = '*'
    }
    if (fileSize > 800000) {
        error= true;
        return errorMessage = 'taille trés grand'
    }  
  return error ; 
}