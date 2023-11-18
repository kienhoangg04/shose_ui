const { message } = require('antd');

const success = (mess = 'success') => {
    message.success(mess);
};

const error = (mess = 'error') => {
    message.error(mess);
};

const warning = (mess = 'warning') => {
    message.warning(mess);
};

export { success, error, warning };
