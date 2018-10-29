const fetchCategories = () => {
    return new Promise((resolve, reject) => {
        fetch('/categories').then((resp) => {
            return resp.json();
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const pushCategory = (newCategory) => {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({category: newCategory});
        const headers = {'Content-Type': 'application/json'};
        const option = {method: 'POST', body, headers}
        fetch('/categories', option).then((resp) => {
            return resp.json();
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

export {
    fetchCategories, pushCategory
};