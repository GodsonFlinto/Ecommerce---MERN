class APIFeatures{
    constructor(query, queryStr){
         this.query = query
         this.queryStr = queryStr
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}

        this.query.find({...keyword})
        return this
    }

    filter() {
    const queryStrCopy = { ...this.queryStr };

    // Remove special fields
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    // --- 🧠 NEW: convert keys like "price[lt]" → { price: { lt: value } } ---
    const queryStr = {};

    for (const key in queryStrCopy) {
        if (key.includes('[')) {
            // Extract main field and operator
            const [field, operator] = key.split(/\[|\]/).filter(Boolean);
            if (!queryStr[field]) queryStr[field] = {};
            queryStr[field][`$${operator}`] = queryStrCopy[key];
        } else {
            queryStr[key] = queryStrCopy[key];
        }
    }

    //console.log("Formatted Query:", queryStr);

    this.query.find(queryStr);
    return this;
}

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage-1)  
        this.query.limit(resPerPage).skip(skip)
        return this
    }

}

module.exports = APIFeatures