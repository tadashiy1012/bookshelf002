import pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.bundle.js';

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

const fetchBooks = () => {
    return new Promise((resolve, reject) => {
        fetch('/books').then((resp) => {
            return resp.json();
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const pushBook = (file, thumbnail) => {
    return new Promise((resolve, reject) => {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('thumb', thumbnail);
        const option = {method: 'POST', body: fd};
        fetch('/books', option).then((resp) => {
            return resp.json();
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const makeThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.addEventListener('load', async (ev) => {
            const buf = ev.target.result;
            const pdf = await pdfjs.getDocument(new Uint8Array(buf));
            const page = await pdf.getPage(1);
            const viewport = page.getViewport(0.3);
            const canvas = document.createElement('canvas');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({
                canvasContext: canvas.getContext('2d'),
                viewport
            });
            canvas.toBlob((result) => {
                resolve(result);
            });
        });
        fr.readAsArrayBuffer(file);
    });
};

export {
    fetchCategories, pushCategory,
    fetchBooks, pushBook, 
    makeThumbnail
};