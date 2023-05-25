export const checkValidTen = (value) => {
    if (
        !!value &&
        value.match(
            /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        )
    ) {
        return true;
    } else {
        return false;
    }
};
export const checkValidSDT = (value) => {
    if (!!value && value.match(/^0\d{9}$/)) {
        return true;
    } else {
        return false;
    }
};

export const checkValidCCCD = (value) => {
    if (!!value && value.match(/\d{12}$/)) {
        return true;
    } else {
        return false;
    }
};

export const checkValidNgaySinh = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
export const checkValidKhoa = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
export const checkValidNganh = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};

export const checkValidEmail = (value) => {
    if (!!value && value.match(/^[a-zA-Z._0-9]+@[a-z]+\.[a-z]+$/)) {
        return true;
    } else {
        return false;
    }
};

export const checkValidKhoaHoc = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};

export const checkValidChucVu = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
export const checkRong = (value) => {
    if (!!value) {
        return true;
    } else {
        return false;
    }
};
