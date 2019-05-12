function paginate(query, options) {
    query   = query || {};
    options = Object.assign({}, paginate.options, options);

    const sort  = options.sort;
    const limit = options.hasOwnProperty('limit') ? options.limit : 10;
    const page  = options.page || 1;
    const skip  = options.hasOwnProperty('page') ? ((page - 1) * limit) : 0;
    const docs  = limit
     ? this.find(query).sort(sort).skip(skip).limit(limit).exec()
     : query.exec();
    const countDocuments = this.countDocuments(query).exec();

    return Promise.all([docs, countDocuments]).then(function(values) {
      return Promise.resolve({
        docs  : values[0],
        total : values[1],
        limit : limit,
        page  : page,
        pages : Math.ceil(values[1] / limit) || 1
      })
    });
}

module.exports = function(schema) {
    schema.statics.paginate = paginate;
};

module.exports.paginate = paginate;
