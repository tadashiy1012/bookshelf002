const put = ({doc, db}) => {
    return new Promise((resolve, reject) => {
        db.insert(doc, (err, newDoc) => {
            if (err) { reject(err); }
            else { resolve(newDoc); }
        });
    });
};

const get = ({query, db}) => {
    return new Promise((resolve, reject) => {
        db.find(query, (err, docs) => {
            if (err) { reject(err); }
            else { resolve(docs); }
        });
    }); 
};

const set = ({query, doc, db}) => {
    return new Promise((resolve, reject) => {
        db.update(query, {$set: doc}, {}, (err, result) => {
            if (err) { reject(err); }
            else { resolve(result); }
        });
    });
};

module.exports = {
    put, get, set
};