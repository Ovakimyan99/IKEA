const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory']
};

export const getData = {
    url: 'database/dataBase.json',
    get (process) {
        // console.log(this);
        fetch(this.url)
        .then(response => response.json())
        .then(process);
    },
    wishList (list, callBack) {
        this.get((data) => {
            const result = data.filter((item) => list.includes(item.id));
            callBack(result);
        });
    }, 
    item(value, callBack) {
        this.get((data) => {
            const result = data.find(item => item.id === value);
            callBack(result);
        });
    },
    cart (list, callBack) {
        this.get((data) => {
            const result = data.filter(item => list
                .some(obj => obj.id === item.id));
            callBack(result);
        });
    },
    category (prop, value, callBack) {
        this.get((data) => {
            const result = data.filter(item => 
                item[PARAM[prop]].toLowerCase() === value.toLowerCase());
            callBack(result);
        });
    },
    search(value, callBack) {
        this.get((data) => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && 
                    item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            });
            callBack(result);
        });
    },
    catalog (callBack) {
        this.get((data) => {
            const result = data.reduce((arr, item) => {
                if (!arr.includes(item.category)) {
                    arr.push(item.category);
                }
                return arr;
            }, []);

            callBack(result);
        });
    },
    subCatalog (value, callBack) {
        this.get((data) => {
            const result = data
            .filter(item => item.category === value)
            .reduce((arr, item) => {
                if(!arr.includes(item.subcategory)) {
                    arr.push(item.subcategory);
                }
                
                return arr;
            }, []);

            callBack(result);
        });
    }
};