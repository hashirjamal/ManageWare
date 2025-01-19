class ApiFeature{
    constructor(query, reqObj){
        this.query = query;
        this.reqObj = reqObj
    }

    filter(){

        let obj = {...this.reqObj};
        let strObj = JSON.stringify(obj);
        strObj = strObj.replaceAll(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        obj = JSON.parse(strObj);

        Object.keys(obj).forEach((key,i)=>{
            let value = obj[key];
            if(key=="sort" || key=="page" || key=="limit" || key=="fields"  ){
                delete obj[key];
            }
        })
        
        this.query.find(obj)
        return this;
    }

    sort(){

        if(this.reqObj.sort){
            let sortBy = this.reqObj.sort;
            
            sortBy = sortBy.replaceAll(","," ");
            this.query.sort(sortBy)
        }
        return this;
    }

    limit(){

        if(this.reqObj.fields){
            let limitTo = this.reqObj.fields;
            limitTo = limitTo.replaceAll(","," ");
    
            this.query.select(limitTo);
        }

        return this;
    }

    paginate(){

        let page = this.reqObj.page || 1;
        let limit = this.reqObj.limit || 10;
        this.query.skip((page-1)*limit).limit(limit)

        return this;
    }


}


module.exports = ApiFeature