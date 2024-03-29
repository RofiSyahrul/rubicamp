// adapted from https://alexatnet.com/model-view-controller-mvc-in-javascript/
import {EventEmitter} from './EventEmitter';
import {Query} from './queries';
export class Model extends EventEmitter {
    constructor(database) {
        super();
        this.db = database;
        this.query = new Query(this.db);
    }

    validateAccount(username='', password=''){
        this.promise = new Promise((resolve,reject) => {
            this.db.serialize(() => {
                this.query.account(resolve,reject,username,password);
            });
        });
        this.emit('accountValidated');
    }

    readData(table=''){
        this.promise = new Promise((resolve,reject)=>{
            this.db.serialize(()=>{
                this.query[table.toLowerCase()](resolve,reject);
            });
        });
        this.emit('tableLoaded',table);
    }

    searchData(table='',id=''){
        this.promise = new Promise((resolve,reject)=>{
            this.db.serialize(()=>{
                this.query[table.toLowerCase()](resolve,reject,'search',id);
            });
        });
        this.emit('recordFound',table);
    }

    addRecord(table='',info=[]){
        this.promise = new Promise((resolve,reject)=>{
            this.db.serialize(()=>{
                this.query[table.toLowerCase()](resolve,reject,'add',info);
            });
        });
        this.emit('recordAdded',table);
    }

    deleteRecord(table='',id=''){
        this.promise = new Promise((resolve,reject) => {
            this.db.serialize(() => {
                this.query[table.toLowerCase()](resolve,reject,'del',id);
            });
        });
        this.emit('recordDeleted',table,id);
    }
}