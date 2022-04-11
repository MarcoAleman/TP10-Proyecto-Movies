module.exports = (sequelize, dataTypes) => {
    const alias = "Genre";
    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        ranking: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            unique: true,
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        }
    };

    const config = {
        tableName: "genres",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Genre = sequelize.define(alias, cols, config);

    return Genre;
}
