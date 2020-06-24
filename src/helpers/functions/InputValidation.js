
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
export const validateComfirmPassword = (password, Conpassword) => {
    var errorMessage = '*';
    let error = false;

    if (password != Conpassword) {
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
export const validatePassword = (password) => {
    var errorMessage = '*';
    let error = false;

    switch (true) {
        case password.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (password.length < 4):
            return [errorMessage = 'mot de passe trop court', error = true]
            break;
        default:
            return error;
    }

};
export const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errorMessage = '*';
    let error = false;
    switch (true) {
        case email.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (email.length < 2 || reg.test(email) === false):
            return [errorMessage = 'format email invalid', error = true]
            break;
        default:
            return error;
    }
};
export const validateCost = (cost) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    var error = false;
    switch (true) {
        case (cost.toString().length < 1):
            return [errorMessage = '*', error = true]
            break;
        case (reg.test(cost) == false):
            return [errorMessage = 'format invalid', error = true]
            break;
        default:
            return error;
    }

};
export const validateNumCin = (cin) => {
    let reg = /^\d*\.?\d*$/;
    var errorMessage = '*';
    var error = false;
    switch (true) {
        case (cin.toString().length < 2):
            return [errorMessage = '*', error = true]
            break;
        case (reg.test(cin) == false || cin.toString().length != 8 ):
            return [errorMessage = 'format invalid', error = true]
            break;
        case (reg.test(cin) == false):
            return [errorMessage = 'format invalid', error = true]
            break;
        default:
            return error;
    }

};
export const validateAdresse = (adresse) => {
    var errorMessage = '*';
    var error = false;
    switch (true) {
        case adresse.length == 0:
            return [errorMessage = '*', error = true]
            break;
        case (adresse.length < 3):
            return [errorMessage = 'trop court', error = true]
            break;
        default:
            return error;
    }
};

export const validateLocation = (position) => {
    var errorMessage = '*';
    let error = false;

    switch (true) {
        case (position == 0):
            return [errorMessage = '*', error = true]
            break;
        default:
            return error;
        } }


export const validateImage = (fileSize) => {
    var errorMessage = '*';
    let error = false;

    switch (true) {
        case (fileSize < 1):
            return [errorMessage = '*', error = true]
            break;
        case (fileSize = 0):
            return [errorMessage = '*', error = true]
            break;
        case (fileSize > 800000):
            return [errorMessage = 'taille trés grand', error = true]
            break;
        default:
            return error;
    }
}