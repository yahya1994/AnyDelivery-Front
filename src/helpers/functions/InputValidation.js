
export const validateName = (name) => {
    var errorMessage = '*';
    let error = false;
    switch (true) {
        case name.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (name.length < 5):
            return [errorMessage = 'invalid', error = true]
            break;
        default:
            return error;
    }
};
export const validateComfirmPassword = (name, password) => {
    var errorMessage = '*';
    let error = false;

    if (password != name) {
        return [errorMessage = 'invalid', error = true];
    } return error;

};
export const validateNumTel = (name) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    let error = false;
    switch (true) {
        case name.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (name.length < 4 || reg.test(name) === false):
            return [errorMessage = 'format invalid', error = true]
            break;
        default:
            return error;
    }


};
export const validatePassword = (name) => {
    var errorMessage = '*';
    let error = false;

    switch (true) {
        case name.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (name.length < 4):
            return [errorMessage = 'mot de passe trop court', error = true]
            break;
        default:
            return error;
    }

};
export const validateEmail = (name) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = '*';
    let error = false;
    switch (true) {
        case name.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (name.length < 2 || reg.test(name) === false):
            return [errorMessage = 'format email invalid', error = true]
            break;
        default:
            return error;
    }
};

export const validateNumCin = (name) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    var error = false;
    switch (true) {
        case (name.toString().length < 2):
            return [errorMessage = '*', error = true]
            break;
        case (name.toString().length < 4 || reg.test(name) === false):
            return [errorMessage = 'format invalid', error = true]
            break;
        default:
            return error;
    }

};
export const validateAdresse = (name) => {
    var errorMessage = '*';
    var error = false;
    switch (true) {
        case name.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (name.length < 3):
            return [errorMessage = 'trop court', error = true]
            break;
        default:
            return error;
    }
};
export const validateImage = (fileSize) => {
    var errorMessage = '*';
    let error = false;

    switch (true) {
        case (fileSize < 1):
            return [errorMessage = '*', error = true]
            break;  
            case (fileSize = 0 ):
            return [errorMessage = '*', error = true]
            break;
        case (fileSize > 800000):
            return [errorMessage = 'taille trés grand', error = true]
            break;
        default:
            return error;
    }
}