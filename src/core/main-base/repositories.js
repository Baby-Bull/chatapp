const Collection = require("mongoose");


class BaseRepository {
    constructor(entity) {
        this._collection = entity
    }
    _collection;


    // async get(_id: string) {
    //     return this._collection.findOne()
    // }

    async getAll() {
        return this._collection.find();
    }

    async create(newEntity) {
        return this._collection.createIndex(newEntity);
    }

    async findOne(_id) {
        return this._collection.findOne({ _id: _id })
    }

    async updateSingle(_id, entityAttrs, options = {}) {
        return this._collection.updateOne(
            { _id: _id },
            entityAttrs,
            options
        )
    }

    async deleteOne(_id) {
        return this._collection.deleteOne({ _id: _id });
    }

    async batchGet(_ids, options = {}) {
        if (!_ids || _ids?.length <= 0) return [];
        const batchPromises = [];
        //let previousBatch = options?.batch ?? {};

        // for (let i = 0; i < _ids.length; i += 100) {
        //     let batch100 = {};
        //     for (let j = 0; j < 100; j++) {
        //         if (i + j >= ids.length) {
        //             break;
        //         }
        //         const id = ids[i + j];
        //         await this.get(id, { batch: batch100, ...options });
        //     }
        //     batchPromises.push(
        //         this.entity.table.batchGet(batch100, { parse: true, ...options })
        //     )
        // }
        // if (previousBatch) {
        //     batchPromises.push(
        //         this.entity.table.batchGet(previousBatch, { parse: true, ...options })
        //     );
        // }
        const result = await Promise.all(batchPromises);
        return result.reduce((previous, current) => previous.concat(current), []);
    }
}

module.exports = {
    BaseRepository
}