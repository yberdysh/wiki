const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User = db.define('user', {
  name: { 
    type: Sequelize.STRING,
    allowNull: false 
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  urlTitle: { 
    type: Sequelize.STRING,
    allowNull: false ,
    get () {
      return  "/wiki/" + this.getDataValue("title");
    }
  },
  content: { 
    type: Sequelize.TEXT,
    allowNull: false 
  },
  status: Sequelize.ENUM('open', 'closed'),
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.Now
  }
}, {
  hooks: {
    beforeValidate: page => {
      page.urlTitle = generateUrlTitle(page.title);
    }
  }
});


function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

module.exports = {
  Page,
  User,
  db

};
