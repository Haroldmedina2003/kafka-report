"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("historical_data", { ifNotExists: true });

    await queryInterface.createTable(
      "ComplaintStateHistories",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        complaint_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        complaint_description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        entity_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        previous_state: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        new_state: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        user_email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_state_duration: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        total_duration: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        change_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        schema: "historical_data",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ComplaintStateHistories", {
      schema: "historical_data",
    });
    await queryInterface.dropSchema("historical_data", { ifExists: true });
  },
};
