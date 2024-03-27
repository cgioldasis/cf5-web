const typeorm = require('typeorm');

const CategoryEntity = require('./model/Category').CategoryEntity;
const PostEntity = require('./model/Post').PostEntity;

const dataSource = new typeorm.DataSource({
    type : "mariadb",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    entities: [CategoryEntity, PostEntity]
});

dataSource
    .initialize()
    .then( function(){
        console.log("Database connected");
    })
    .catch( function(err){
        console.log("Problem in connecting to database", err);
    });

module.exports = {dataSource};
